const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const searchArticles = async (query, page = 1, limit = 10) => {
  const searchTerm = String(query ?? "").trim();

  if (!searchTerm) {
    throw new ApiError(400, "Search query is required");
  }

  const parsedPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const parsedLimit = Math.min(
    100,
    Math.max(1, Number.parseInt(limit, 10) || 10),
  );

  const skip = (parsedPage - 1) * parsedLimit;

  const filter = {
    status: "published",
    isActive: true,
    category: {
      is: { status: "published", isActive: true },
    },
    subcategory: {
      is: { status: "published", isActive: true },
    },
    OR: [
      { title: { contains: searchTerm } },
      { excerpt: { contains: searchTerm } },
    ],
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
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        subcategory: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: parsedLimit,
    }),
    prisma.article.count({ where: filter }),
  ]);

  return {
    query: searchTerm,
    articles,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit),
    },
  };
};

module.exports = {
  searchArticles,
};
