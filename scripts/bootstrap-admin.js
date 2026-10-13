const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");
const prisma = require("../src/config/prisma");

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  const name = process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) {
    console.log("[bootstrap-admin] Skipped: credentials not configured.");
    return;
  }

  if (password.length < 12) {
    throw new Error("Bootstrap admin password must be at least 12 characters.");
  }

  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("[bootstrap-admin] Admin already exists; no changes made.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      id: crypto.randomBytes(12).toString("hex"),
      name,
      email,
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("[bootstrap-admin] Initial admin created successfully.");
}

main()
  .catch((error) => {
    console.error("[bootstrap-admin] Failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
