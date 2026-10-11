const prisma = require("../config/prisma");

const getDashboardStats = async () => {
  const [categories, subcategories, articles] = await Promise.all([
    prisma.category.count({
      where: {
        isActive: true,
      },
    }),

    prisma.subcategory.count({
      where: {
        isActive: true,
      },
    }),

    prisma.article.count(),
  ]);

  return {
    categories,
    subcategories,
    articles,
  };
};

module.exports = {
  getDashboardStats,
};
