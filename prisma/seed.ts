import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing users
  await prisma.user.deleteMany({});

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  const salesPasswordHash = await bcrypt.hash("sales123", 12);
  const dispatchPasswordHash = await bcrypt.hash("dispatch123", 12);

  // Create users
  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@omniasteel.com",
        passwordHash: adminPasswordHash,
        role: "ADMIN",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      {
        name: "Karthik Y",
        email: "karthik@omniasteel.com",
        passwordHash: salesPasswordHash,
        role: "SALES_EXECUTIVE",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=karthik",
      },
      {
        name: "Adil Raaz",
        email: "adil@omniasteel.com",
        passwordHash: dispatchPasswordHash,
        role: "DISPATCH_MANAGER",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=adil",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✓ Seeded 3 users: admin@omniasteel.com, karthik@omniasteel.com, adil@omniasteel.com");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
