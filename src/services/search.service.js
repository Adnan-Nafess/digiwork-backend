const Article = require("../models/Article");
const ApiError = require("../utils/ApiError");

const searchArticles = async (query, page = 1, limit = 10) => {
  const searchTerm = query.trim();

  if (!searchTerm) {
    throw new ApiError(400, "Search query is required");
  }

  const skip = (page - 1) * limit;

  const filter = {
    status: "published",
    $or: [
      {
        title: {
          $regex: searchTerm,
          $options: "i",
        },
      },
      {
        excerpt: {
          $regex: searchTerm,
          $options: "i",
        },
      },
      {
        content: {
          $regex: searchTerm,
          $options: "i",
        },
      },
    ],
  };

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .select("title slug excerpt readingTime createdAt category subcategory")
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Article.countDocuments(filter),
  ]);

  return {
    query: searchTerm,
    articles,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  searchArticles,
};
