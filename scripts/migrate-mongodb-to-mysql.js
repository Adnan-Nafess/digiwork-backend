require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const DATA_DIR = "C:/DigiWork/mongodb-json";

function readJsonLines(filename) {
  const fullPath = path.join(DATA_DIR, filename);

  return fs
    .readFileSync(fullPath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

// Convert MongoDB Extended JSON to JavaScript values.
function convert(value) {
  if (value instanceof Date || typeof value === "bigint") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(convert);
  }

  if (value && typeof value === "object") {
    if (typeof value.$oid === "string") {
      return value.$oid;
    }

    if (value.$date !== undefined) {
      const dateValue = value.$date;

      if (dateValue && typeof dateValue === "object") {
        if (dateValue.$numberLong !== undefined) {
          return new Date(Number(dateValue.$numberLong));
        }
      }

      return new Date(dateValue);
    }

    if (value.$numberInt !== undefined) {
      return Number(value.$numberInt);
    }

    if (value.$numberLong !== undefined) {
      return Number(value.$numberLong);
    }

    if (value.$numberDouble !== undefined) {
      return Number(value.$numberDouble);
    }

    if (value.$numberDecimal !== undefined) {
      return Number(value.$numberDecimal);
    }

    const result = {};

    for (const [key, child] of Object.entries(value)) {
      if (key === "__v") continue;
      result[key] = convert(child);
    }

    return result;
  }

  return value;
}

function commonFields(doc) {
  return {
    id: doc._id,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function contentMediaIds(content) {
  const ids = new Set();

  function walk(node) {
    if (!node || typeof node !== "object") return;

    if (
      node.type === "image" &&
      node.attrs &&
      typeof node.attrs.mediaId === "string" &&
      /^[a-f0-9]{24}$/i.test(node.attrs.mediaId)
    ) {
      ids.add(node.attrs.mediaId);
    }

    if (Array.isArray(node)) {
      node.forEach(walk);
    } else {
      Object.values(node).forEach(walk);
    }
  }

  walk(content);
  return [...ids];
}

function assertValidDate(value, field, id) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new Error(`Invalid ${field} date for document ${id}`);
  }
}

async function main() {
  const admins = readJsonLines("admins.json").map(convert);
  const categories = readJsonLines("categories.json").map(convert);
  const subcategories = readJsonLines("subcategories.json").map(convert);
  const articles = readJsonLines("articles.json").map(convert);
  const media = readJsonLines("media.json").map(convert);

  console.log("Import preview:");
  console.log({
    admins: admins.length,
    categories: categories.length,
    subcategories: subcategories.length,
    articles: articles.length,
    media: media.length,
  });

  if (
    admins.length !== 1 ||
    categories.length !== 21 ||
    subcategories.length !== 47 ||
    articles.length !== 46 ||
    media.length !== 6
  ) {
    throw new Error("Unexpected source record counts. Import cancelled.");
  }

  const allDocuments = [
    ...admins,
    ...categories,
    ...subcategories,
    ...articles,
    ...media,
  ];

  for (const doc of allDocuments) {
    if (typeof doc._id !== "string" || !/^[a-f0-9]{24}$/i.test(doc._id)) {
      throw new Error(`Invalid MongoDB ID: ${doc._id}`);
    }

    assertValidDate(doc.createdAt, "createdAt", doc._id);
    assertValidDate(doc.updatedAt, "updatedAt", doc._id);
  }

  // Validate relationships before writing anything.
  const adminIds = new Set(admins.map((x) => x._id));
  const categoryIds = new Set(categories.map((x) => x._id));
  const subcategoryById = new Map(subcategories.map((x) => [x._id, x]));
  const mediaIds = new Set(media.map((x) => x._id));

  for (const sub of subcategories) {
    if (!categoryIds.has(sub.category)) {
      throw new Error(`Missing category for subcategory ${sub._id}`);
    }
  }

  for (const article of articles) {
    if (!categoryIds.has(article.category)) {
      throw new Error(`Missing category for article ${article._id}`);
    }

    const sub = subcategoryById.get(article.subcategory);

    if (!sub || sub.category !== article.category) {
      throw new Error(
        `Invalid subcategory relationship for article ${article._id}`,
      );
    }

    if (!adminIds.has(article.author)) {
      throw new Error(`Missing author for article ${article._id}`);
    }
  }

  // Check media references before inserting.
  for (const doc of media) {
    if (
      typeof doc.size !== "number" ||
      !Number.isFinite(doc.size) ||
      doc.size < 0
    ) {
      throw new Error(`Invalid media size for ${doc._id}`);
    }
  }

  // The target tables must be empty.
  const counts = await Promise.all([
    prisma.admin.count(),
    prisma.category.count(),
    prisma.subcategory.count(),
    prisma.article.count(),
    prisma.media.count(),
    prisma.mediaReference.count(),
  ]);

  if (counts.some((count) => count !== 0)) {
    throw new Error(
      "Target tables are not empty. Import cancelled to avoid duplicates.",
    );
  }

  // Validate media IDs referenced in stored content.
  const contentDocuments = [
    ...articles.map((doc) => ({ type: "article", doc })),
    ...categories.map((doc) => ({ type: "category", doc })),
    ...subcategories.map((doc) => ({ type: "subcategory", doc })),
  ];

  for (const { doc } of contentDocuments) {
    for (const mediaId of contentMediaIds(doc.content)) {
      if (!mediaIds.has(mediaId)) {
        console.warn(
          `Warning: content in ${doc._id} references missing media ${mediaId}`,
        );
      }
    }
  }

  await prisma.$transaction(
    async (tx) => {
      for (const doc of admins) {
        await tx.admin.create({
          data: {
            ...commonFields(doc),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            isActive: doc.isActive,
          },
        });
      }

      for (const doc of categories) {
        await tx.category.create({
          data: {
            ...commonFields(doc),
            name: doc.name,
            slug: doc.slug,
            description: doc.description ?? "",
            content: doc.content ?? undefined,
            icon: doc.icon ?? "",
            status: doc.status,
            isActive: doc.isActive,
            order: doc.order,
          },
        });
      }

      for (const doc of subcategories) {
        await tx.subcategory.create({
          data: {
            ...commonFields(doc),
            categoryId: doc.category,
            name: doc.name,
            slug: doc.slug,
            description: doc.description ?? "",
            content: doc.content ?? undefined,
            order: doc.order,
            status: doc.status,
            isActive: doc.isActive,
          },
        });
      }

      for (const doc of articles) {
        await tx.article.create({
          data: {
            ...commonFields(doc),
            categoryId: doc.category,
            subcategoryId: doc.subcategory,
            authorId: doc.author,
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt,
            content: doc.content ?? undefined,
            readingTime: doc.readingTime,
            status: doc.status,
            isActive: doc.isActive,
          },
        });
      }

      for (const doc of media) {
        await tx.media.create({
          data: {
            ...commonFields(doc),
            provider: doc.provider,
            storageKey: doc.storageKey,
            url: doc.url,
            originalName: doc.originalName ?? "",
            mimeType: doc.mimeType ?? "",
            size: BigInt(doc.size),
            width: doc.width ?? null,
            height: doc.height ?? null,
            format: doc.format ?? "",
          },
        });
      }

      const referenceKeys = new Set();

      async function addReference(mediaId, entityType, entityId) {
        if (!mediaIds.has(mediaId)) return;

        if (!["article", "category", "subcategory"].includes(entityType)) {
          return;
        }

        if (typeof entityId !== "string" || !/^[a-f0-9]{24}$/i.test(entityId)) {
          return;
        }

        const key = `${mediaId}|${entityType}|${entityId}`;

        if (referenceKeys.has(key)) return;
        referenceKeys.add(key);

        await tx.mediaReference.create({
          data: { mediaId, entityType, entityId },
        });
      }

      // Preserve MongoDB Media.usedBy references.
      for (const doc of media) {
        for (const ref of doc.usedBy ?? []) {
          await addReference(doc._id, ref.entityType, ref.entityId);
        }
      }

      // Also collect references from rich-text content.
      for (const doc of articles) {
        for (const mediaId of contentMediaIds(doc.content)) {
          await addReference(mediaId, "article", doc._id);
        }
      }

      for (const doc of categories) {
        for (const mediaId of contentMediaIds(doc.content)) {
          await addReference(mediaId, "category", doc._id);
        }
      }

      for (const doc of subcategories) {
        for (const mediaId of contentMediaIds(doc.content)) {
          await addReference(mediaId, "subcategory", doc._id);
        }
      }
    },
    { timeout: 120000 },
  );

  console.log("Import successful.");

  console.log("MySQL record counts:");
  console.log({
    admins: await prisma.admin.count(),
    categories: await prisma.category.count(),
    subcategories: await prisma.subcategory.count(),
    articles: await prisma.article.count(),
    media: await prisma.media.count(),
    mediaReferences: await prisma.mediaReference.count(),
  });
}

main()
  .catch((error) => {
    console.error("Import failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
