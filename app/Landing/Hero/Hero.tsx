'use client'

import useExpenses from "@/app/hooks/useExpenses";
import getNepaliMonthAndYear from "@/lib/nepaliDate";
import NepaliDate from "nepali-date-converter";

const Hero = ({ state }: { state: unknown }) => {
  const { expenses, loading } = useExpenses(state);
  
const { month, year } = getNepaliMonthAndYear(new Date())

const dateCheckedExpense = expenses.filter(expense => {
  const { month: expMonth, year: expYear } = getNepaliMonthAndYear(new Date(expense.date))
  return expMonth === month && expYear === year
})

  const total = dateCheckedExpense.reduce((acc, sum) => acc + sum.amount, 0)
  const dailyAverage = Math.round(total / 30)
  const userName = expenses[0]?.user?.name || 'there'

  // const monthName = new Date().toLocaleString('default', { month: 'long' })

  const npDate = new NepaliDate(new Date())
  const monthName = npDate.format('MMMM')
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#166534 1px, transparent 1px), linear-gradient(90deg, #166534 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative px-8 md:px-24 py-24">
        {/* Greeting */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-4">
            {monthName} {year}
          </p>
          <h1 className="text-6xl md:text-7xl font-light text-gray-900 leading-none">
            Hello, <span className="text-green-800 italic">{userName}.</span>
          </h1>
          <p className="mt-5 text-gray-400 text-lg font-light max-w-md">
            Here is a snapshot of your financial activity this month.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-6">

          {/* This month */}
          <div className="relative flex-2 border border-gray-100 rounded-2xl p-8 bg-white overflow-hidden group hover:border-green-200 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-800 rounded-l-2xl" />
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium mb-6">
              This Month
            </p>
            {loading ? (
              <div className="w-8 h-8 border-2 border-green-800 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <p className="text-5xl md:text-6xl font-light text-gray-900">
                  Rs <span className="text-green-800">{total.toLocaleString()}</span>
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  {dateCheckedExpense.length} transaction{dateCheckedExpense.length !== 1 ? 's' : ''} recorded
                </p>
              </>
            )}
          </div>

          {/* Daily average */}
          <div className="relative flex-1 border border-gray-100 rounded-2xl p-8 bg-white group hover:border-green-200 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-200 rounded-l-2xl" />
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium mb-6">
              Daily Average
            </p>
            {loading ? (
              <div className="w-6 h-6 border-2 border-green-800 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <p className="text-4xl font-light text-gray-900">
                  Rs <span className="text-green-700">{dailyAverage.toLocaleString()}</span>
                </p>
                <p className="mt-3 text-sm text-gray-400">per day this month</p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;