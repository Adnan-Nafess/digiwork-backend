const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const storage = require("../storage/storage.service");

const isValidId = (id) =>
  typeof id === "string" && /^[a-f0-9]{24}$/i.test(id);

/*
|--------------------------------------------------------------------------
| CONTENT HELPERS
|--------------------------------------------------------------------------
*/

const parseContent = (content) => {
  if (!content) return null;

  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  return content;
};

const extractMediaIds = (content) => {
  const document = parseContent(content);

  if (!document || typeof document !== "object") {
    return [];
  }

  const mediaIds = new Set();

  const walk = (node) => {
    if (!node || typeof node !== "object") return;

    if (
      node.type === "image" &&
      typeof node.attrs?.mediaId === "string" &&
      isValidId(node.attrs.mediaId)
    ) {
      mediaIds.add(node.attrs.mediaId);
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(walk);
    }
  };

  walk(document);

  return [...mediaIds];
};

/*
|--------------------------------------------------------------------------
| UPLOAD IMAGE
|--------------------------------------------------------------------------
*/

const uploadEditorImage = async (file) => {
  if (!file) {
    throw new ApiError(400, "Image file is required.");
  }

  let uploadedImage = null;

  try {
    uploadedImage = await storage.uploadImage(file);

    if (!uploadedImage?.storageKey || !uploadedImage?.url) {
      throw new Error("Storage key or image URL was not generated.");
    }

    const media = await prisma.media.create({
      data: {
        provider: uploadedImage.provider,
        storageKey: uploadedImage.storageKey,
        url: uploadedImage.url,
        originalName: uploadedImage.originalName || file.originalname || "",
        mimeType: uploadedImage.mimeType || file.mimetype || "",
        size: BigInt(uploadedImage.size || file.size || 0),
        width: uploadedImage.width ?? null,
        height: uploadedImage.height ?? null,
        format: uploadedImage.format || "",
      },
    });

    return {
      mediaId: media.id,
      provider: media.provider,
      storageKey: media.storageKey,
      url: media.url,
      originalName: media.originalName,
      mimeType: media.mimeType,
      size: Number(media.size),
      width: media.width,
      height: media.height,
      format: media.format,
    };
  } catch (error) {
    if (uploadedImage?.storageKey) {
      try {
        await storage.deleteImage(uploadedImage.storageKey);
      } catch (cleanupError) {
        console.error("Unable to rollback uploaded image:", cleanupError);
      }
    }

    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Editor image upload error:", error);
    throw new ApiError(500, "Unable to upload image.");
  }
};

/*
|--------------------------------------------------------------------------
| SYNC CONTENT MEDIA
|--------------------------------------------------------------------------
|
| Called after content is successfully saved.
| References are stored in the MediaReference table.
|
*/

const syncContentMedia = async ({
  entityType,
  entityId,
  previousContent,
  nextContent,
}) => {
  if (!["article", "category", "subcategory"].includes(entityType)) {
    throw new ApiError(400, "Invalid media entity type.");
  }

  if (!isValidId(entityId)) {
    throw new ApiError(400, "Invalid media entity ID.");
  }

  const previousMediaIds = extractMediaIds(previousContent);
  const nextMediaIds = extractMediaIds(nextContent);

  const previousSet = new Set(previousMediaIds);
  const nextSet = new Set(nextMediaIds);

  const addedMediaIds = nextMediaIds.filter((id) => !previousSet.has(id));

  const removedMediaIds = previousMediaIds.filter((id) => !nextSet.has(id));

  const validAddedIds = [];

  for (const mediaId of addedMediaIds) {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      select: { id: true },
    });

    if (media) {
      validAddedIds.push(mediaId);
    } else {
      console.warn(`Media ${mediaId} was not found; reference skipped.`);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ADD REFERENCES
  |--------------------------------------------------------------------------
  */

  for (const mediaId of validAddedIds) {
    await prisma.mediaReference.upsert({
      where: {
        mediaId_entityType_entityId: {
          mediaId,
          entityType,
          entityId,
        },
      },
      create: {
        mediaId,
        entityType,
        entityId,
      },
      update: {},
    });
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE REFERENCES
  |--------------------------------------------------------------------------
  */

  const mediaToCheckForDeletion = [];

  for (const mediaId of removedMediaIds) {
    const existingMedia = await prisma.media.findUnique({
      where: { id: mediaId },
      select: { id: true, storageKey: true },
    });

    if (!existingMedia) continue;

    await prisma.mediaReference.deleteMany({
      where: {
        mediaId,
        entityType,
        entityId,
      },
    });

    const remainingReferences = await prisma.mediaReference.count({
      where: { mediaId },
    });

    if (remainingReferences === 0) {
      mediaToCheckForDeletion.push(existingMedia);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE UNUSED MEDIA
  |--------------------------------------------------------------------------
  */

  for (const media of mediaToCheckForDeletion) {
    try {
      // Re-check before deleting the physical image.
      const latestMedia = await prisma.media.findUnique({
        where: { id: media.id },
        include: { references: true },
      });

      if (!latestMedia || latestMedia.references.length > 0) {
        continue;
      }

      await storage.deleteImage(latestMedia.storageKey);

      // Conditional delete protects against references added meanwhile.
      await prisma.media.deleteMany({
        where: {
          id: latestMedia.id,
          references: { none: {} },
        },
      });
    } catch (error) {
      console.error(`Unable to delete unused media ${media.id}:`, error);
    }
  }

  return {
    addedMediaIds: validAddedIds,
    removedMediaIds,
  };
};

module.exports = {
  uploadEditorImage,
  syncContentMedia,
  extractMediaIds,
};
