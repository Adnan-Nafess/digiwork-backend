import "dotenv/config";
import { defineConfig } from "prisma/config";

function getDatabaseUrl(): string {
  // Local development: existing .env DATABASE_URL will continue to work.
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // GoDaddy: build the MySQL URL from the injected DB_* variables.
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
