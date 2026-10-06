const mongoose = require("mongoose");

const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const { syncContentMedia } = require("./media.service");

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

const createSubcategory = async ({
  categoryId,
  category,
  name,
  description,
  order,
  status,
  isActive,
}) => {
  const finalCategoryId = categoryId || category;

  if (!mongoose.Types.ObjectId.isValid(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const parentCategory = await Category.findOne({
    _id: finalCategoryId,
    isActive: true,
  });

  if (!parentCategory) {
    throw new ApiError(404, "Category not found or inactive");
  }

  const trimmedName = name.trim();
  const slug = generateSlug(trimmedName);

  const existingSubcategory = await Subcategory.findOne({
    category: finalCategoryId,
    slug,
  });

  if (existingSubcategory) {
    throw new ApiError(409, "Subcategory already exists in this category");
  }

  const finalStatus = status || "draft";
  const finalIsActive = isActive !== undefined ? isActive : true;

  /*
  |--------------------------------------------------------------------------
  | Published subcategory requires published + active category
  |--------------------------------------------------------------------------
  */

  if (finalStatus === "published" && parentCategory.status !== "published") {
    throw new ApiError(
      400,
      "Cannot publish subcategory while its category is not published",
    );
  }

  if (
    finalStatus === "published" &&
    finalIsActive === true &&
    !parentCategory.isActive
  ) {
    throw new ApiError(
      400,
      "Cannot activate published subcategory while its category is inactive",
    );
  }

  const subcategory = await Subcategory.create({
    category: finalCategoryId,
    name: trimmedName,
    slug,
    description: description || "",
    order: order || 0,
    status: finalStatus,
    isActive: finalIsActive,
  });

  return subcategory;
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ALL
|--------------------------------------------------------------------------
*/

const getSubcategories = async (categorySlug) => {
  const category = await Category.findOne({
    slug: categorySlug,
    isActive: true,
    status: "published",
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategories = await Subcategory.find({
    category: category._id,
    isActive: true,
    status: "published",
  }).sort({
    order: 1,
    createdAt: 1,
  });

  return {
    category,
    subcategories,
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE
|--------------------------------------------------------------------------
*/

const getSubcategoryBySlug = async (categorySlug, subcategorySlug) => {
  const category = await Category.findOne({
    slug: categorySlug,
    isActive: true,
    status: "published",
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategory = await Subcategory.findOne({
    category: category._id,
    slug: subcategorySlug,
    isActive: true,
    status: "published",
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  return {
    category,
    subcategory,
  };
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Admin must see all subcategories regardless of:
| - draft/published
| - active/inactive
|--------------------------------------------------------------------------
*/

const getAllSubcategoriesForAdmin = async (categorySlug) => {
  const category = await Category.findOne({
    slug: categorySlug,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategories = await Subcategory.find({
    category: category._id,
  }).sort({
    order: 1,
    createdAt: 1,
  });

  return {
    category,
    subcategories,
  };
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

const updateSubcategory = async (subcategoryId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  /*
  |--------------------------------------------------------------------------
  | Keep old content for media comparison
  |--------------------------------------------------------------------------
  */

  const previousContent = subcategory.content;

  /*
  |--------------------------------------------------------------------------
  | Determine final category
  |--------------------------------------------------------------------------
  */

  const finalCategoryId =
    updateData.categoryId ||
    updateData.category ||
    subcategory.category.toString();

  if (!mongoose.Types.ObjectId.isValid(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  /*
  |--------------------------------------------------------------------------
  | Admin editing does NOT require active parent category
  |--------------------------------------------------------------------------
  */

  const category = await Category.findById(finalCategoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const update = {
    category: finalCategoryId,
  };

  /*
  |--------------------------------------------------------------------------
  | Name + Slug
  |--------------------------------------------------------------------------
  */

  if (updateData.name !== undefined && updateData.name.trim()) {
    const newName = updateData.name.trim();

    const newSlug = generateSlug(newName);

    const existingSubcategory = await Subcategory.findOne({
      _id: {
        $ne: subcategoryId,
      },
      category: finalCategoryId,
      slug: newSlug,
    });

    if (existingSubcategory) {
      throw new ApiError(
        409,
        "Subcategory with this name already exists in this category",
      );
    }

    update.name = newName;
    update.slug = newSlug;
  }

  /*
  |--------------------------------------------------------------------------
  | Description
  |--------------------------------------------------------------------------
  */

  if (updateData.description !== undefined) {
    update.description = updateData.description;
  }

  /*
  |--------------------------------------------------------------------------
  | Rich Content
  |--------------------------------------------------------------------------
  */

  if (updateData.content !== undefined) {
    update.content = updateData.content;
  }

  /*
  |--------------------------------------------------------------------------
  | Order
  |--------------------------------------------------------------------------
  */

  if (updateData.order !== undefined) {
    update.order = Number(updateData.order);
  }

  /*
  |--------------------------------------------------------------------------
  | Determine final state
  |--------------------------------------------------------------------------
  */

  const finalStatus =
    updateData.status !== undefined ? updateData.status : subcategory.status;

  const finalIsActive =
    updateData.isActive !== undefined
      ? updateData.isActive
      : subcategory.isActive;

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  if (updateData.status !== undefined) {
    if (updateData.status !== "draft" && updateData.status !== "published") {
      throw new ApiError(400, "Invalid subcategory status");
    }

    /*
    |--------------------------------------------------------------------------
    | Published requires published parent
    |--------------------------------------------------------------------------
    */

    if (updateData.status === "published" && category.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish subcategory while its category is not published",
      );
    }

    update.status = updateData.status;
  }

  /*
  |--------------------------------------------------------------------------
  | Active State
  |--------------------------------------------------------------------------
  */

  if (updateData.isActive !== undefined) {
    /*
    |--------------------------------------------------------------------------
    | Cannot activate child under inactive category
    |--------------------------------------------------------------------------
    */

    if (updateData.isActive === true && !category.isActive) {
      throw new ApiError(
        400,
        "Cannot activate subcategory while its category is inactive",
      );
    }

    update.isActive = updateData.isActive;
  }

  /*
  |--------------------------------------------------------------------------
  | Published + Active requires active parent
  |--------------------------------------------------------------------------
  */

  if (finalStatus === "published" && finalIsActive === true) {
    if (category.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish subcategory while its category is not published",
      );
    }

    if (!category.isActive) {
      throw new ApiError(
        400,
        "Cannot activate published subcategory while its category is inactive",
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  Object.assign(subcategory, update);

  const updatedSubcategory = await subcategory.save();

  /*
  |--------------------------------------------------------------------------
  | MEDIA SYNC
  |--------------------------------------------------------------------------
  |
  | Only sync when content actually changed.
  |
  */

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "subcategory",
      entityId: updatedSubcategory._id,
      previousContent,
      nextContent: updatedSubcategory.content,
    });
  }

  return updatedSubcategory;
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

const deactivateSubcategory = async (subcategoryId) => {
  if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  if (!subcategory.isActive) {
    return subcategory;
  }

  subcategory.isActive = false;

  const updatedSubcategory = await subcategory.save();

  return updatedSubcategory;
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

const activateSubcategory = async (subcategoryId) => {
  if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  if (subcategory.isActive) {
    return subcategory;
  }

  const category = await Category.findById(subcategory.category);

  if (!category) {
    throw new ApiError(404, "Parent category not found");
  }

  if (!category.isActive) {
    throw new ApiError(
      400,
      "Cannot activate subcategory while its category is inactive",
    );
  }

  /*
  |--------------------------------------------------------------------------
  | A published subcategory can be active only
  | when its parent category is also published.
  |--------------------------------------------------------------------------
  */

  if (subcategory.status === "published" && category.status !== "published") {
    throw new ApiError(
      400,
      "Cannot activate published subcategory while its category is not published",
    );
  }

  subcategory.isActive = true;

  const updatedSubcategory = await subcategory.save();

  return updatedSubcategory;
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryBySlug,
  getAllSubcategoriesForAdmin,
  updateSubcategory,
  deactivateSubcategory,
  activateSubcategory,
};
