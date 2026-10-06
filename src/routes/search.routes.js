const express = require("express");

const { search } = require("../controllers/search.controller");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(search));

module.exports = router;
