"use client";

import { formatCurrency, getElapsedDaysInCurrentBsMonth } from "@/lib/editorial";
import { formatNepaliMonthYear } from "@/lib/nepaliDate";
import { Budget, ExpenseFormState } from "@/types";

const BudgetComp = ({
  budgetState,
  budgetStateLoading,
  spent,
  budgetFormState,
  actionFunction,
  isPending,
}: {
  budgetState: Budget | null;
  budgetStateLoading: boolean;
  spent: number;
  budgetFormState: ExpenseFormState;
  actionFunction: (payload: FormData) => void;
  isPending: boolean;
}) => {
  const percentUsed = budgetState ? (spent / budgetState.amount) * 100 : 0;
  const remaining = budgetState ? budgetState.amount - spent : 0;
  const monthLabel = formatNepaliMonthYear(new Date());
  const elapsedDays = getElapsedDaysInCurrentBsMonth();
  const meterWidth = budgetState ? Math.min(percentUsed, 100) : 0;

  if (budgetStateLoading) {
    return <section id="budget-report" className="py-5 text-[12px]" style={{ fontFamily: "var(--font-jetbrains)" }}>Loading budget report...</section>;
  }

  return (
    <section id="budget-report" className="section-enter py-5" style={{ animationDelay: "200ms" }}>
      <div className="kicker mb-1">Fiscal Desk · Budget Report</div>
      <hr className="rule-thick mb-2" />

      {budgetState ? (
        <>
          <h2 className="headline mb-1 text-[22px]">
            {remaining >= 0
              ? `${monthLabel} Holds A Surplus — ${formatCurrency(remaining)} Unspent`
              : `Budget Breach: Spending Exceeds Limit By ${formatCurrency(Math.abs(remaining))}`}
          </h2>
          <div className="byline mb-3">
            Budget set at {formatCurrency(budgetState.amount)} · {elapsedDays} days filed this edition
          </div>

          <div className="mb-1 h-5 border border-[var(--color-ink)]">
            <div
              className="h-full"
              style={{
                width: `${meterWidth}%`,
                background: percentUsed > 100 ? "var(--color-accent)" : "var(--color-ink)",
              }}
            />
          </div>
          <div className="mb-4 flex justify-between text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            <span>{formatCurrency(0)}</span>
            <span className={percentUsed > 100 ? "font-bold text-[var(--color-accent)]" : ""}>{percentUsed.toFixed(1)}% used</span>
            <span>{formatCurrency(budgetState.amount)}</span>
          </div>
        </>
      ) : (
        <>
          <h2 className="headline mb-1 text-[22px]">No Budget Has Yet Been Declared For {monthLabel}</h2>
          <div className="body-copy mb-4">
            File a monthly ceiling below to begin publishing a clearer fiscal report.
          </div>
        </>
      )}

      <form action={actionFunction} className="max-w-[320px]">
        <label className="kicker mb-1 block">{budgetState ? "Revise Budget" : "Declare Budget"}</label>
        <div className="flex gap-2">
          <input type="number" name="amount" placeholder="0" className="paper-input" />
          <button type="submit" disabled={isPending} className="paper-button min-w-[150px]">
            {isPending ? "Submitting..." : budgetState ? "Update Budget" : "Set Budget"}
          </button>
        </div>
        {budgetFormState?.message && (
          <p className="mt-2 text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {budgetFormState.message}
          </p>
        )}
      </form>
    </section>
  );
};

export default BudgetComp;
