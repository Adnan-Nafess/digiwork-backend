import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Load local .env when present. GoDaddy environment variables are injected automatically.
if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

function getDatabaseUrl(): string {
  // Local development: use DATABASE_URL from .env.
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // GoDaddy: construct the URL from its hosted MySQL variables.
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  if (!DB_HOST || !DB_NAME || !DB_USER || DB_PASSWORD === undefined) {
    throw new Error(
      "Database settings missing. Provide DATABASE_URL or GoDaddy DB_HOST, DB_NAME, DB_USER and DB_PASSWORD.",
    );
  }

  const user = encodeURIComponent(DB_USER);
  const password = encodeURIComponent(DB_PASSWORD);
  const database = encodeURIComponent(DB_NAME);
  const port = DB_PORT || "3306";

  return `mysql://${user}:${password}@${DB_HOST}:${port}/${database}`;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: getDatabaseUrl(),
  },
});
