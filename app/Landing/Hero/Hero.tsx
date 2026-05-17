"use client";

import { buildTopStory, buildTopStoryBody, formatCurrency } from "@/lib/editorial";

type HeroProps = {
  userName: string;
  editionLabel: string;
  comparisonLabel: string;
  currentSpent: number;
  budgetAmount: number | null;
  dailyAverage: number;
  transactionCount: number;
  categories: Array<{ name: string; amount: number; percentage: number }>;
  sidebar: React.ReactNode;
};

const Hero = ({
  userName,
  editionLabel,
  comparisonLabel,
  currentSpent,
  budgetAmount,
  dailyAverage,
  transactionCount,
  categories,
  sidebar,
}: HeroProps) => {
  const budgetDifference = budgetAmount == null ? null : budgetAmount - currentSpent;
  const statCells = [
    {
      label: "Total Spent",
      value: formatCurrency(currentSpent),
      sub: `vs ${comparisonLabel}`,
      subAlert: false,
    },
    {
      label: "Budget",
      value: budgetAmount == null ? "Not set" : formatCurrency(budgetAmount),
      sub:
        budgetAmount == null
          ? "Awaiting monthly limit"
          : budgetDifference != null && budgetDifference >= 0
            ? `${formatCurrency(budgetDifference)} remaining`
            : `${formatCurrency(Math.abs(budgetDifference ?? 0))} over`,
      subAlert: (budgetDifference ?? 0) < 0,
    },
    {
      label: "Daily Avg",
      value: formatCurrency(dailyAverage),
      sub: "Calculated to date",
      subAlert: false,
    },
    {
      label: "Transactions",
      value: transactionCount.toLocaleString(),
      sub: "Filed this edition",
      subAlert: false,
    },
  ];

  const headline = buildTopStory(editionLabel, categories, currentSpent, budgetAmount);
  const body = buildTopStoryBody(userName, editionLabel, categories, currentSpent, budgetAmount);

  return (
    <section id="front-page" className="section-enter" style={{ animationDelay: "0ms" }}>
      <div className="mb-1.5 flex items-center justify-between gap-2 border-b border-t-4 border-[var(--color-ink)] py-1">
        <span className="kicker">{editionLabel} · BS</span>
        <span className="kicker text-[var(--color-accent)]">● Monthly Edition</span>
        <span className="kicker">Kathmandu, Nepal</span>
      </div>

      <div className="px-2 py-3 text-center">
        <h1 className="masthead-title">{userName} को हिसाब</h1>
        <p
          className="mt-1 text-[11px] uppercase text-[var(--color-ink-light)]"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", letterSpacing: "3px" }}
        >
          All the spending that&apos;s fit to print
        </p>
      </div>

      <hr className="rule-thick mb-[2px]" />
      <hr className="rule-standard mb-5" />

      <div className="mb-5 grid grid-cols-2 border border-[var(--color-ink)] md:grid-cols-4">
        {statCells.map((cell, index) => (
          <div
            key={cell.label}
            className={`p-3 ${index < statCells.length - 1 ? "border-b border-[var(--color-ink)] md:border-b-0 md:border-r" : ""}`}
          >
            <div className="kicker mb-1">{cell.label}</div>
            <div className="stat-number">{cell.value}</div>
            <div
              className={`mt-0.5 text-[11px] ${cell.subAlert ? "text-[var(--color-accent)]" : "text-[var(--color-ink-light)]"}`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {cell.sub}
            </div>
          </div>
        ))}
      </div>

      <hr className="rule-double mb-5" />

      <div className="grid gap-5 md:[grid-template-columns:2fr_1px_1fr]">
        <div className="pr-0 md:pr-5">
          <div className="kicker mb-1">Top Story · Spending Report</div>
          <hr className="rule-thick mb-3" />
          <h2 className="headline text-[28px] md:text-[32px]">{headline}</h2>
          <div className="byline mt-2">By {userName} · Expense Correspondent</div>
          <p className="body-copy mt-3">{body}</p>

          <div className="mt-3 border border-[var(--color-ink)] p-2.5">
            <div className="kicker mb-1.5">Category Breakdown</div>
            {categories.length === 0 ? (
              <p className="body-copy">No category reports have been filed for this month yet.</p>
            ) : (
              categories.map((cat) => {
                const isAlert = cat === categories[0] && cat.percentage > 35;
                return (
                  <div key={cat.name} className="mb-1.5 flex items-center gap-2">
                    <span className="min-w-[90px] text-[12px] text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      {cat.name}
                    </span>
                    <div className="h-[14px] flex-1 bg-[#eeeeee]">
                      <div
                        className="h-full"
                        style={{
                          width: `${cat.percentage}%`,
                          background: isAlert ? "var(--color-accent)" : "var(--color-ink)",
                        }}
                      />
                    </div>
                    <span
                      className="min-w-[36px] text-right text-[12px] font-bold"
                      style={{
                        color: isAlert ? "var(--color-accent)" : "var(--color-ink)",
                        fontFamily: "var(--font-jetbrains)",
                      }}
                    >
                      {cat.percentage}%
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="hidden bg-[var(--color-ink)] md:block" />

        <div className="pl-0 md:pl-5">{sidebar}</div>
      </div>
    </section>
  );
};

export default Hero;
