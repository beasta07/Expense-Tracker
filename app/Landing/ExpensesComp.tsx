'use client'

import { useActionState, useState } from "react";
import useExpenses from "../hooks/useExpenses";
import { deleteExpense } from "../actions/expenses";
import EditExpenseRow from "../components/EditExpenseRow";
import type { ExpenseFormState } from "@/types";
import getNepaliMonthAndYear from "@/lib/nepaliDate";

export default function ExpensesComp({ state, expenseRefresh }: {
  state: ExpenseFormState
  expenseRefresh: number
}) {
  const [deleteState, deleteAction, isPending] = useActionState(deleteExpense, null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editState, setEditState] = useState<{ success: boolean } | null>(null);

  const handleEdit = (id: number) => setEditId(id);
  const handleEditSuccess = () => {
    setEditId(null);
    setEditState({ success: true });
  };

  const refreshTrigger = state || deleteState || editState || expenseRefresh;
  const { expenses, loading, errors } = useExpenses(refreshTrigger);

  const total = expenses.reduce((acc, e) => acc + e.amount, 0)

const formatNepaliDate = (date: Date) => {
  const { monthName, year } = getNepaliMonthAndYear(date)
  return `${monthName} ${year}`
}


  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 border-2 border-green-800 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (errors) return (
    <div className="px-8 md:px-24 py-16 text-red-500 text-sm">
      Something went wrong loading your expenses.
    </div>
  )

  return (
    <div className="px-8 md:px-24 py-16 bg-zinc-50 border-t border-gray-100">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
          Transaction History
        </p>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light text-gray-900">
            {expenses[0]?.user?.name
              ? <><span className="text-green-800 italic">{expenses[0].user.name}</span>&apos;s Expenses</>
              : 'Your Expenses'
            }
          </h2>
          <p className="text-sm text-gray-400 pb-1">
            {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="w-12 h-px bg-green-800 mt-5" />
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-24 text-gray-300">
          <p className="text-lg font-light">No expenses recorded yet.</p>
          <p className="text-sm mt-2">Add your first expense above.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">ID</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">Amount</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">Description</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">Date</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">Category</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expenses.map((expense) =>
                  expense.id === editId ? (
                    <EditExpenseRow
                      key={expense.id}
                      expense={expense}
                      onCancel={() => setEditId(null)}
                      onSuccess={handleEditSuccess}
                    />
                  ) : (
                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-gray-300 font-mono text-xs">#{expense.id}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        Rs {expense.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{expense.description}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                      {formatNepaliDate(new Date(expense.date))}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(expense.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <span className="text-gray-200">|</span>
                          <form action={deleteAction}>
                            <input type="hidden" name="id" value={expense.id} />
                            <button
                              type="submit"
                              disabled={isPending}
                              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6 pr-2">
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Total</p>
              <p className="text-2xl font-light text-gray-900">
                Rs <span className="text-green-800">{total.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}