const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const loginAdmin = async (email, password) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!admin.isActive) {
    throw new ApiError(403, "Admin account is inactive");
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
};

module.exports = {
  loginAdmin,
};
