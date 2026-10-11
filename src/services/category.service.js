const crypto = require("crypto");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const { syncContentMedia } = require("./media.service");

const isValidId = (id) =>
  typeof id === "string" && /^[a-f0-9]{24}$/i.test(id);

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

  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [{ name: trimmedName }, { slug }],
    },
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      // Generate a unique 24-character hexadecimal ID.
      id: crypto.randomBytes(12).toString("hex"),
      name: trimmedName,
      slug,
      description: description ?? "",
      ...(content !== undefined ? { content } : {}),
      icon: icon ?? "",
      order: order !== undefined ? Number(order) : 0,
      status: status || "draft",
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  if (content !== undefined) {
    await syncContentMedia({
      entityType: "category",
      entityId: category.id,
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
  return prisma.category.findMany({
    where: {
      isActive: true,
      status: "published",
    },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL CATEGORIES
|--------------------------------------------------------------------------
*/

const getAllCategoriesForAdmin = async () => {
  return prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE CATEGORY
|--------------------------------------------------------------------------
*/

const getCategoryBySlug = async (slug) => {
  const category = await prisma.category.findFirst({
    where: {
      slug,
      isActive: true,
      status: "published",
    },
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
  if (!isValidId(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const previousContent = category.content;
  const data = {};

  if (updateData.name !== undefined && updateData.name.trim()) {
    const newName = updateData.name.trim();
    const newSlug = generateSlug(newName);

    const existingCategory = await prisma.category.findFirst({
      where: {
        id: { not: categoryId },
        OR: [{ name: newName }, { slug: newSlug }],
      },
    });

    if (existingCategory) {
      throw new ApiError(409, "Category with this name already exists");
    }

    data.name = newName;
    data.slug = newSlug;
  }

  if (updateData.description !== undefined) {
    data.description = updateData.description;
  }

  if (updateData.content !== undefined) {
    data.content = updateData.content;
  }

  if (updateData.icon !== undefined) {
    data.icon = updateData.icon;
  }

  if (updateData.order !== undefined) {
    const order = Number(updateData.order);

    if (!Number.isInteger(order)) {
      throw new ApiError(400, "Invalid category order");
    }

    data.order = order;
  }

  if (updateData.status !== undefined) {
    if (!["draft", "published"].includes(updateData.status)) {
      throw new ApiError(400, "Invalid category status");
    }

    data.status = updateData.status;
  }

  if (updateData.isActive !== undefined) {
    data.isActive = updateData.isActive;
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data,
  });

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "category",
      entityId: updatedCategory.id,
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
  if (!isValidId(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (!category.isActive) {
    return category;
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: { isActive: false },
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE CATEGORY
|--------------------------------------------------------------------------
*/

const activateCategory = async (categoryId) => {
  if (!isValidId(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (category.isActive) {
    return category;
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: { isActive: true },
  });
};

module.exports = {
  createCategory,
  getCategories,
  getAllCategoriesForAdmin,
  getCategoryBySlug,
  updateCategory,
  deactivateCategory,
  activateCategory,
};
