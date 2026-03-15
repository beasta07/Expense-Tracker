"use server";

import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getUsersWithExpenses() {
  revalidatePath("/"); // Clear cache for home page

  return await prisma.user.findMany({
    include: { expenses: true },
  });
}
export async function getLoggedInUserExpense() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  const payload = await verifyToken(token as string);

  if (!payload) return null;

  const user = await prisma.expense.findMany({
    where: { userId: payload.userId },
    include: {
      user:{
 select: {
      name: true,
      email: true,
    },
      }
    },
   
  });
  return user;
}
export async function addExpense(prevState: unknown, formData: FormData) {
  try {
    // GET userId FROM COOKIE, NOT FORM
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);

    if (!payload) {
      return { success: false, error: "Not authenticated" };
    }
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const userId = payload.userId; // trusted source ✅
    const date = formData.get("date") as string;

    const expense = await prisma.expense.create({
      data: {
        amount,
        description,
        category,
        userId,
        date: new Date(date),
      },
    });

    revalidatePath("/"); // Clear cache for home page

    return {
      success: true,
      message: "Expense added succcssfully!",
      expense,
    };
  } catch (error) {
  return {
    success: false,
    error: String(error)
  };
}
}
export async function deleteExpense(prevState: unknown, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);
    const id = parseInt(formData.get("id") as string);

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });
    if (expense?.userId !== payload?.userId) {
      return {
        message: "User is not authorized to delete",
        success: false,
      };
    }
    const deletedExpense = await prisma.expense.delete({
      where: {
        id,
      },
    });

    revalidatePath("/"); // Clear cache

    return {
      success: true,
      message: "Expense deleted successfully!",
      deletedExpense,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to delete expense",
    };
  }
}
export async function editExpense(prevState: unknown, formData: FormData) {
  try {
    const id = parseInt(formData.get("id") as string);
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (payload?.userId !== expense?.userId) {
      return {
        success: false,
        message: "User is not authorized to edit",
      };
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id, // Only id in where clause
      },
      data: {
        amount,
        description,
        category,
        date: new Date(date),
        // Don't include id or userId in data
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Data updated successfully",
      updatedExpense,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to update data",
      error: String(err),
    };
  }
}
