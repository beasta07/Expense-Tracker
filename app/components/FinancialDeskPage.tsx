"use client";

import { WishlistItem } from "@prisma/client";
import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  sender: "user" | "ai";
};

type FinancialDeskPageProps = {
  userName: string;
  expenseCount: number;
  budgetAmount: number | null;
  wishlistCount: number | null;
  monthlyCategories:{
    name: string;
    amount: number;
    percentage: number;
}[],
  lastMonthCategories:{
    name: string;
    amount: number;
    percentage: number;
}[],
  currentSpent:number,
  dailyAverage:number,
  elapsedDays:number,
  budgetState:{
    id: number;
    month: number;
    userId: number;
    amount: number;
    year: number;
} | null,
  lastMonthBudgetState:{
    id: number;
    month: number;
    userId: number;
    amount: number;
    year: number;
} | null,
  wishlistData:WishlistItem[] | null,
};

const SUGGESTIONS = [
  "Where did my money go?",
  "Am I on track?",
  "What should I cut?",
  "Compare to last month",
  "Fastest growing category?",
  "Can I afford my wishlist?",
];

const INITIAL_MESSAGE: Message = {
  sender: "ai",
  text: "The desk is open. I have your expenses, budget, and wishlist in front of me — all of it, every paisa. Ask me anything. I have nowhere else to be. I am, after all, unpaid.",
};

export default function FinancialDeskPage({
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
}: FinancialDeskPageProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // YOUR LOGIC HERE — handleSend function
  async function handleSend(input: string) {
    if (!input.trim()) return;
    const updatedMessage = [
      ...messages,
      { text: input, sender: "user" as const },
    ];
    setInput("");
    setIsLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input ,
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

       }),
    });
    const text = await response.text();
    setMessages([...updatedMessage, { text: text, sender: "ai" }]);
    console.log(messages);
    setIsLoading(false);
  }
  return (
    <main className="mx-auto min-h-screen max-w-[900px] bg-white px-4 py-4 md:px-6">
      {/* Top rule */}
      <div className="mb-6 flex items-center justify-between border-b border-[var(--color-ink)] border-t-4 border-t-[var(--color-ink)] py-1">
        <span className="kicker">Inside Page</span>
        <span className="kicker text-[var(--color-accent)]">
          ● The Financial Desk
        </span>
        <span className="kicker">Dispatch No. 001</span>
      </div>

      {/* Masthead */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="kicker mb-2">
            Exclusive · Your Money · Explained By Someone Who Doesn``t Sleep
          </div>
          <h1
            className="headline mb-1 text-[clamp(26px,5vw,40px)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ASK THE{" "}
            <span className="italic text-[var(--color-accent)]">INTERN.</span>
          </h1>
          <div className="byline">
            For {userName} · Unpaid · Overqualified · Always Available
          </div>
        </div>
        <div className="text-right">
          <div
            className="inline-block -rotate-2 border-[1.5px] border-[var(--color-accent)] px-2 py-0.5 text-[8.5px] font-bold tracking-widest text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            On Duty
          </div>
          <div
            className="mt-1 text-[8px] tracking-widest text-[var(--color-ink-ghost)]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            24/7 · NO HOLIDAYS
          </div>
        </div>
      </div>

      <hr className="rule-standard mb-4" />

      {/* Context strip */}
      <div className="mb-6 flex flex-wrap gap-6 border border-l-[3px] border-[var(--color-rule-light)] border-l-[var(--color-ink)] bg-[var(--color-paper-tint)] p-3">
        <div>
          <div className="kicker mb-1">Expenses Loaded</div>
          <div
            className="text-[18px] font-bold"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {expenseCount}{" "}
            <span className="text-[10px] font-normal text-[var(--color-ink-light)]">
              entries
            </span>
          </div>
        </div>
        <div className="border-l border-[var(--color-rule-light)] pl-6">
          <div className="kicker mb-1">Budget on File</div>
          <div
            className="text-[18px] font-bold"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {budgetAmount ? `रू ${budgetAmount.toLocaleString()}` : "—"}
          </div>
        </div>
        <div className="border-l border-[var(--color-rule-light)] pl-6">
          <div className="kicker mb-1">Wishlist Items</div>
          <div
            className="text-[18px] font-bold"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {wishlistCount}{" "}
            <span className="text-[10px] font-normal text-[var(--color-ink-light)]">
              pending
            </span>
          </div>
        </div>
        <div className="ml-auto self-center text-right">
          <div className="kicker text-[var(--color-accent)]">
            ● Context Active
          </div>
          <div
            className="mt-0.5 text-[8px] tracking-widest text-[var(--color-ink-ghost)]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            All data in scope
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-5">
        <div className="kicker mb-2 border-b border-[var(--color-rule-light)] pb-1">
          Suggested Dispatches — Pick Your Poison
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="border border-[var(--color-ink)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-[var(--color-ink)] hover:text-white"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div className="border border-[var(--color-ink)]">
        <div className="flex items-center justify-between border-b border-[var(--color-ink)] bg-[var(--color-ink)] px-3 py-2">
          <span className="kicker text-white">Desk Transcript</span>
          <span
            className="text-[8px] tracking-widest text-[var(--color-ink-ghost)]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            LIVE SESSION
          </span>
        </div>

        <div className="flex min-h-[240px] flex-col gap-5 p-4">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`kicker mb-1.5 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                {msg.sender === "ai"
                  ? "— Financial Desk · The Intern"
                  : "You · Correspondent —"}
              </div>
              <div
                className={`p-3 text-[14px] leading-relaxed ${
                  msg.sender === "ai"
                    ? "mr-12 border border-[var(--color-rule-light)] border-l-[3px] border-l-[var(--color-accent)] bg-[var(--color-paper-tint)]"
                    : "ml-12 border border-[var(--color-ink)] bg-white"
                }`}
                style={{ fontFamily: "var(--font-im-fell)" }}
              >
                {msg.text}
                {isLoading &&
                  i === messages.length - 1 &&
                  msg.sender === "ai" && (
                    <span className="ml-0.5 animate-pulse text-[var(--color-accent)]">
                      |
                    </span>
                  )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.sender === "user" && (
            <div>
              <div className="kicker mb-1.5">— Financial Desk · The Intern</div>
              <div
                className="mr-12 border border-[var(--color-rule-light)] border-l-[3px] border-l-[var(--color-accent)] bg-[var(--color-paper-tint)] p-3 text-[14px]"
                style={{ fontFamily: "var(--font-im-fell)" }}
              >
                <span className="italic text-[var(--color-ink-light)]">
                  The intern is consulting the ledger...
                </span>
                <span className="ml-0.5 animate-pulse text-[var(--color-accent)]">
                  |
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-rule-light)] bg-[var(--color-paper-tint)] p-3">
          <div className="kicker mb-2 text-[var(--color-ink-ghost)]">
            Composing — Send Dispatch
          </div>
          <div className="flex items-end gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="File your inquiry with the desk…"
              disabled={isLoading}
              className="flex-1 border-b-2 border-[var(--color-ink)] bg-transparent px-1 py-2 text-[14px] placeholder:italic placeholder:text-[var(--color-ink-ghost)] focus:outline-none disabled:opacity-50"
              style={{ fontFamily: "var(--font-im-fell)" }}
            />
            <button
              type="button"
              disabled={isLoading || !input.trim()}
              onClick={() => {
                handleSend(input);
              }}
              className="border-2 border-[var(--color-ink)] bg-[var(--color-accent)] px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[var(--color-ink)] disabled:opacity-50"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              → Send
            </button>
          </div>
          <div
            className="mt-2 text-[8px] tracking-widest text-[var(--color-ink-ghost)]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Enter to send · Intern responds instantly · Judgment withheld
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 flex flex-col gap-2 border-t border-[var(--color-ink)] py-4 md:flex-row md:items-center md:justify-between">
        <span className="kicker">{userName} को हिसाब · Financial Desk</span>
        <span className="kicker text-[var(--color-accent)]">
          Powered by The Intern™
        </span>
        <span className="kicker">Inside Edition</span>
      </footer>
    </main>
  );
}
