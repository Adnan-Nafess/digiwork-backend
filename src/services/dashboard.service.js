const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Article = require("../models/Article");

const getDashboardStats = async () => {
  const [categories, subcategories, articles] = await Promise.all([
    Category.countDocuments({
      isActive: true,
    }),

    Subcategory.countDocuments({
      isActive: true,
    }),

    Article.countDocuments({}),
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
