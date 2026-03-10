import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
