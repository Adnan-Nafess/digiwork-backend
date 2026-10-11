const crypto = require("crypto");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const calculateReadingTime = require("../utils/readingTime");
const { syncContentMedia } = require("./media.service");

const isValidId = (id) =>
  typeof id === "string" && /^[a-f0-9]{24}$/i.test(id);

const getPagination = (page, limit) => {
  const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
  const safeLimit = Math.max(1, Number.parseInt(limit, 10) || 10);

  return {
    page: safePage,
    limit: Math.min(safeLimit, 100),
    skip: (safePage - 1) * Math.min(safeLimit, 100),
  };
};

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE ARTICLE
|--------------------------------------------------------------------------
*/

const createArticle = async ({
  categoryId,
  subcategoryId,
  title,
  excerpt,
  content,
  status,
  isActive,
  authorId,
}) => {
  if (!isValidId(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  if (!isValidId(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  if (!isValidId(authorId)) {
    throw new ApiError(400, "Invalid author ID");
  }

  const category = await prisma.category.findFirst({
    where: { id: categoryId, isActive: true },
  });

  if (!category) {
    throw new ApiError(404, "Category not found or inactive");
  }

  const subcategory = await prisma.subcategory.findFirst({
    where: {
      id: subcategoryId,
      categoryId,
      isActive: true,
    },
  });

  if (!subcategory) {
    throw new ApiError(
      404,
      "Subcategory not found or inactive in this category",
    );
  }

  const finalStatus = status || "draft";
  const finalIsActive = isActive !== undefined ? isActive : true;

  if (!["draft", "published"].includes(finalStatus)) {
    throw new ApiError(400, "Invalid article status");
  }

  if (finalStatus === "published" && finalIsActive) {
    if (category.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish article while its category is not published",
      );
    }

    if (subcategory.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish article while its subcategory is not published",
      );
    }
  }

  const slug = generateSlug(title);

  const existingArticle = await prisma.article.findUnique({
    where: {
      subcategoryId_slug: {
        subcategoryId,
        slug,
      },
    },
  });

  if (existingArticle) {
    throw new ApiError(409, "Article already exists in this subcategory");
  }

  const readingTime = calculateReadingTime(content);

  const article = await prisma.article.create({
    data: {
      id: crypto.randomBytes(12).toString("hex"),
      categoryId,
      subcategoryId,
      title,
      slug,
      excerpt,
      ...(content !== undefined ? { content } : {}),
      readingTime,
      status: finalStatus,
      isActive: finalIsActive,
      authorId,
    },
  });

  if (content !== undefined) {
    await syncContentMedia({
      entityType: "article",
      entityId: article.id,
      previousContent: null,
      nextContent: article.content,
    });
  }

  return article;
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ARTICLES
|--------------------------------------------------------------------------
*/

const getAllArticles = async (page = 1, limit = 10) => {
  const pagination = getPagination(page, limit);

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true,
            status: true,
            isActive: true,
          },
        },
        subcategory: {
          select: {
            name: true,
            slug: true,
            status: true,
            isActive: true,
          },
        },
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.article.count(),
  ]);

  return {
    articles,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET LATEST PUBLISHED ARTICLES
|--------------------------------------------------------------------------
*/

const getLatestArticles = async (page = 1, limit = 6) => {
  const pagination = getPagination(page, limit);

  const filter = {
    status: "published",
    isActive: true,
    category: {
      is: { status: "published", isActive: true },
    },
    subcategory: {
      is: { status: "published", isActive: true },
    },
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        readingTime: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: { name: true, slug: true },
        },
        subcategory: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.article.count({ where: filter }),
  ]);

  return {
    articles,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ARTICLES BY SUBCATEGORY
|--------------------------------------------------------------------------
*/

const getArticlesBySubcategory = async (
  categorySlug,
  subcategorySlug,
  page = 1,
  limit = 10,
) => {
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

  const pagination = getPagination(page, limit);

  const filter = {
    categoryId: category.id,
    subcategoryId: subcategory.id,
    status: "published",
    isActive: true,
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where: filter,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        readingTime: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.article.count({ where: filter }),
  ]);

  return {
    category,
    subcategory,
    articles,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE ARTICLE
|--------------------------------------------------------------------------
*/

const getArticleBySlug = async (categorySlug, subcategorySlug, articleSlug) => {
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

  const article = await prisma.article.findFirst({
    where: {
      categoryId: category.id,
      subcategoryId: subcategory.id,
      slug: articleSlug,
      status: "published",
      isActive: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  return { category, subcategory, article };
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ARTICLE
|--------------------------------------------------------------------------
*/

const updateArticle = async (articleId, updateData) => {
  if (!isValidId(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  const previousContent = article.content;

  const finalCategoryId = updateData.categoryId || article.categoryId;
  const finalSubcategoryId = updateData.subcategoryId || article.subcategoryId;

  if (!isValidId(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  if (!isValidId(finalSubcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  const category = await prisma.category.findUnique({
    where: { id: finalCategoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategory = await prisma.subcategory.findFirst({
    where: {
      id: finalSubcategoryId,
      categoryId: finalCategoryId,
    },
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found in this category");
  }

  const finalStatus =
    updateData.status !== undefined ? updateData.status : article.status;

  const finalIsActive =
    updateData.isActive !== undefined ? updateData.isActive : article.isActive;

  if (!["draft", "published"].includes(finalStatus)) {
    throw new ApiError(400, "Invalid article status");
  }

  if (finalStatus === "published" && finalIsActive) {
    if (category.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish article while its category is not published",
      );
    }

    if (subcategory.status !== "published") {
      throw new ApiError(
        400,
        "Cannot publish article while its subcategory is not published",
      );
    }

    if (!category.isActive) {
      throw new ApiError(
        400,
        "Cannot activate article while its category is inactive",
      );
    }

    if (!subcategory.isActive) {
      throw new ApiError(
        400,
        "Cannot activate article while its subcategory is inactive",
      );
    }
  }

  if (updateData.isActive === true) {
    if (!category.isActive) {
      throw new ApiError(
        400,
        "Cannot activate article while its category is inactive",
      );
    }

    if (!subcategory.isActive) {
      throw new ApiError(
        400,
        "Cannot activate article while its subcategory is inactive",
      );
    }
  }

  const data = {
    categoryId: finalCategoryId,
    subcategoryId: finalSubcategoryId,
  };

  if (updateData.title !== undefined && updateData.title.trim()) {
    const newTitle = updateData.title.trim();
    const newSlug = generateSlug(newTitle);

    const existingArticle = await prisma.article.findFirst({
      where: {
        id: { not: articleId },
        subcategoryId: finalSubcategoryId,
        slug: newSlug,
      },
    });

    if (existingArticle) {
      throw new ApiError(
        409,
        "Article with this title already exists in this subcategory",
      );
    }

    data.title = newTitle;
    data.slug = newSlug;
  }

  if (updateData.excerpt !== undefined) {
    data.excerpt = updateData.excerpt;
  }

  if (updateData.content !== undefined) {
    data.content = updateData.content;
    data.readingTime = calculateReadingTime(updateData.content);
  }

  if (updateData.status !== undefined) {
    data.status = updateData.status;
  }

  if (updateData.isActive !== undefined) {
    data.isActive = updateData.isActive;
  }

  const updatedArticle = await prisma.article.update({
    where: { id: articleId },
    data,
  });

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "article",
      entityId: updatedArticle.id,
      previousContent,
      nextContent: updatedArticle.content,
    });
  }

  return updatedArticle;
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE ARTICLE
|--------------------------------------------------------------------------
*/

const deactivateArticle = async (articleId) => {
  if (!isValidId(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (!article.isActive) return article;

  return prisma.article.update({
    where: { id: articleId },
    data: { isActive: false },
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE ARTICLE
|--------------------------------------------------------------------------
*/

const activateArticle = async (articleId) => {
  if (!isValidId(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.isActive) return article;

  const category = await prisma.category.findUnique({
    where: { id: article.categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Parent category not found");
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: article.subcategoryId },
  });

  if (!subcategory) {
    throw new ApiError(404, "Parent subcategory not found");
  }

  if (!category.isActive) {
    throw new ApiError(
      400,
      "Cannot activate this article because its category is inactive",
    );
  }

  if (!subcategory.isActive) {
    throw new ApiError(
      400,
      "Cannot activate this article because its subcategory is inactive",
    );
  }

  if (article.status === "published") {
    if (category.status !== "published") {
      throw new ApiError(
        400,
        "Cannot activate this article because its category is not published",
      );
    }

    if (subcategory.status !== "published") {
      throw new ApiError(
        400,
        "Cannot activate this article because its subcategory is not published",
      );
    }
  }

  return prisma.article.update({
    where: { id: articleId },
    data: { isActive: true },
  });
};

module.exports = {
  createArticle,
  getAllArticles,
  getLatestArticles,
  getArticlesBySubcategory,
  getArticleBySlug,
  updateArticle,
  deactivateArticle,
  activateArticle,
};
