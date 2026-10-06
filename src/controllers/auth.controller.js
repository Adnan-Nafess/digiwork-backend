const { loginAdmin } = require("../services/auth.service");

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginAdmin(email, password);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      admin: result.admin,
    },
  });
};

module.exports = {
  login,
};