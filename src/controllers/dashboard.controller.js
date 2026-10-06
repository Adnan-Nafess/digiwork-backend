const { getDashboardStats } = require("../services/dashboard.service");

const getStats = async (req, res) => {
  const stats = await getDashboardStats();

  res.status(200).json({
    success: true,
    message: "Dashboard statistics fetched successfully.",
    data: stats,
  });
};

module.exports = {
  getStats,
};
