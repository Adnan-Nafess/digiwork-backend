const express = require("express");

const {
  create,
  getAllAdmin,
  update,
  deactivate,
  activate,
} = require("../../controllers/article.controller");

const asyncHandler = require("../../utils/asyncHandler");

const protect = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validate.middleware");

const {
  createArticleSchema,
  updateArticleSchema,
} = require("../../validators/article.validator");

const router = express.Router();

// ==========================================
// GET ALL ARTICLES - ADMIN
// ==========================================

router.get("/", protect, asyncHandler(getAllAdmin));

// ==========================================
// CREATE ARTICLE
// ==========================================

router.post("/", protect, validate(createArticleSchema), asyncHandler(create));

// ==========================================
// UPDATE ARTICLE
// ==========================================

router.patch(
  "/:id",
  protect,
  validate(updateArticleSchema),
  asyncHandler(update),
);

// ==========================================
// ACTIVATE ARTICLE
// ==========================================

router.patch("/:id/activate", protect, asyncHandler(activate));

// ==========================================
// DEACTIVATE ARTICLE
// ==========================================

router.delete("/:id", protect, asyncHandler(deactivate));

module.exports = router;
