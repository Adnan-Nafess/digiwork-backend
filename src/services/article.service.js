const mongoose = require("mongoose");

const Article = require("../models/Article");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const ApiError = require("../utils/ApiError");
const generateSlug = require("../utils/generateSlug");
const calculateReadingTime = require("../utils/readingTime");
const { syncContentMedia } = require("./media.service");

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
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  /*
  |--------------------------------------------------------------------------
  | Parent Category
  |--------------------------------------------------------------------------
  */

  const category = await Category.findOne({
    _id: categoryId,
    isActive: true,
  });

  if (!category) {
    throw new ApiError(404, "Category not found or inactive");
  }

  /*
  |--------------------------------------------------------------------------
  | Parent Subcategory
  |--------------------------------------------------------------------------
  */

  const subcategory = await Subcategory.findOne({
    _id: subcategoryId,
    category: categoryId,
    isActive: true,
  });

  if (!subcategory) {
    throw new ApiError(
      404,
      "Subcategory not found or inactive in this category",
    );
  }

  const finalStatus = status || "draft";

  const finalIsActive = isActive !== undefined ? isActive : true;

  /*
  |--------------------------------------------------------------------------
  | Published Article Requirements
  |--------------------------------------------------------------------------
  |
  | Published + active article requires:
  |
  | Category      → published + active
  | Subcategory   → published + active
  |
  */

  if (finalStatus === "published" && finalIsActive === true) {
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

  /*
  |--------------------------------------------------------------------------
  | Slug
  |--------------------------------------------------------------------------
  */

  const slug = generateSlug(title);

  const existingArticle = await Article.findOne({
    subcategory: subcategoryId,
    slug,
  });

  if (existingArticle) {
    throw new ApiError(409, "Article already exists in this subcategory");
  }

  /*
  |--------------------------------------------------------------------------
  | Reading Time
  |--------------------------------------------------------------------------
  */

  const readingTime = calculateReadingTime(content);

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  const article = await Article.create({
    category: categoryId,
    subcategory: subcategoryId,
    title,
    slug,
    excerpt,
    content,
    readingTime,
    status: finalStatus,
    isActive: finalIsActive,
    author: authorId,
  });

  /*
  |--------------------------------------------------------------------------
  | MEDIA SYNC
  |--------------------------------------------------------------------------
  |
  | Newly uploaded images initially have no usedBy reference.
  | After the article is created, attach all image references.
  |
  */

  if (content !== undefined) {
    await syncContentMedia({
      entityType: "article",
      entityId: article._id,
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
  const skip = (page - 1) * limit;

  const [articles, total] = await Promise.all([
    Article.find({})
      .populate("category", "name slug status isActive")
      .populate("subcategory", "name slug status isActive")
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Article.countDocuments({}),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    articles,

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET LATEST PUBLISHED ARTICLES
|--------------------------------------------------------------------------
*/

const getLatestArticles = async (page = 1, limit = 6) => {
  const skip = (page - 1) * limit;

  /*
  |--------------------------------------------------------------------------
  | Only published + active parents expose articles
  |--------------------------------------------------------------------------
  */

  const [categories, subcategories] = await Promise.all([
    Category.find({
      isActive: true,
      status: "published",
    }).select("_id"),

    Subcategory.find({
      isActive: true,
      status: "published",
    }).select("_id"),
  ]);

  const categoryIds = categories.map((category) => category._id);

  const subcategoryIds = subcategories.map((subcategory) => subcategory._id);

  const filter = {
    category: {
      $in: categoryIds,
    },

    subcategory: {
      $in: subcategoryIds,
    },

    status: "published",

    isActive: true,
  };

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .select(
        "title slug excerpt readingTime createdAt updatedAt category subcategory",
      )
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Article.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    articles,

    pagination: {
      page,
      limit,
      total,
      totalPages,
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

  const skip = (page - 1) * limit;

  const filter = {
    category: category._id,
    subcategory: subcategory._id,
    status: "published",
    isActive: true,
  };

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .select("title slug excerpt readingTime createdAt updatedAt")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Article.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    category,
    subcategory,
    articles,

    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE ARTICLE
|--------------------------------------------------------------------------
*/

const getArticleBySlug = async (categorySlug, subcategorySlug, articleSlug) => {
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

  const article = await Article.findOne({
    category: category._id,
    subcategory: subcategory._id,
    slug: articleSlug,
    status: "published",
    isActive: true,
  }).populate("author", "name");

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  return {
    category,
    subcategory,
    article,
  };
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ARTICLE
|--------------------------------------------------------------------------
*/

const updateArticle = async (articleId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await Article.findById(articleId);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  /*
  |--------------------------------------------------------------------------
  | Keep old content for media comparison
  |--------------------------------------------------------------------------
  */

  const previousContent = article.content;

  /*
  |--------------------------------------------------------------------------
  | Determine final parent IDs
  |--------------------------------------------------------------------------
  */

  const finalCategoryId = updateData.categoryId || article.category.toString();

  const finalSubcategoryId =
    updateData.subcategoryId || article.subcategory.toString();

  if (!mongoose.Types.ObjectId.isValid(finalCategoryId)) {
    throw new ApiError(400, "Invalid category ID");
  }

  if (!mongoose.Types.ObjectId.isValid(finalSubcategoryId)) {
    throw new ApiError(400, "Invalid subcategory ID");
  }

  /*
  |--------------------------------------------------------------------------
  | ADMIN EDITING
  |--------------------------------------------------------------------------
  |
  | Important:
  | Admin can edit an article even if its parent
  | category/subcategory is inactive.
  |
  | Public visibility and publishing rules are
  | handled separately below.
  |
  */

  const category = await Category.findById(finalCategoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subcategory = await Subcategory.findOne({
    _id: finalSubcategoryId,
    category: finalCategoryId,
  });

  if (!subcategory) {
    throw new ApiError(404, "Subcategory not found in this category");
  }

  /*
  |--------------------------------------------------------------------------
  | Determine final state
  |--------------------------------------------------------------------------
  */

  const finalStatus =
    updateData.status !== undefined ? updateData.status : article.status;

  const finalIsActive =
    updateData.isActive !== undefined ? updateData.isActive : article.isActive;

  /*
  |--------------------------------------------------------------------------
  | Validate final status
  |--------------------------------------------------------------------------
  */

  if (finalStatus !== "draft" && finalStatus !== "published") {
    throw new ApiError(400, "Invalid article status");
  }

  /*
  |--------------------------------------------------------------------------
  | Published + Active Article
  |--------------------------------------------------------------------------
  |
  | Requires complete published + active hierarchy.
  |
  */

  if (finalStatus === "published" && finalIsActive === true) {
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

  /*
  |--------------------------------------------------------------------------
  | Prevent activation under inactive parents
  |--------------------------------------------------------------------------
  |
  | This matters when status remains draft but admin
  | explicitly activates the article.
  |
  */

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

  const update = {
    category: finalCategoryId,
    subcategory: finalSubcategoryId,
  };

  /*
  |--------------------------------------------------------------------------
  | TITLE + SLUG
  |--------------------------------------------------------------------------
  */

  if (updateData.title !== undefined && updateData.title.trim()) {
    const newTitle = updateData.title.trim();

    const newSlug = generateSlug(newTitle);

    const existingArticle = await Article.findOne({
      _id: {
        $ne: articleId,
      },

      subcategory: finalSubcategoryId,

      slug: newSlug,
    });

    if (existingArticle) {
      throw new ApiError(
        409,
        "Article with this title already exists in this subcategory",
      );
    }

    update.title = newTitle;

    update.slug = newSlug;
  }

  /*
  |--------------------------------------------------------------------------
  | EXCERPT
  |--------------------------------------------------------------------------
  */

  if (updateData.excerpt !== undefined) {
    update.excerpt = updateData.excerpt;
  }

  /*
  |--------------------------------------------------------------------------
  | CONTENT
  |--------------------------------------------------------------------------
  */

  if (updateData.content !== undefined) {
    update.content = updateData.content;

    update.readingTime = calculateReadingTime(updateData.content);
  }

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  if (updateData.status !== undefined) {
    update.status = updateData.status;
  }

  /*
  |--------------------------------------------------------------------------
  | ACTIVE STATE
  |--------------------------------------------------------------------------
  */

  if (updateData.isActive !== undefined) {
    update.isActive = updateData.isActive;
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE ARTICLE
  |--------------------------------------------------------------------------
  */

  Object.assign(article, update);

  const updatedArticle = await article.save();

  /*
  |--------------------------------------------------------------------------
  | MEDIA SYNC
  |--------------------------------------------------------------------------
  |
  | Run only when article content changed.
  |
  */

  if (updateData.content !== undefined) {
    await syncContentMedia({
      entityType: "article",
      entityId: updatedArticle._id,
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
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await Article.findById(articleId);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (!article.isActive) {
    return article;
  }

  article.isActive = false;

  const updatedArticle = await article.save();

  return updatedArticle;
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE ARTICLE
|--------------------------------------------------------------------------
*/

const activateArticle = async (articleId) => {
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }

  const article = await Article.findById(articleId);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.isActive) {
    return article;
  }

  /*
  |--------------------------------------------------------------------------
  | Parent hierarchy
  |--------------------------------------------------------------------------
  */

  const [category, subcategory] = await Promise.all([
    Category.findOne({
      _id: article.category,
      isActive: true,
      status: "published",
    }),

    Subcategory.findOne({
      _id: article.subcategory,
      category: article.category,
      isActive: true,
      status: "published",
    }),
  ]);

  /*
  |--------------------------------------------------------------------------
  | Published article
  |--------------------------------------------------------------------------
  */

  if (article.status === "published") {
    if (!category) {
      throw new ApiError(
        400,
        "Cannot activate this article because its category is not published and active",
      );
    }

    if (!subcategory) {
      throw new ApiError(
        400,
        "Cannot activate this article because its subcategory is not published and active",
      );
    }
  } else {
    /*
    |--------------------------------------------------------------------------
    | Draft article can be activated when parent hierarchy
    | is active. It does not need to be published.
    |--------------------------------------------------------------------------
    */

    const activeCategory = await Category.findOne({
      _id: article.category,
      isActive: true,
    });

    if (!activeCategory) {
      throw new ApiError(
        400,
        "Cannot activate this article because its category is inactive",
      );
    }

    const activeSubcategory = await Subcategory.findOne({
      _id: article.subcategory,
      category: article.category,
      isActive: true,
    });

    if (!activeSubcategory) {
      throw new ApiError(
        400,
        "Cannot activate this article because its subcategory is inactive",
      );
    }
  }

  article.isActive = true;

  const updatedArticle = await article.save();

  return updatedArticle;
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

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
