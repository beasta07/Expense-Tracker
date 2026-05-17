"use client";

import { useState } from "react";
import { editExpense } from "@/app/actions/expenses";
import { CATEGORY_OPTIONS } from "@/lib/editorial";
import type { Expense } from "@/types";

export default function EditExpenseRow({
  expense,
  onCancel,
  onSuccess,
}: {
  expense: Expense;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    amount: expense.amount,
    description: expense.description,
    date: new Date(expense.date).toISOString().split("T")[0],
    category: expense.category || "",
  });

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      const fd = new FormData();
      fd.append("id", String(expense.id));
      fd.append("amount", formData.amount.toString());
      fd.append("description", formData.description);
      fd.append("date", formData.date);
      fd.append("category", formData.category);

      const result = await editExpense(null, fd);
      if (result.success) onSuccess();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid items-start gap-2 px-3 py-3 md:[grid-template-columns:1fr_100px_100px_130px]">
      <div>
        <input
          type="text"
          value={formData.description}
          onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          className="paper-input"
          style={{ fontFamily: "var(--font-im-fell)" }}
        />
      </div>
      <input
        type="text"
        value={formData.category}
        onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
        list={`categories-${expense.id}`}
        className="paper-input"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      />
      <datalist id={`categories-${expense.id}`}>
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
      <input
        type="number"
        step="0.01"
        value={formData.amount}
        onChange={(event) => setFormData((prev) => ({ ...prev, amount: Number(event.target.value) }))}
        className="paper-input"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
        className="paper-input"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      />
      <div className="flex gap-2 md:col-span-4">
        <button type="button" onClick={onCancel} className="paper-button paper-button--secondary">
          Cancel
        </button>
        <button type="button" onClick={handleSubmit} disabled={isPending} className="paper-button">
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
