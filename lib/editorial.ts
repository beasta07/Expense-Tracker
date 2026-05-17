import { Expense } from "@/types";
import { formatNepaliMonthYear, getNepaliDateParts } from "./nepaliDate";

export const CATEGORY_OPTIONS = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Groceries",
  "Entertainment",
  "Health",
  "Utilities",
  "Savings",
  "Essentials",
  "Other",
] as const;

export function formatCurrency(amount: number) {
  return `रू ${Math.round(amount).toLocaleString()}`;
}

export function getCurrentBsMonthExpenses(expenses: Expense[], referenceDate = new Date()) {
  const current = getNepaliDateParts(referenceDate);
  return expenses.filter((expense) => {
    const dateParts = getNepaliDateParts(new Date(expense.date));
    return dateParts.month === current.month && dateParts.year === current.year;
  });
}

export function getMonthKey(date: Date) {
  const parts = getNepaliDateParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}`;
}

export function getMonthLabel(date: Date) {
  return formatNepaliMonthYear(date);
}

export function getElapsedDaysInCurrentBsMonth(referenceDate = new Date()) {
  return Math.max(getNepaliDateParts(referenceDate).day, 1);
}

export function getTopExpenseThreshold(expenses: Expense[]) {
  if (expenses.length === 0) return Number.POSITIVE_INFINITY;
  const sorted = [...expenses].map((item) => item.amount).sort((a, b) => a - b);
  const index = Math.max(Math.ceil(sorted.length * 0.9) - 1, 0);
  return sorted[index] ?? Number.POSITIVE_INFINITY;
}

export function summarizeCategories(expenses: Expense[]) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const grouped = expenses.reduce<Record<string, number>>((acc, expense) => {
    const category = expense.category?.trim() || "Other";
    acc[category] = (acc[category] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([name, amount]) => {
      const percentage = total === 0 ? 0 : Math.round((amount / total) * 100);
      return { name, amount, percentage };
    })
    .sort((a, b) => b.amount - a.amount);
}

export function buildMonthlyTrend(expenses: Expense[], referenceDate = new Date()) {
  const current = getNepaliDateParts(referenceDate);
  const map = new Map<string, { label: string; abbr: string; amount: number; month: number; year: number }>();

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - offset, 1);
    const parts = getNepaliDateParts(date);
    const key = `${parts.year}-${parts.month}`;
    map.set(key, {
      label: `${parts.monthName} ${parts.year}`,
      abbr: parts.monthAbbr,
      amount: 0,
      month: parts.month,
      year: parts.year,
    });
  }

  for (const expense of expenses) {
    const parts = getNepaliDateParts(new Date(expense.date));
    const key = `${parts.year}-${parts.month}`;
    const existing = map.get(key);
    if (existing) {
      existing.amount += expense.amount;
    }
  }

  return Array.from(map.values()).map((entry) => ({
    ...entry,
    isCurrent: entry.month === current.month && entry.year === current.year,
  }));
}

export function buildTopStory(monthLabel: string, categories: ReturnType<typeof summarizeCategories>, spent: number, budgetAmount?: number | null) {
  const leadCategory = categories[0];
  if (!leadCategory && budgetAmount && spent <= budgetAmount) {
    return `${monthLabel} Closes Quietly With Spending Under Control`;
  }

  if (budgetAmount && spent > budgetAmount) {
    return `Budget Breach Overshadows ${monthLabel} Ledger`;
  }

  if (budgetAmount && spent < budgetAmount) {
    return `${monthLabel} Spending Holds Below Budget Line`;
  }

  if (leadCategory) {
    return `${leadCategory.name} Dominates ${monthLabel} Edition`;
  }

  return `${monthLabel} Financial Edition Awaits Its First Filing`;
}

export function buildTopStoryBody(
  userName: string,
  monthLabel: string,
  categories: ReturnType<typeof summarizeCategories>,
  spent: number,
  budgetAmount?: number | null,
) {
  const leadCategory = categories[0];
  if (spent === 0) {
    return `${userName}'s front page remains blank for ${monthLabel}, with no filed expenses yet. The edition is ready for the first report.`;
  }

  if (budgetAmount && spent > budgetAmount) {
    const over = spent - budgetAmount;
    return `${userName}'s spending has crossed the monthly limit by ${formatCurrency(over)}. ${
      leadCategory ? `${leadCategory.name} is leading the pressure on the household ledger.` : "The paper flags a broad rise in spending."
    }`;
  }

  if (leadCategory) {
    return `${leadCategory.name} accounts for ${leadCategory.percentage}% of the month's spending, setting the tone for ${monthLabel}. Total reported spending currently stands at ${formatCurrency(spent)}.`;
  }

  return `${userName}'s edition for ${monthLabel} reports total spending of ${formatCurrency(spent)} with a modest pace across the ledger.`;
}
