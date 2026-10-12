const { existsSync } = require("node:fs");

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const { PrismaClient } = require("../generated/prisma");

function getDatabaseUrl() {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  // Prefer GoDaddy's hosted MySQL credentials.
  if (DB_HOST && DB_NAME && DB_USER && DB_PASSWORD !== undefined) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    const database = encodeURIComponent(DB_NAME);
    const port = DB_PORT || "3306";

    return `mysql://${user}:${password}@${DB_HOST}:${port}/${database}`;
  }

  // Local development fallback.
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error("MySQL database environment variables are missing.");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

module.exports = prisma;
