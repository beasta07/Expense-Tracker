"use server";

import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function addWishlistItem(prevState: unknown, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    if (!token) return null;

    const payload = await verifyToken(token as string);

    if (!payload) {
      return null;
    }
    const userId = payload.userId;
const name = formData.get("name") as string
const price = parseFloat(formData.get("price") as string)

    const item = await prisma.wishlistItem.create({
      data: {
        name,
        price,
        userId,
      },
    });
    return {
      success: true,
      item,
      message: "Successfully added item to the Wishlist",
    };
  } catch (err) {
    console.log(err, "Here is the error");
    return {
      success: false,
      message: "Failed adding item to the Wishlist",
    };
  }
}
export async function getWishlistItems() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);

    if (!payload) {
      return null;
    }
    const userId = payload.userId;

    const items = await prisma.wishlistItem.findMany({
      where: {
        userId: userId,
      },
    });
    return {
      success: true,
      items,
      message: "Successfully fetched the wishlist items for the use",
    };
  } catch (err) {
    console.log(err, "Here is the fetching error for the getWishlistItems");
    return {
      success: false,
      message: "Error fetching items",
    };
  }
}
export async function purchaseWishlistItem(prevState:unknown, formData:FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);
    if (!payload) {
      return null;
    }
    const userId = payload.userId;

    const category = formData.get("category")  as string;
    const id = parseInt(formData.get("id") as string);
    const date = new Date();
    console.log("Looking for id:", id, typeof id);

    const items = await prisma.wishlistItem.findUnique({
      where: {
        id,
      },
    });
    console.log("Full item from DB:", JSON.stringify(items));

    if (!items || items?.userId !== userId) {
      console.log("User is not authenticated to do this act.");
      return null;
    }
    const amount = items.price;
    const description = items.name;

    await prisma.$transaction(async (tx) => {
      await tx.expense.create({
        data: {
          amount,
          description,
          category,
          userId,
          date,
        },
      });
      await tx.wishlistItem.delete({
        where: {
          id,
        },
      });
    });
    return {
      success: true,
      message:
        "Item has been removed from the wishlist and added to the Expenses",
    };
  } catch (err) {
    console.log(
      "Error while removing item from wishlist and adding to the expense",
      err,
    );
    return {
      success: false,
      message:
        "Error while removing item from wishlist and adding to the expense",
    };
  }
}
export async function removeWishlistItem(id:number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);
    if (!payload) {
      return null;
    }

    const userId = payload.userId;
    const items = await prisma.wishlistItem.findUnique({
      where: {
        id,
      },
    });
    if (!items) {
      console.log(
        "No wishlist Item found matching the id you gave in the database to be deleted",
      );
      return null;
    }
    if (items?.userId !== userId) {
      console.log("User is not authenticated to do this act.");
      return null;
    }

    await prisma.wishlistItem.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "Successfull removed the item from the wishlist",
    };
  } catch (err) {
    console.log("Error deleting wishlist item ", err);
    return {
      success: false,
      message: "Error deleting wishlist item",
    };
  }
}
