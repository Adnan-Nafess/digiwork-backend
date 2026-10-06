const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId).select(
      "-password"
    );

    if (!admin) {
      throw new ApiError(401, "Admin not found");
    }

    if (!admin.isActive) {
      throw new ApiError(403, "Admin account is inactive");
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;