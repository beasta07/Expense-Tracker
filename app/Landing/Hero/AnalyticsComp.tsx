"use client";

import useExpenses from "@/app/hooks/useExpenses";
import PieChartComp from "../../components/Charts/Piechart";
import { useMemo } from "react";
import Barchart from "../../components/Charts/Barchart";

type CategoryData = {
  name: string;
  value: number;
};

const AnalyticsComp = ({ state }: { state: unknown }) => {
  const { expenses, loading } = useExpenses(state);

  //PIE CHART DATA
  const categoryData: CategoryData[] = useMemo(() => {
    const totals = expenses.reduce((acc: Record<string, number>, expense) => {
      if (acc[expense.category ?? "Uncategorized"]) {
        acc[expense.category ?? "Uncategorized"] += expense.amount;
      } else {
        acc[expense.category ?? "Uncategorized"] = expense.amount;
      }
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0];
  const totalSpend = categoryData.reduce((acc, d) => acc + d.value, 0);

  //BAR CHAT DATA
  const monthlyData = useMemo(() => {
    const monthly = expenses.reduce((acc: Record<string, number>, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });
      if (acc[month]) {
        acc[month] += expense.amount;
      } else {
        acc[month] = expense.amount;
      }
      return acc;
    }, {});
    return Object.entries(monthly).map(([month, amount]) => ({
      month,
      amount: amount as number,
    }));
  }, [expenses]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 border-2 border-green-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <section className="bg-white px-8 md:px-24 py-24 border-t border-gray-100">
      {/* Section Header */}
      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
          Spending Overview
        </p>
        <h2 className="text-5xl font-light text-gray-900 leading-tight">
          Where does your <br />
          <span className="text-green-800 italic">money go?</span>
        </h2>
        <div className="w-12 h-px bg-green-800 mt-6" />
      </div>

      {/* Pie Chart Section */}
      <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
        {/* Left — Description */}
        <div className="lg:w-[40%] space-y-8">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
              By Category
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-light">
              Every rupee tells a story. Your spending broken down by category
              reveals the patterns behind your financial habits.
            </p>
          </div>

          {/* Category breakdown list */}
          <div className="space-y-4 pt-4">
            {categoryData.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">{cat.name}</span>
                  <span className="text-gray-900 font-semibold">
                    Rs {cat.value.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div
                    className="h-1 rounded-full bg-green-700 transition-all duration-700"
                    style={{ width: `${(cat.value / totalSpend) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top category callout */}
          {topCategory && (
            <div className="border-l-2 border-green-800 pl-5 py-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                Top Category
              </p>
              <p className="text-gray-900 font-medium text-lg">
                {topCategory.name}
              </p>
              <p className="text-green-700 text-sm">
                {((topCategory.value / totalSpend) * 100).toFixed(0)}% of total
                spending
              </p>
            </div>
          )}
        </div>

        {/* Right — Chart */}
        <div className="lg:w-[60%] flex justify-center">
          <div className="relative">
            {/* Decorative background circle */}
            <div className="absolute inset-0 rounded-full bg-green-50 opacity-40 scale-110 blur-2xl" />
            <PieChartComp categoryData={categoryData} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-6 mb-32">
        <div className="flex-1 h-px bg-gray-100" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-800" />
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Monthly Trends placeholder — ready for BarChart */}
      <div className="flex flex-col lg:flex-row items-center gap-20">
        {/* Left — Chart placeholder */}
        <div className="lg:w-[60%] flex justify-center">
          <div className="w-full px-10 py-5 rounded-2xl bg-gray-50 border border-dashed border-gray-200 ">
            <div className="text-gray-300 text-sm tracking-widest uppercase">
              <Barchart monthlyData={monthlyData} />
            </div>
          </div>
        </div>

        {/* Right — Description */}
        <div className="lg:w-[40%] space-y-6">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
              Over Time
            </p>
            <h3 className="text-3xl font-light text-gray-900 leading-snug">
              Monthly <br />
              <span className="text-green-800 italic">spending trends</span>
            </h3>
          </div>
          <p className="text-gray-500 text-base leading-relaxed font-light">
            Track how your spending evolves month to month. Spot patterns,
            celebrate progress, and course correct early.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsComp;
