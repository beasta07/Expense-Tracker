"use client";

import { useActionState, useState } from "react";
import { deleteExpense } from "../actions/expenses";
import EditExpenseRow from "../components/EditExpenseRow";
import { formatCurrency, getTopExpenseThreshold } from "@/lib/editorial";
import { formatNepaliFullDate } from "@/lib/nepaliDate";
import type { Expense } from "@/types";

export default function ExpensesComp({
  expenses,
  loading,
  errors,
}: {
  expenses: Expense[];
  loading: boolean;
  errors: Error | null;
}) {
  const [deleteState, deleteAction, isPending] = useActionState(deleteExpense, null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editState, setEditState] = useState<{ success: boolean } | null>(null);

  void deleteState;
  void editState;

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const alertThreshold = getTopExpenseThreshold(expenses);

  if (loading) {
    return (
      <section id="expense-ledger" className="py-5 text-[12px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
        Loading the expense ledger...
      </section>
    );
  }

  if (errors) {
    return (
      <section id="expense-ledger" className="py-5 text-[12px] text-[var(--color-accent)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
        Something went wrong loading your expense ledger.
      </section>
    );
  }

  return (
    <section id="expense-ledger" className="section-enter py-5" style={{ animationDelay: "400ms" }}>
      <div className="kicker mb-1">City Ledger · Transactions</div>
      <hr className="rule-thick mb-3" />

      {expenses.length === 0 ? (
        <div className="border border-[var(--color-ink)] px-4 py-6">
          <div className="headline text-[18px]">No Filed Reports Yet</div>
          <p className="body-copy mt-2">Once you submit your first expense, it will appear here in the running newspaper ledger.</p>
        </div>
      ) : (
        <>
          <div className="border border-[var(--color-ink)]">
            <div className="grid bg-[var(--color-ink)] px-3 py-1.5 text-white md:[grid-template-columns:1fr_100px_100px_130px]">
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
                Description
              </span>
              <span className="text-center text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
                Category
              </span>
              <span className="text-right text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
                Amount
              </span>
              <span className="text-right text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
                Actions
              </span>
            </div>

            {expenses.map((expense, index) =>
              expense.id === editId ? (
                <div key={expense.id} className={index < expenses.length - 1 ? "border-b border-[var(--color-rule-light)]" : ""}>
                  <EditExpenseRow
                    expense={expense}
                    onCancel={() => setEditId(null)}
                    onSuccess={() => {
                      setEditId(null);
                      setEditState({ success: true });
                    }}
                  />
                </div>
              ) : (
                <div
                  key={expense.id}
                  className={`grid items-center gap-2 px-3 py-2 ${index < expenses.length - 1 ? "border-b border-[var(--color-rule-light)]" : ""} md:[grid-template-columns:1fr_100px_100px_130px]`}
                >
                  <div>
                    <div className="text-[13px] text-[var(--color-ink)]" style={{ fontFamily: "var(--font-im-fell)" }}>
                      {expense.description}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      {formatNepaliFullDate(new Date(expense.date))}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-block bg-[var(--color-paper-tint)] px-2 py-0.5 text-[11px] text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      {expense.category || "Other"}
                    </span>
                  </div>

                  <div
                    className="text-right text-[13px] font-bold"
                    style={{
                      color: expense.amount >= alertThreshold ? "var(--color-accent)" : "var(--color-ink)",
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {formatCurrency(expense.amount)}
                  </div>

                  <div className="flex justify-end gap-3 text-[11px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    <button type="button" onClick={() => setEditId(expense.id)} className="hover:text-[var(--color-accent)]">
                      Edit
                    </button>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={expense.id} />
                      <button type="submit" disabled={isPending} className="hover:text-[var(--color-accent)]">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-4 text-right">
            <div className="kicker mb-1">Total Filed</div>
            <div className="stat-number">{formatCurrency(total)}</div>
          </div>
        </>
      )}
    </section>
  );
}
