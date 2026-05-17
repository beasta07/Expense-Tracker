"use client";

import { CATEGORY_OPTIONS } from "@/lib/editorial";
import { ExpenseFormState } from "@/types";

export function ExpenseForm({
  state,
  actionFunction,
  isPending,
}: {
  state: ExpenseFormState;
  actionFunction: (payload: FormData) => void;
  isPending: boolean;
}) {
  return (
    <section id="file-report" className="section-enter py-5" style={{ animationDelay: "300ms" }}>
      <div className="kicker mb-1">File a Report · New Expense</div>
      <hr className="rule-thick mb-3" />

      <form action={actionFunction} className="flex max-w-[560px] flex-col gap-3">
        {state?.success && (
          <div className="border border-[var(--color-ink)] bg-[var(--color-paper-tint)] px-3 py-2 text-[12px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {state.message}
          </div>
        )}
        {state?.error && (
          <div className="border border-[var(--color-accent)] bg-[var(--color-accent-bg)] px-3 py-2 text-[12px] text-[var(--color-accent)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {state.error}
          </div>
        )}

        <div>
          <label className="kicker mb-1 block">Description</label>
          <input
            type="text"
            name="description"
            placeholder="What did you spend on?"
            required
            className="paper-input"
            style={{ fontFamily: "var(--font-im-fell)" }}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="kicker mb-1 block">Amount (रू)</label>
            <input type="number" name="amount" placeholder="0" required className="paper-input" style={{ fontFamily: "var(--font-jetbrains)" }} />
          </div>

          <div>
            <label className="kicker mb-1 block">Category</label>
            <select name="category" required className="paper-select">
              <option value="">Select</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="kicker mb-1 block">Date</label>
          <input type="date" name="date" required className="paper-input" style={{ fontFamily: "var(--font-jetbrains)" }} />
        </div>

        <button type="submit" disabled={isPending} className="paper-button mt-1 w-full">
          {isPending ? "Filing..." : "Submit Report"}
        </button>
      </form>
    </section>
  );
}
