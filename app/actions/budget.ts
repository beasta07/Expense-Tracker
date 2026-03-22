"use server";

import { verifyToken } from "@/lib/jwt";
import getNepaliMonthAndYear from "@/lib/nepaliDate";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function setBudget(prevState:unknown, formData:FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);

    if (!payload) {
      return null;
    }
    const amount = parseFloat(formData.get("amount") as string);
    const {month,year}=getNepaliMonthAndYear(new Date())
    const userId = payload.userId
    const budget = await prisma.budget.upsert({
      where: { userId_month_year: { userId, month, year } },
      update: { amount },
      create: { userId, month, year, amount },
    });
    return {
      success: true,
      message: "Successfully inserted budget",
      budget,
    };
  } catch (err) {
      console.log('setBudget error:', err)  // 👈 add this

    return {
      success: false,
      message: "Failed to set budget",
     err
    };
  }
}
export async function getBudget() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    const payload =await  verifyToken(token as string) ;
    if (!payload) {
      return null;
    }
    const userId = payload.userId;
    const {month,year}= getNepaliMonthAndYear(new Date())

    const budget = await prisma.budget.findUnique({
      where:{userId_month_year: 

        { userId,
        month,
        year,}
      }
    });
    return {
      success: true,
      message: "Successfully fetched budget",

      budget,
    };
  } catch (err) {
    console.log(err,'Error fetching budget')
    return {
      success: false,
      message: "Error fetching budget",
      err,
    };
  }
}
