const mongoose = require("mongoose");

const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const { syncContentMedia } = require("./media.service");

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE CATEGORY
|--------------------------------------------------------------------------
*/

const createCategory = async ({
  name,
  description,
  content,
  icon,
  order,
  status,
  isActive,
}) => {
  const trimmedName = name.trim();
  const slug = generateSlug(trimmedName);

  const existingCategory = await Category.findOne({
    $or: [{ name: trimmedName }, { slug }],
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const finalStatus = status || "draft";

  const finalIsActive = isActive !== undefined ? isActive : true;

  /*
  |--------------------------------------------------------------------------
  | Published category must have valid state
  |--------------------------------------------------------------------------
  |
  | Category has no parent dependency.
  |
  */

  const category = await Category.create({
    name: trimmedName,
    slug,
    description,
    content,
    icon,
    order,
    status: finalStatus,
    isActive: finalIsActive,
  });

  /*
  |--------------------------------------------------------------------------
  | MEDIA SYNC
  |--------------------------------------------------------------------------
  |
  | Useful when category is created with rich content
  | that already contains uploaded media.
  |
  */

  if (content !== undefined) {
    await syncContentMedia({
      entityType: "category",
      entityId: category._id,
      previousContent: null,
      nextContent: category.content,
    });
  }

  return category;
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET PUBLISHED CATEGORIES
|--------------------------------------------------------------------------
*/

const getCategories = async () => {
  return Category.find({
    isActive: true,
    status: "published",
  }).sort({
    order: 1,
    name: 1,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL CATEGORIES
|--------------------------------------------------------------------------
|
| Admin must receive:
|
| Draft + Active
| Draft + Inactive
| Published + Active
| Published + Inactive
|
*/

const getAllCategoriesForAdmin = async () => {
  return Category.find({}).sort({
    order: 1,
    name: 1,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE CATEGORY
|--------------------------------------------------------------------------
*/

const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({
    slug,
    isActive: true,
    status: "published",
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE CATEGORY
|--------------------------------------------------------------------------
*/

const updateCategory = async (categoryId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  /*
  |--------------------------------------------------------------------------
  | Keep old content for media comparison
  |--------------------------------------------------------------------------
  */

  const previousContent = category.content;

  /*
  |--------------------------------------------------------------------------
  | Name + Slug
  |--------------------------------------------------------------------------
  */

  if (updateData.name !== undefined && updateData.name.trim()) {
    const newName = updateData.name.trim();

    const newSlug = generateSlug(newName);

    const existingCategory = await Category.findOne({
      _id: {
        $ne: categoryId,
      },

      $or: [
        {
          name: newName,
        },
        {
          slug: newSlug,
        },
      ],
    });

    if (existingCategory) {
      throw new ApiError(409, "Category with this name already exists");
    }

    category.name = newName;
    category.slug = newSlug;
  }

  /*
  |--------------------------------------------------------------------------
  | Description
  |--------------------------------------------------------------------------
  */

  if (updateData.description !== undefined) {
    category.description = updateData.description;
  }

  /*
  |--------------------------------------------------------------------------
  | Content
  |--------------------------------------------------------------------------
  */

  if (updateData.content !== undefined) {
    category.content = updateData.content;
  }

  /*
  |--------------------------------------------------------------------------
  | Icon
  |--------------------------------------------------------------------------
  */

  if (updateData.icon !== undefined) {
    category.icon = updateData.icon;
  }

  /*
  |--------------------------------------------------------------------------
  | Order
  |--------------------------------------------------------------------------
  */

  if (updateData.order !== undefined) {
    category.order = Number(updateData.order);
  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  if (updateData.status !== undefined) {
    if (updateData.status !== "draft" && updateData.status !== "published") {
      throw new ApiError(400, "Invalid category status");
    }

    category.status = updateData.status;
  }

  /*
  |--------------------------------------------------------------------------
  | Active State
  |--------------------------------------------------------------------------
  */

  if (updateData.isActive !== undefined) {
    category.isActive = updateData.isActive;
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  const updatedCategory = await category.save();

  /*
  |--------------------------------------------------------------------------
  | MEDIA SYNC
  |--------------------------------------------------------------------------
  |
  | This handles:
  |
  | 1. Newly added images
  | 2. Removed images
  | 3. Unused image deletion
  |
  */

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "category",
      entityId: updatedCategory._id,
      previousContent,
      nextContent: updatedCategory.content,
    });
  }

  return updatedCategory;
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE CATEGORY
|--------------------------------------------------------------------------
*/

const deactivateCategory = async (categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (!category.isActive) {
    return category;
  }

  category.isActive = false;

  const updatedCategory = await category.save();

  return updatedCategory;
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE CATEGORY
|--------------------------------------------------------------------------
*/

const activateCategory = async (categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (category.isActive) {
    return category;
  }

  category.isActive = true;

  const updatedCategory = await category.save();

  return updatedCategory;
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
  createCategory,
  getCategories,
  getAllCategoriesForAdmin,
  getCategoryBySlug,
  updateCategory,
  deactivateCategory,
  activateCategory,
};
