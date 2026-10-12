import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

function getDatabaseUrl(): string | undefined {
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
  return process.env.DATABASE_URL;
}

const url = getDatabaseUrl();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(url ? { datasource: { url } } : {}),
});
