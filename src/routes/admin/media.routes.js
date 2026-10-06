const express = require("express");

const protect = require("../../middleware/auth.middleware");
const uploadImage = require("../../middleware/upload.middleware");
const asyncHandler = require("../../utils/asyncHandler");

const {
  uploadImage: uploadImageController,
} = require("../../controllers/media.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN - UPLOAD EDITOR IMAGE
|--------------------------------------------------------------------------
*/

router.post(
  "/image",
  protect,
  uploadImage.single("image"),
  asyncHandler(uploadImageController),
);

module.exports = router;
