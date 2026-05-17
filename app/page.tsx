"use client";

import { useActionState, useMemo, useState } from "react";
import ExpensesComp from "./Landing/ExpensesComp";
import { ExpenseForm } from "./Landing/ExpenseForm";
import { addExpense } from "./actions/expenses";
import Navbar from "./components/Navbar";
import Hero from "./Landing/Hero/Hero";
import AnalyticsComp from "./Landing/Hero/AnalyticsComp";
import BudgetComp from "./Landing/BudgetComp";
import WishlistComp from "./Landing/WishlistComp";
import useExpenses from "./hooks/useExpenses";
import useBudget from "./hooks/useBudget";
import { setBudget } from "./actions/budget";
import {
  formatCurrency,
  getCurrentBsMonthExpenses,
  getElapsedDaysInCurrentBsMonth,
  summarizeCategories,
} from "@/lib/editorial";
import { formatNepaliMonthYear, getNepaliDateParts } from "@/lib/nepaliDate";
import NewspaperPageTurn from "./components/NewspaperPageTurn";
import FinancialDeskPage from "./components/FinancialDeskPage";

const Home = () => {
  const [expenseState, expenseAction, expensePending] = useActionState(addExpense, null);
  const [budgetFormState, budgetAction, budgetPending] = useActionState(setBudget, null);
  const [expenseRefresh, setExpenseRefresh] = useState(0);

  const expenseRefreshKey = `${expenseRefresh}:${expenseState?.message ?? ""}:${expenseState?.error ?? ""}:${expenseState?.success ?? false}`;
  const { expenses, loading, errors } = useExpenses(expenseRefreshKey);
  const { budgetState, budgetStateLoading } = useBudget(budgetFormState);

  const currentMonthExpenses = useMemo(() => getCurrentBsMonthExpenses(expenses), [expenses]);
  const currentSpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const elapsedDays = getElapsedDaysInCurrentBsMonth();
  const dailyAverage = currentSpent === 0 ? 0 : Math.round(currentSpent / elapsedDays);
  const userName = expenses[0]?.user?.name || "Your";
  const editionLabel = formatNepaliMonthYear(new Date());
  const previousGregorianMonth = new Date();
  previousGregorianMonth.setMonth(previousGregorianMonth.getMonth() - 1);
  const comparisonLabel = formatNepaliMonthYear(previousGregorianMonth);
  const monthlyCategories = summarizeCategories(currentMonthExpenses);
  const currentMonthNumber = getNepaliDateParts(new Date()).month;
const [activePage, setActivePage] = useState<"front" | "desk">("front");

  return (
    <section className="bg-white">
     <Navbar
  title={`${userName} को हिसाब`}
  activePage={activePage}
  onNavigate={setActivePage}
/>

<NewspaperPageTurn activePage={activePage}>
  {activePage === "front" ? (
    <main className="mx-auto min-h-screen max-w-[900px] bg-white px-4 py-4 md:px-6">
      <Hero
        userName={userName}
        editionLabel={editionLabel}
        comparisonLabel={comparisonLabel}
        currentSpent={currentSpent}
        budgetAmount={budgetState?.amount ?? null}
        dailyAverage={dailyAverage}
        transactionCount={currentMonthExpenses.length}
        categories={monthlyCategories}
        sidebar={<WishlistComp onExpenseRefresh={() => setExpenseRefresh((prev) => prev + 1)} />}
      />

      <hr className="rule-double my-5" />

      <AnalyticsComp expenses={currentMonthExpenses} />

      <hr className="rule-double my-5" />

      <BudgetComp
        budgetState={budgetState}
        budgetStateLoading={budgetStateLoading}
        spent={currentSpent}
        budgetFormState={budgetFormState}
        actionFunction={budgetAction}
        isPending={budgetPending}
      />

      <hr className="rule-double my-5" />

      <ExpenseForm
        state={expenseState}
        actionFunction={expenseAction}
        isPending={expensePending}
      />

      <hr className="rule-double my-5" />

      <ExpensesComp
        expenses={currentMonthExpenses}
        loading={loading}
        errors={errors}
      />

      <footer className="mt-10 flex flex-col gap-2 border-t border-[var(--color-ink)] py-4 md:flex-row md:items-center md:justify-between">
        <span className="kicker">{userName} को हिसाब · Est. 2081 BS</span>
        <span className="kicker text-[var(--color-accent)]">
          Powered by AI · Financial Desk Pending
        </span>
        <span className="kicker">Vol. 1, No. {currentMonthNumber}</span>
      </footer>
    </main>
  ) : (
    <FinancialDeskPage userName={userName} />
  )}
</NewspaperPageTurn>
    </section>
  );
};

export default Home;
