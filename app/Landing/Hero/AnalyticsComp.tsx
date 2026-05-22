"use client";

import Barchart from "@/app/components/Charts/Barchart";
import Piechart from "@/app/components/Charts/Piechart";
import { buildMonthlyTrend, summarizeCategories } from "@/lib/editorial";
import { Expense } from "@/types";

const PIE_COLORS = ["#111111", "#555555", "#AAAAAA", "#C0392B", "#777777"];

const AnalyticsComp = ({
  trendExpenses,
  categoryExpenses,
}: {
  trendExpenses: Expense[];
  categoryExpenses: Expense[];
}) => {
  const monthlyTrend = buildMonthlyTrend(trendExpenses);
  const categorySummary = summarizeCategories(categoryExpenses).map((item, index) => ({
    ...item,
    color: PIE_COLORS[index] ?? "#C0392B",
    isAlert: index >= 3,
  }));

  return (
    <section
      id="analytics"
      className="section-enter py-5"
      style={{ animationDelay: "100ms" }}
    >
      <div className="kicker mb-1">Data Desk · Infographics</div>
      <hr className="rule-thick mb-2" />
      <h2 className="headline text-[22px]">This Edition in Numbers</h2>

      <div className="mt-4 grid gap-5 md:[grid-template-columns:1fr_1px_1fr]">
        <div className="pr-0 md:pr-4">
          <div className="kicker mb-1">Infographic · Monthly Trend</div>
          <h3 className="headline mb-3 text-[16px]">Spending Over Three Months</h3>
          <Barchart monthlyData={monthlyTrend} />

          <div className="mt-2 flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 bg-[var(--color-ink)]" />
              <span
                className="text-[10px] text-[var(--color-ink-mid)]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Previous months
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 bg-[var(--color-accent)]" />
              <span
                className="text-[10px] text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Current month
              </span>
            </div>
          </div>
        </div>

        <div className="hidden bg-[var(--color-ink)] md:block" />

        <div className="pl-0 md:pl-4">
          <div className="kicker mb-1">Infographic · Category Share</div>
          <h3 className="headline mb-3 text-[16px]">Who Took the Biggest Share</h3>

          {categorySummary.length === 0 ? (
            <p className="body-copy">No category data has been filed for this edition yet.</p>
          ) : (
            <>
              <Piechart categoryData={categorySummary} />
              <div className="mt-3">
                {categorySummary.map((cat) => (
                  <div key={cat.name} className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2.5 w-2.5 flex-shrink-0"
                        style={{ background: cat.color }}
                      />
                      <span
                        className="text-[12px] text-[var(--color-ink-mid)]"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {cat.name}
                      </span>
                    </div>

                    <span
                      className="text-[12px] font-bold"
                      style={{
                        color: cat.isAlert ? "var(--color-accent)" : "var(--color-ink)",
                        fontFamily: "var(--font-jetbrains)",
                      }}
                    >
                      {cat.percentage}% · रू {Math.round(cat.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsComp;