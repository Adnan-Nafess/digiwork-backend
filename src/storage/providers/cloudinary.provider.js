const { Readable } = require("stream");

const cloudinary = require("../../config/cloudinary");

const uploadImage = async (file) => {
  if (!file?.buffer) {
    throw new Error("Image file is required.");
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "dailyfix/editor",
        resource_type: "image",
      },
      (error, uploadedResult) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(uploadedResult);
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });

  return {
    provider: "cloudinary",

    storageKey: result.public_id,

    url: result.secure_url,

    originalName: file.originalname,

    mimeType: file.mimetype,

    size: result.bytes || file.size || 0,

    width: result.width || null,

    height: result.height || null,

    format: result.format || "",
  };
};

const deleteImage = async (storageKey) => {
  if (!storageKey) {
    return;
  }

  const result = await cloudinary.uploader.destroy(storageKey, {
    resource_type: "image",
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary image deletion failed: ${storageKey}`);
  }

  return result;
};

module.exports = {
  uploadImage,
  deleteImage,
};
