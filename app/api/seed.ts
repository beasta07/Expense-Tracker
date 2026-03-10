import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Seeding database...");

    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        expenses: {
          create: [
            { amount: 50, description: "Groceries", date: new Date(), category: "Food" },
            { amount: 20, description: "Taxi", date: new Date(), category: "Transport" },
          ],
        },
      },
    });

    res.json({ success: true, user });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
}
