const { existsSync } = require("node:fs");

// Load local .env only when it exists.
// GoDaddy's injected environment variables remain available.
if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const { PrismaClient } = require("../generated/prisma");

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
  } = process.env;

  if (
    !DB_HOST ||
    !DB_NAME ||
    !DB_USER ||
    DB_PASSWORD === undefined
  ) {
    throw new Error(
      "Database configuration missing. Provide DATABASE_URL or GoDaddy DB_* variables."
    );
  }

  const user = encodeURIComponent(DB_USER);
  const password = encodeURIComponent(DB_PASSWORD);
  const database = encodeURIComponent(DB_NAME);
  const port = DB_PORT || "3306";

  return `mysql://${user}:${password}@${DB_HOST}:${port}/${database}`;
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

module.exports = prisma;
