const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

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
