const express = require("express");

const validate = require("../middleware/validate.middleware");
const { loginSchema } = require("../validators/auth.validator");
const { login } = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");
const protect = require("../middleware/auth.middleware");
const { loginRateLimit } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post(
  "/login",
  loginRateLimit,
  validate(loginSchema),
  asyncHandler(login),
);

router.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Authenticated admin",
      data: {
        admin: req.admin,
      },
    });
  }),
);

router.post("/logout", protect, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = router;
