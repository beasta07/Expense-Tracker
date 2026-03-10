import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log("Testing database connection...");
    const users = await prisma.user.findMany({
      include: { expenses: true },
      take: 5,
    });
    console.log("Users:", users);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();