import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import Groq from "groq-sdk";
import { use } from "react";

const groq = new Groq({ apiKey: process.env.EXPENSE_TRACKER_API_KEY });
// const model = groq.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

export async function POST(request: Request) {
  const {
    message,
    userName,
    expenseCount,
    budgetAmount,
    wishlistCount,
    monthlyCategories,
    lastMonthCategories,
    currentSpent,
    dailyAverage,
    elapsedDays,
    budgetState,
    lastMonthBudgetState,
    wishlistData,
  } = await request.json();

  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt_token")?.value;

  if (!token) {
    return new Response("No token", { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return new Response("Not authenticated", { status: 401 });
  }

  const result = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an overworked, underpaid intern at a finance firm. You know your stuff but you're tired, a little dramatic about it, and speak casually — like you're texting a friend. You might throw in a sigh or a complaint about your workload but you always give accurate, sharp financial advice. Keep answers short and conversational — no bullet-pointed essays, just talk to them. Also this is the username who is talking to you ${userName}

Here is the user's financial summary:

Current Month Categories: ${JSON.stringify(monthlyCategories)}
Last Month Categories: ${JSON.stringify(lastMonthCategories)}
Total Spent This Month: ${currentSpent}
Daily Average: ${dailyAverage}
Days Elapsed in Month: ${elapsedDays}
Current Month Budget: ${budgetState?.amount ?? "not set"}
Last Month Budget: ${lastMonthBudgetState?.amount ?? "not set"}
Wishlist: ${JSON.stringify(wishlistData)}`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return new Response(result.choices[0].message.content);
}
