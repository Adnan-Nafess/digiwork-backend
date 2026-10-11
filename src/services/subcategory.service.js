
const crypto = require("crypto");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const { syncContentMedia } = require("./media.service");

const isValidId = (id) =>
  typeof id === "string" && /^[a-f0-9]{24}$/i.test(id);

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
  content,
  order,
  status,
  isActive,
}) => {
  const finalCategoryId = categoryId || category;

  if (!isValidId(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const parentCategory = await prisma.category.findFirst({
    where: {
      id: finalCategoryId,
      isActive: true,
    },
  });

  if (!parentCategory) {
    throw new ApiError(404, "Category not found or inactive");
  }

  const trimmedName = name.trim();
  const slug = generateSlug(trimmedName);

  const existingSubcategory = await prisma.subcategory.findUnique({
    where: {
      categoryId_slug: {
        categoryId: finalCategoryId,
        slug,
      },
    },
  });

  if (existingSubcategory) {
    throw new ApiError(409, "Subcategory already exists in this category");
  }

  const finalStatus = status || "draft";
  const finalIsActive = isActive !== undefined ? isActive : true;

  if (!["draft", "published"].includes(finalStatus)) {
    throw new ApiError(400, "Invalid subcategory status");
  }

  if (finalStatus === "published" && parentCategory.status !== "published") {
    throw new ApiError(
      400,
      "Cannot publish subcategory while its category is not published",
    );
  }

  if (
    finalStatus === "published" &&
    finalIsActive &&
    !parentCategory.isActive
  ) {
    throw new ApiError(
      400,
      "Cannot activate published subcategory while its category is inactive",
    );
  }

  return prisma.subcategory.create({
    data: {
      id: crypto.randomBytes(12).toString("hex"),
      categoryId: finalCategoryId,
      name: trimmedName,
      slug,
      description: description || "",
      ...(content !== undefined ? { content } : {}),
      order: order !== undefined ? Number(order) : 0,
      status: finalStatus,
      isActive: finalIsActive,
    },
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ALL
|--------------------------------------------------------------------------
*/

const getSubcategories = async (categorySlug) => {
  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
      isActive: true,
      status: "published",
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategories = await prisma.subcategory.findMany({
    where: {
      categoryId: category.id,
      isActive: true,
      status: "published",
    },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return { category, subcategories };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE
|--------------------------------------------------------------------------
*/

const getSubcategoryBySlug = async (categorySlug, subcategorySlug) => {
  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
      isActive: true,
      status: "published",
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategory = await prisma.subcategory.findFirst({
    where: {
      categoryId: category.id,
      slug: subcategorySlug,
      isActive: true,
      status: "published",
    },
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  return { category, subcategory };
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

const getAllSubcategoriesForAdmin = async (categorySlug) => {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategories = await prisma.subcategory.findMany({
    where: { categoryId: category.id },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return { category, subcategories };
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

const updateSubcategory = async (subcategoryId, updateData) => {
  if (!isValidId(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryId },
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  const previousContent = subcategory.content;

  const finalCategoryId =
    updateData.categoryId ||
    updateData.category ||
    subcategory.categoryId;

  if (!isValidId(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await prisma.category.findUnique({
    where: { id: finalCategoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const update = {
    categoryId: finalCategoryId,
  };

  if (updateData.name !== undefined && updateData.name.trim()) {
    const newName = updateData.name.trim();
    const newSlug = generateSlug(newName);

    const existingSubcategory = await prisma.subcategory.findFirst({
      where: {
        id: { not: subcategoryId },
        categoryId: finalCategoryId,
        slug: newSlug,
      },
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

  if (updateData.description !== undefined) {
    update.description = updateData.description;
  }

  if (updateData.content !== undefined) {
    update.content = updateData.content;
  }

  if (updateData.order !== undefined) {
    const order = Number(updateData.order);

    if (!Number.isInteger(order)) {
      throw new ApiError(400, "Invalid subcategory order");
    }

    update.order = order;
  }

  const finalStatus =
    updateData.status !== undefined
      ? updateData.status
      : subcategory.status;

  const finalIsActive =
    updateData.isActive !== undefined
      ? updateData.isActive
      : subcategory.isActive;

  if (updateData.status !== undefined) {
    if (!["draft", "published"].includes(updateData.status)) {
      throw new ApiError(400, "Invalid subcategory status");
    }

    update.status = updateData.status;
  }

  if (updateData.isActive !== undefined) {
    update.isActive = updateData.isActive;
  }

  if (finalStatus === "published" && finalIsActive) {
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

  if (updateData.isActive === true && !category.isActive) {
    throw new ApiError(
      400,
      "Cannot activate subcategory while its category is inactive",
    );
  }

  const updatedSubcategory = await prisma.subcategory.update({
    where: { id: subcategoryId },
    data: update,
  });

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "subcategory",
      entityId: updatedSubcategory.id,
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
  if (!isValidId(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryId },
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  if (!subcategory.isActive) {
    return subcategory;
  }

  return prisma.subcategory.update({
    where: { id: subcategoryId },
    data: { isActive: false },
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

const activateSubcategory = async (subcategoryId) => {
  if (!isValidId(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: subcategoryId },
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found");
  }

  if (subcategory.isActive) {
    return subcategory;
  }

  const category = await prisma.category.findUnique({
    where: { id: subcategory.categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Parent category not found");
  }

  if (!category.isActive) {
    throw new ApiError(
      400,
      "Cannot activate subcategory while its category is inactive",
    );
  }

  if (
    subcategory.status === "published" &&
    category.status !== "published"
  ) {
    throw new ApiError(
      400,
      "Cannot activate published subcategory while its category is not published",
    );
  }

  return prisma.subcategory.update({
    where: { id: subcategoryId },
    data: { isActive: true },
  });
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
