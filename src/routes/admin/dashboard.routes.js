const express = require("express");

const { getStats } = require("../../controllers/dashboard.controller");

const asyncHandler = require("../../utils/asyncHandler");

const protect = require("../../middleware/auth.middleware");

const router = express.Router();

// ======================================
// Admin Dashboard
// ======================================

router.get("/stats", protect, asyncHandler(getStats));

module.exports = router;
