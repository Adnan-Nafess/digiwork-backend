const express = require("express");

const {
  getLatest,
  getAll,
  getOne,
} = require("../controllers/article.controller");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC - LATEST ARTICLES
|--------------------------------------------------------------------------
|
| GET /api/articles
|
*/

router.get("/", asyncHandler(getLatest));

/*
|--------------------------------------------------------------------------
| PUBLIC - ARTICLES BY SUBCATEGORY
|--------------------------------------------------------------------------
|
| GET /api/articles/:categorySlug/:subcategorySlug
|
*/

router.get("/:categorySlug/:subcategorySlug", asyncHandler(getAll));

/*
|--------------------------------------------------------------------------
| PUBLIC - SINGLE ARTICLE
|--------------------------------------------------------------------------
|
| GET /api/articles/:categorySlug/:subcategorySlug/:articleSlug
|
*/

router.get(
  "/:categorySlug/:subcategorySlug/:articleSlug",
  asyncHandler(getOne),
);

module.exports = router;
