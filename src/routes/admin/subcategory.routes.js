const express = require("express");

const {
  getAllAdmin,
  create,
  update,
  deactivate,
  activate,
} = require("../../controllers/subcategory.controller");

const asyncHandler = require("../../utils/asyncHandler");

const protect = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validate.middleware");

const {
  createSubcategorySchema,
  updateSubcategorySchema,
} = require("../../validators/subcategory.validator");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

router.get("/:categorySlug", protect, asyncHandler(getAllAdmin));

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  validate(createSubcategorySchema),
  asyncHandler(create),
);

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
  validate(updateSubcategorySchema),
  asyncHandler(update),
);

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

router.delete("/:id", protect, asyncHandler(deactivate));

module.exports = router;
