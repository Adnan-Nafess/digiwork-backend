const { existsSync } = require("node:fs");

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Verify MySQL connection through Prisma
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;

    console.log("MySQL connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
