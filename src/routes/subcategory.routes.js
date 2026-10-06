const express = require("express");

const { getAll, getOne } = require("../controllers/subcategory.controller");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// ==============================
// Public Subcategory Routes
// ==============================

// Get published subcategories of a category
router.get("/:categorySlug/subcategories", asyncHandler(getAll));

// Get single published subcategory
router.get("/:categorySlug/:subcategorySlug", asyncHandler(getOne));

module.exports = router;
