const express = require("express");

const {
  getAllAdmin,
  create,
  update,
  deactivate,
  activate,
} = require("../../controllers/category.controller");

const asyncHandler = require("../../utils/asyncHandler");

const protect = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validate.middleware");

const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../validators/category.validator");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

router.get("/", protect, asyncHandler(getAllAdmin));

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

router.post("/", protect, validate(createCategorySchema), asyncHandler(create));

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

router.patch("/:id/activate", protect, asyncHandler(activate));

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id",
  protect,
  validate(updateCategorySchema),
  asyncHandler(update),
);

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

router.delete("/:id", protect, asyncHandler(deactivate));

module.exports = router;
