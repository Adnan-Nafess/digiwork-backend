const cloudinaryProvider = require("./providers/cloudinary.provider");

const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || "cloudinary";

const providers = {
  cloudinary: cloudinaryProvider,
};

const getStorageProvider = () => {
  const provider = providers[STORAGE_PROVIDER];

  if (!provider) {
    throw new Error(`Unsupported storage provider: ${STORAGE_PROVIDER}`);
  }

  return provider;
};

const uploadImage = async (file) => {
  const provider = getStorageProvider();

  return provider.uploadImage(file);
};

const deleteImage = async (storageKey) => {
  const provider = getStorageProvider();

  return provider.deleteImage(storageKey);
};

module.exports = {
  uploadImage,
  deleteImage,
};
