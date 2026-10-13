/**
 * Safe, non-destructive migration of the supplied MongoDB Extended JSON
 * export into the existing DigiWork/DailyFix Prisma + MySQL database.
 *
 * Default mode is DRY RUN. Writes are allowed only when
 * MONGO_IMPORT_EXECUTE=true is set for a single intentional run.
 *
 * Deliberately excludes the legacy MongoDB category with slug "test" and
 * its child subcategory. The user's existing MySQL Test category is kept
 * completely unchanged. No Admin record/password is imported.
 * Existing records are reused by unique key and are NEVER updated.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const prisma = require("../src/config/prisma");
const { Prisma } = require("../src/generated/prisma");

const DATA_DIR = path.join(__dirname, "..", "migration-data");
const EXECUTE = process.env.MONGO_IMPORT_EXECUTE === "true";

function readJson(filename) {
  const fullPath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing import file: ${fullPath}`);
  const value = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  if (!Array.isArray(value)) throw new Error(`${filename} must contain a JSON array.`);
  return value;
}

function asDate(value, fieldName) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in ${fieldName}: ${value}`);
  return date;
}

function deterministicId(input) {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 24);
}

function rewriteMediaIds(value, mediaIdMap) {
  if (Array.isArray(value)) return value.map((item) => rewriteMediaIds(item, mediaIdMap));
  if (!value || typeof value !== "object") return value;
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "mediaId" && typeof child === "string" && mediaIdMap.has(child)) {
      result[key] = mediaIdMap.get(child);
    } else {
      result[key] = rewriteMediaIds(child, mediaIdMap);
    }
  }
  return result;
}

function requiredDmmfModel(modelName) {
  const models = Prisma?.dmmf?.datamodel?.models;
  if (!Array.isArray(models)) {
    throw new Error("Cannot inspect generated Prisma DMMF. Generate the client from the current schema first.");
  }
  const model = models.find((item) => item.name === modelName);
  if (!model) throw new Error(`Current Prisma schema has no ${modelName} model.`);
  return model;
}

function validateSource(categories, subcategories, articles, media) {
  const categoryIds = new Set(categories.map((x) => x.id));
  const subcategoryIds = new Set(subcategories.map((x) => x.id));
  const articleIds = new Set(articles.map((x) => x.id));
  const problems = [];

  for (const item of categories) {
    if (!/^[a-f0-9]{24}$/i.test(item.id)) problems.push(`Category ID is not a 24-character ObjectId string: ${item.id}`);
    if (!item.slug || !item.name) problems.push(`Category missing name/slug: ${item.id}`);
  }
  for (const item of subcategories) {
    if (!/^[a-f0-9]{24}$/i.test(item.id)) problems.push(`Subcategory ID is not a 24-character ObjectId string: ${item.id}`);
    if (!categoryIds.has(item.categoryId)) problems.push(`Subcategory ${item.id} references missing category ${item.categoryId}`);
  }
  for (const item of articles) {
    if (!/^[a-f0-9]{24}$/i.test(item.id)) problems.push(`Article ID is not a 24-character ObjectId string: ${item.id}`);
    if (!categoryIds.has(item.categoryId)) problems.push(`Article ${item.id} references missing category ${item.categoryId}`);
    if (!subcategoryIds.has(item.subcategoryId)) problems.push(`Article ${item.id} references missing subcategory ${item.subcategoryId}`);
    const sub = subcategories.find((x) => x.id === item.subcategoryId);
    if (sub && sub.categoryId !== item.categoryId) problems.push(`Article ${item.id} category does not match its subcategory parent.`);
    if (!item.authorId) problems.push(`Article ${item.id} is missing its legacy author reference.`);
  }
  for (const item of media) {
    if (!/^[a-f0-9]{24}$/i.test(item.id)) problems.push(`Media ID is not a 24-character ObjectId string: ${item.id}`);
  }
  if (problems.length) throw new Error(`Source data validation failed:\n- ${problems.join("\n- ")}`);

  const usedBy = media.flatMap((m) => (m.usedBy || []).map((ref) => ({ mediaId: m.id, ...ref })));
  const entityIdSets = { category: categoryIds, subcategory: subcategoryIds, article: articleIds };
  const validMediaRefs = usedBy.filter((ref) => entityIdSets[ref.entityType]?.has(ref.entityId));
  const orphanMediaRefs = usedBy.filter((ref) => !entityIdSets[ref.entityType]?.has(ref.entityId));
  return { categoryIds, subcategoryIds, articleIds, usedBy, validMediaRefs, orphanMediaRefs };
}

async function findCategoryTarget(source) {
  const bySlug = await prisma.category.findUnique({ where: { slug: source.slug } });
  if (bySlug) return bySlug;
  const byId = await prisma.category.findUnique({ where: { id: source.id } });
  if (byId && byId.slug !== source.slug) {
    throw new Error(`Category ID collision for ${source.id}; it belongs to slug "${byId.slug}", not "${source.slug}". No further import attempted.`);
  }
  return byId;
}

async function findSubcategoryTarget(source, targetCategoryId) {
  const byParentAndSlug = await prisma.subcategory.findUnique({
    where: { categoryId_slug: { categoryId: targetCategoryId, slug: source.slug } },
  });
  if (byParentAndSlug) return byParentAndSlug;
  const byId = await prisma.subcategory.findUnique({ where: { id: source.id } });
  if (byId && (byId.slug !== source.slug || byId.categoryId !== targetCategoryId)) {
    throw new Error(`Subcategory ID collision for ${source.id}; parent/slug differs. No further import attempted.`);
  }
  return byId;
}

async function findArticleTarget(source, targetCategoryId, targetSubcategoryId) {
  const byParentAndSlug = await prisma.article.findUnique({
    where: { subcategoryId_slug: { subcategoryId: targetSubcategoryId, slug: source.slug } },
  });
  if (byParentAndSlug) return byParentAndSlug;
  const byId = await prisma.article.findUnique({ where: { id: source.id } });
  if (byId && (byId.slug !== source.slug || byId.categoryId !== targetCategoryId || byId.subcategoryId !== targetSubcategoryId)) {
    throw new Error(`Article ID collision for ${source.id}; parent/slug differs. No further import attempted.`);
  }
  return byId;
}

async function importAll() {
  const rawCategories = readJson("categories.json");
  const rawSubcategories = readJson("subcategories.json");
  const rawArticles = readJson("articles.json");
  const media = readJson("media.json");

  // Explicit decision from the owner: preserve the manually created MySQL Test
  // category exactly as it is. Skip the old MongoDB Test category and its child.
  const skippedCategories = rawCategories.filter((x) => x.slug === "test");
  const skippedCategoryIds = new Set(skippedCategories.map((x) => x.id));
  const skippedSubcategories = rawSubcategories.filter((x) => skippedCategoryIds.has(x.categoryId));
  const skippedSubcategoryIds = new Set(skippedSubcategories.map((x) => x.id));
  const categories = rawCategories.filter((x) => !skippedCategoryIds.has(x.id));
  const subcategories = rawSubcategories.filter((x) => !skippedSubcategoryIds.has(x.id));
  const articles = rawArticles;

  const validated = validateSource(categories, subcategories, articles, media);
  const activeAdmin = await prisma.admin.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  if (!activeAdmin) throw new Error("No active Admin exists in MySQL. This importer intentionally does not import the old MongoDB Admin password.");

  // Verify the current schema before any writes.
  const refModel = requiredDmmfModel("MediaReference");
  const refScalarFields = refModel.fields.filter((f) => f.kind === "scalar");
  const refFieldNames = new Set(refScalarFields.map((f) => f.name));
  const knownRefFields = new Set(["id", "mediaId", "entityType", "entityId", "createdAt", "updatedAt"]);
  const unsupportedRequiredRefFields = refScalarFields
    .filter((f) => f.isRequired && !f.hasDefaultValue && !knownRefFields.has(f.name))
    .map((f) => f.name);
  const missingRefFields = ["mediaId", "entityType", "entityId"].filter((name) => !refFieldNames.has(name));
  if (missingRefFields.length || unsupportedRequiredRefFields.length) {
    throw new Error(`MediaReference schema mismatch. Missing: ${missingRefFields.join(", ") || "none"}; unmapped required: ${unsupportedRequiredRefFields.join(", ") || "none"}. No writes made.`);
  }

  console.log("[mongo-import] Source validation passed.");
  console.log(`[mongo-import] Will process: categories=${categories.length}, subcategories=${subcategories.length}, articles=${articles.length}, media=${media.length}`);
  console.log(`[mongo-import] Deliberately skipped old MongoDB Test records: categories=${skippedCategories.length}, subcategories=${skippedSubcategories.length}; current MySQL Test record will not be queried or changed.`);
  console.log(`[mongo-import] Media refs: valid=${validated.validMediaRefs.length}, orphaned/skipped=${validated.orphanMediaRefs.length}`);
  console.log(`[mongo-import] Active MySQL Admin selected for article authorId: ${activeAdmin.email}`);
  console.log(`[mongo-import] Mode: ${EXECUTE ? "EXECUTE (writes enabled)" : "DRY RUN (no changes made)"}`);

  if (!EXECUTE) {
    console.log("[mongo-import] DRY RUN COMPLETE. No database rows were created, updated or deleted.");
    return;
  }

  const categoryIdMap = new Map();
  const subcategoryIdMap = new Map();
  const articleIdMap = new Map();
  const mediaIdMap = new Map();
  const result = {
    mediaInserted: 0, mediaReusedUnchanged: 0,
    categoriesInserted: 0, categoriesReusedUnchanged: 0,
    subcategoriesInserted: 0, subcategoriesReusedUnchanged: 0,
    articlesInserted: 0, articlesReusedUnchanged: 0,
    mediaReferencesInserted: 0,
  };

  // Media first; existing media records are reused but never modified.
  for (const item of media) {
    let existing = await prisma.media.findUnique({ where: { id: item.id } });
    if (existing && existing.storageKey && existing.storageKey !== item.storageKey) {
      throw new Error(`Media ID collision for ${item.id}; storageKey differs. Stop and inspect before retrying.`);
    }
    if (!existing) existing = await prisma.media.findFirst({ where: { storageKey: item.storageKey } });
    if (!existing) existing = await prisma.media.findFirst({ where: { url: item.url } });
    const targetId = existing?.id || item.id;
    mediaIdMap.set(item.id, targetId);
    if (existing) {
      result.mediaReusedUnchanged++;
    } else {
      await prisma.media.create({
        data: {
          id: item.id,
          provider: item.provider,
          storageKey: item.storageKey,
          url: item.url,
          originalName: item.originalName,
          mimeType: item.mimeType,
          size: item.size ?? null,
          width: item.width ?? null,
          height: item.height ?? null,
          format: item.format ?? null,
          createdAt: asDate(item.createdAt, "Media.createdAt"),
          updatedAt: asDate(item.updatedAt, "Media.updatedAt"),
        },
      });
      result.mediaInserted++;
    }
  }

  // Categories: insert missing rows only. Existing rows (including manually
  // created content) are mapped but not edited.
  for (const item of categories) {
    const existing = await findCategoryTarget(item);
    const targetId = existing?.id || item.id;
    categoryIdMap.set(item.id, targetId);
    if (existing) {
      result.categoriesReusedUnchanged++;
      continue;
    }
    await prisma.category.create({
      data: {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description ?? "",
        content: rewriteMediaIds(item.content ?? null, mediaIdMap),
        icon: item.icon ?? null,
        status: item.status || "draft",
        isActive: Boolean(item.isActive),
        order: Number(item.order ?? 0),
        createdAt: asDate(item.createdAt, "Category.createdAt"),
        updatedAt: asDate(item.updatedAt, "Category.updatedAt"),
      },
    });
    result.categoriesInserted++;
  }

  for (const item of subcategories) {
    const targetCategoryId = categoryIdMap.get(item.categoryId);
    if (!targetCategoryId) throw new Error(`No mapped parent category for subcategory ${item.id}`);
    const existing = await findSubcategoryTarget(item, targetCategoryId);
    const targetId = existing?.id || item.id;
    subcategoryIdMap.set(item.id, targetId);
    if (existing) {
      result.subcategoriesReusedUnchanged++;
      continue;
    }
    await prisma.subcategory.create({
      data: {
        id: item.id,
        categoryId: targetCategoryId,
        name: item.name,
        slug: item.slug,
        description: item.description ?? "",
        content: rewriteMediaIds(item.content ?? null, mediaIdMap),
        order: Number(item.order ?? 0),
        status: item.status || "draft",
        isActive: Boolean(item.isActive),
        createdAt: asDate(item.createdAt, "Subcategory.createdAt"),
        updatedAt: asDate(item.updatedAt, "Subcategory.updatedAt"),
      },
    });
    result.subcategoriesInserted++;
  }

  for (const item of articles) {
    const targetCategoryId = categoryIdMap.get(item.categoryId);
    const targetSubcategoryId = subcategoryIdMap.get(item.subcategoryId);
    if (!targetCategoryId || !targetSubcategoryId) throw new Error(`Missing mapped parent for article ${item.id}`);
    const existing = await findArticleTarget(item, targetCategoryId, targetSubcategoryId);
    const targetId = existing?.id || item.id;
    articleIdMap.set(item.id, targetId);
    if (existing) {
      result.articlesReusedUnchanged++;
      continue;
    }
    await prisma.article.create({
      data: {
        id: item.id,
        categoryId: targetCategoryId,
        subcategoryId: targetSubcategoryId,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt ?? "",
        content: rewriteMediaIds(item.content ?? null, mediaIdMap),
        readingTime: Number(item.readingTime ?? 1),
        status: item.status || "draft",
        isActive: Boolean(item.isActive),
        authorId: activeAdmin.id,
        createdAt: asDate(item.createdAt, "Article.createdAt"),
        updatedAt: asDate(item.updatedAt, "Article.updatedAt"),
      },
    });
    result.articlesInserted++;
  }

  const referenceRows = [];
  for (const ref of validated.validMediaRefs) {
    const mediaId = mediaIdMap.get(ref.mediaId);
    const entityMap = { category: categoryIdMap, subcategory: subcategoryIdMap, article: articleIdMap }[ref.entityType];
    const entityId = entityMap?.get(ref.entityId);
    if (!mediaId || !entityId) continue;
    const stamp = media.find((item) => item.id === ref.mediaId)?.updatedAt;
    const values = {
      id: deterministicId(`${mediaId}|${ref.entityType}|${entityId}`),
      mediaId,
      entityType: ref.entityType,
      entityId,
      createdAt: stamp ? asDate(stamp, "MediaReference.createdAt") : new Date(),
      updatedAt: stamp ? asDate(stamp, "MediaReference.updatedAt") : new Date(),
    };
    referenceRows.push(Object.fromEntries(Object.entries(values).filter(([key]) => refFieldNames.has(key))));
  }
  if (referenceRows.length) {
    const created = await prisma.mediaReference.createMany({ data: referenceRows, skipDuplicates: true });
    result.mediaReferencesInserted = created.count;
  }

  console.log("[mongo-import] IMPORT COMPLETED. Existing rows were never updated; no tables or rows were deleted.");
  console.log(JSON.stringify(result, null, 2));
  console.log(`[mongo-import] Skipped ${validated.orphanMediaRefs.length} orphaned media references; no matching source entity was present in this export.`);
}

importAll()
  .catch((error) => {
    console.error("[mongo-import] FAILED:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect().catch(() => {});
  });
