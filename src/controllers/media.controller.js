const { uploadEditorImage } = require("../services/media.service");

const uploadImage = async (req, res) => {
  const media = await uploadEditorImage(req.file);

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    data: media,
  });
};

module.exports = {
  uploadImage,
};
