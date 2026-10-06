const express = require("express");

const { getAll, getOne } = require("../controllers/category.controller");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// ==============================
// Public Category Routes
// ==============================

// Get all published categories
router.get("/", asyncHandler(getAll));

// Get single published category
router.get("/:categorySlug", asyncHandler(getOne));

module.exports = router;
