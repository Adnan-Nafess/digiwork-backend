const mongoose = require("mongoose");

const Media = require("../models/Media");
const ApiError = require("../utils/ApiError");
const storage = require("../storage/storage.service");

/*
|--------------------------------------------------------------------------
| CONTENT HELPERS
|--------------------------------------------------------------------------
*/

const parseContent = (content) => {
  if (!content) {
    return null;
  }

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
    if (!node || typeof node !== "object") {
      return;
    }

    if (
      node.type === "image" &&
      node.attrs?.mediaId &&
      mongoose.Types.ObjectId.isValid(node.attrs.mediaId)
    ) {
      mediaIds.add(node.attrs.mediaId.toString());
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

    if (!uploadedImage?.storageKey) {
      throw new Error("Storage key was not generated.");
    }

    if (!uploadedImage?.url) {
      throw new Error("Image URL was not generated.");
    }

    const media = await Media.create({
      provider: uploadedImage.provider,
      storageKey: uploadedImage.storageKey,
      url: uploadedImage.url,
      originalName: uploadedImage.originalName || file.originalname || "",
      mimeType: uploadedImage.mimeType || file.mimetype || "",
      size: uploadedImage.size || file.size || 0,
      width: uploadedImage.width,
      height: uploadedImage.height,
      format: uploadedImage.format,
      usedBy: [],
    });

    return {
      mediaId: media._id.toString(),
      provider: media.provider,
      storageKey: media.storageKey,
      url: media.url,
      originalName: media.originalName,
      mimeType: media.mimeType,
      size: media.size,
      width: media.width,
      height: media.height,
      format: media.format,
    };
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | Rollback storage upload if MongoDB creation fails.
    |--------------------------------------------------------------------------
    */

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
| Called AFTER content is successfully saved.
|
| Existing references:
| old content
|
| Current references:
| new content
|
| Removed media is deleted physically only when
| no other content is using it.
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

  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    throw new ApiError(400, "Invalid media entity ID.");
  }

  const previousMediaIds = extractMediaIds(previousContent);

  const nextMediaIds = extractMediaIds(nextContent);

  const previousSet = new Set(previousMediaIds);

  const nextSet = new Set(nextMediaIds);

  const addedMediaIds = nextMediaIds.filter(
    (mediaId) => !previousSet.has(mediaId),
  );

  const removedMediaIds = previousMediaIds.filter(
    (mediaId) => !nextSet.has(mediaId),
  );

  /*
  |--------------------------------------------------------------------------
  | ADD CURRENT REFERENCES
  |--------------------------------------------------------------------------
  */

  for (const mediaId of addedMediaIds) {
    await Media.updateOne(
      {
        _id: mediaId,
      },
      {
        $addToSet: {
          usedBy: {
            entityType,
            entityId,
          },
        },
      },
    );
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE OLD REFERENCES
  |--------------------------------------------------------------------------
  */

  const mediaToCheckForDeletion = [];

  for (const mediaId of removedMediaIds) {
    const media = await Media.findOneAndUpdate(
      {
        _id: mediaId,
      },
      {
        $pull: {
          usedBy: {
            entityType,
            entityId,
          },
        },
      },
      {
        returnDocument: "after",
      },
    );

    if (media && (!media.usedBy || media.usedBy.length === 0)) {
      mediaToCheckForDeletion.push(media);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE UNUSED MEDIA
  |--------------------------------------------------------------------------
  */

  for (const media of mediaToCheckForDeletion) {
    try {
      /*
       * Re-check before physical deletion.
       * Another content record may have referenced
       * the same media meanwhile.
       */

      const latestMedia = await Media.findById(media._id);

      if (!latestMedia) {
        continue;
      }

      if (latestMedia.usedBy && latestMedia.usedBy.length > 0) {
        continue;
      }

      await storage.deleteImage(latestMedia.storageKey);

      await Media.deleteOne({
        _id: latestMedia._id,
      });
    } catch (error) {
      console.error(`Unable to delete unused media ${media._id}:`, error);
    }
  }

  return {
    addedMediaIds,
    removedMediaIds,
  };
};

module.exports = {
  uploadEditorImage,
  syncContentMedia,
  extractMediaIds,
};
