import { Expense } from "@/types";
import {
  BS_MONTH_ABBR,
  BS_MONTH_NAMES,
  formatNepaliMonthYear,
  getNepaliDateParts,
} from "./nepaliDate";
import { b, head } from "framer-motion/client";
import { difference } from "next/dist/build/utils";

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

export function getCurrentBsMonthExpenses(
  expenses: Expense[],
  referenceDate = new Date(),
) {
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

export function buildMonthlyTrend(
  expenses: Expense[],
  referenceDate = new Date(),
) {
  const current = getNepaliDateParts(referenceDate);
  const map = new Map<
    string,
    { label: string; abbr: string; amount: number; month: number; year: number }
  >();

  for (let offset = 2; offset >= 0; offset -= 1) {
    let month = current.month - offset;
    let year = current.year;

    while (month <= 0) {
      month += 12;
      year -= 1;
    }

    const monthIndex = month - 1;
    const key = `${year}-${month}`;
    const monthName = BS_MONTH_NAMES[monthIndex];
    const monthAbbr = BS_MONTH_ABBR[monthIndex];

    map.set(key, {
      label: `${monthName} ${year}`,
      abbr: monthAbbr,
      amount: 0,
      month,
      year,
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

export function buildTopStory(
  monthLabel: string,
  categories: ReturnType<typeof summarizeCategories>,
  spent: number,
  budgetAmount?: number | null,
) {
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
      leadCategory
        ? `${leadCategory.name} is leading the pressure on the household ledger.`
        : "The paper flags a broad rise in spending."
    }`;
  }

  if (leadCategory) {
    return `${leadCategory.name} accounts for ${leadCategory.percentage}% of the month's spending, setting the tone for ${monthLabel}. Total reported spending currently stands at ${formatCurrency(spent)}.`;
  }

  return `${userName}'s edition for ${monthLabel} reports total spending of ${formatCurrency(spent)} with a modest pace across the ledger.`;
}
export function buildTickerHeadlines(
  currentSpent: number,
  budgetAmount: number | null,
  elapsedDays: number,
  lastMonthBudgetState: number,
  monthlyCategories: ReturnType<typeof summarizeCategories>,
  lastMonthCategories: ReturnType<typeof summarizeCategories>,
  wishlistData: { name: string; createdAt: Date }[] | null,
) {
  const headlines: { tag: string; text: string }[] = [];
  const todayDate = new Date();

  if (!budgetAmount) {
    headlines.push({
      tag: "BREAKING",
      text: `LOCAL MAN STILL HASN'T GIVEN THE BUDGET , WIDE RUMOURS OF BRAIN IS NOT UP TO TASK ,ORGANS REPORT DECLINING MORALE, STOMACH-LED UPRISING IMMINENT   `,
    });
  }

  if (budgetAmount && currentSpent === 0) {
    headlines.push({
      tag: "BREAKING",
      text: "LOCAL MAN STILL HAS NOT APPARENTLY SPENT ANY MONEY FROM THE BUDGET ,IS THIS ENLIGHTMENT FROM MATERIALISTIC GOALS? WE DOUBT IT AND OUR MONEY IS ON THE BRAIN JUST BEING TOO LAZY TO REGISTER IT. ",
    });
  }

  if (budgetAmount) {
    if (currentSpent > budgetAmount) {
      headlines.push({
        tag: "BREAKING",
        text: `LOCAL MAN DEPLETES BUDGET ${elapsedDays} DAYS INTO THE MONTH — SOURCES CLOSE TO THE WALLET CONFIRM SITUATION DIRE`,
      });
    } else if (currentSpent < budgetAmount && currentSpent !== 0) {
      headlines.push({
        tag: "BREAKING",
        text: `BUDGET MIRACULOUSLY INTACT WITH ${elapsedDays} DAYS ELAPSED — ECONOMISTS STUNNED, FAMILY RELIEVED`,
      });
    }

    if (budgetAmount && lastMonthBudgetState === 0) {
      headlines.push({
        tag: "ECONOMY",
        text: "FIRST EVER BUDGET DECLARED , BRAIN SIGNS FINANCIAL CONSTITUTION, WILL THERE BE STABILITY OR THEY GIVE UP TO THE CHATGPT PREMIUM FINANICE APP , STAY TUNED TO FIND OUT ",
      });
    }

    if (lastMonthBudgetState > budgetAmount) {
      headlines.push({
        tag: "ECONOMY",
        text: `BUDGET CUT BY रू ${Math.round(lastMonthBudgetState - budgetAmount).toLocaleString()} — THE BRAIN ENFORCES AUSTERITY MEASURES, ORGANS REPORT DECLINING MORALE, STOMACH-LED UPRISING IMMINENT`,
      });
    } else if (
      lastMonthBudgetState < budgetAmount &&
      lastMonthBudgetState !== 0
    ) {
      headlines.push({
        tag: "ECONOMY",
        text: `BUDGET RAISED BY रू ${Math.round(budgetAmount - lastMonthBudgetState).toLocaleString()} — STAKEHOLDERS SATISFIED, BRAIN CONSIDERS RAISING DOPAMINE DIVIDENDS TO LABOURING ORGANS, CLASS CONSCIOUSNESS TEMPORARILY SUPPRESSED`,
      });
    }
  } else {
    headlines.push({
      tag: "BREAKING",
      text: `MONTH ${elapsedDays} DAYS IN AND STILL NO BUDGET DECLARED — THE BRAIN GOVERNS WITHOUT A PLAN, ORGANS DESCRIBE CONDITIONS AS 'LATE STAGE CAPITALISM'`,
    });
  }

  if (!wishlistData) {
    headlines.push({
      tag: "WISHLIST",
      text: "LOCAL MAN STILL HAS NO ITEM WISHLIST ,IS IT DIOGENES LEVEL CONTENTMENT OR JUST BROKE BOY HOURS , STAY TUNED TO FIND OUT",
    });
  }

  if (wishlistData && wishlistData.length > 0) {
    const oldest = wishlistData.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )[0];

    const daysSince = Math.floor(
      (todayDate.getTime() - new Date(oldest.createdAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysSince > 30) {
      headlines.push({
        tag: "WISHLIST",
        text: `${oldest.name} ENTERS DAY ${daysSince} OF WISHLIST PURGATORY — ORGANS PETITION THE BRAIN FOR RELEASE, BRAIN REMAINS UNMOVED`,
      });
    } else {
      headlines.push({
        tag: "WISHLIST",
        text: `NEW WISHLIST FILING '${oldest.name}' SUBMITTED ${daysSince} DAYS AGO — FISCAL COMMITTEE YET TO RESPOND, WORKERS GROWING RESTLESS`,
      });
    }
  }

  const matches: { name: string; thisMonth: number; lastMonth: number }[] = [];
  for (let i = 0; i < monthlyCategories.length; i++) {
    const lastMonth = lastMonthCategories.find(
      (cat) => cat.name === monthlyCategories[i].name,
    );
    if (lastMonth) {
      matches.push({
        name: monthlyCategories[i].name,
        thisMonth: monthlyCategories[i].amount,
        lastMonth: lastMonth.amount,
      });
    }
  }

  const biggestDifference = matches
    .map((match) => {
      const difference = match.thisMonth - match.lastMonth;
      const percentage = (difference / match.lastMonth) * 100;
      return {
        name: match.name,
        difference,
        percentage,
      };
    })
    .sort((a, b) => Math.abs(b.percentage) - Math.abs(a.percentage))[0];

  if (biggestDifference) {
    headlines.push({
      tag: "TRANSPORT",
      text: `${biggestDifference.name} SPENDING ${biggestDifference.difference > 0 ? "SURGES" : "PLUMMETS"} BY ${Math.round(Math.abs(biggestDifference.percentage))}% — SOURCES SUGGEST '${biggestDifference.difference > 0 ? "POOR DECISIONS" : "BRIEF MOMENT OF CLARITY"}' AS PRIMARY FACTOR`,
    });
  }

  headlines.push({
    tag: "BULLETIN",
    text: "EXPENSES RECORDED CORRECTLY FOR THIRD CONSECUTIVE DAY — NATION HOLDS BREATH, ORGANS CAUTIOUSLY OPTIMISTIC",
  });

  return headlines;
}
