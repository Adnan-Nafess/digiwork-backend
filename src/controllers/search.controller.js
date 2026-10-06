const { searchArticles } = require("../services/search.service");

const search = async (req, res) => {
  const query = req.query.q;

  const page = Math.max(1, parseInt(req.query.page) || 1);

  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

  const result = await searchArticles(query || "", page, limit);

  res.status(200).json({
    success: true,
    message: "Search results fetched successfully",
    data: result,
  });
};

module.exports = {
  search,
};
