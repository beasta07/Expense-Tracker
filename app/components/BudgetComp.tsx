'use client'

import { useActionState } from "react"
import useExpenses from "../hooks/useExpenses"
import useBudget from "../hooks/useBudget"
import { setBudget } from "../actions/budget"

const BudgetComp =  ({state}) => {
    const [postState,actionFunction,isPending] = useActionState(setBudget,null)

 const {budgetState,error,budgetStateLoading} = useBudget(postState)
  const {expenses,loading,errors} =  useExpenses(state)

   const monthNum = new Date().getMonth()
   const month = new Date().toLocaleString('default', { month: 'long' })
  const year = new Date().getFullYear()

const spent = expenses
  .filter(expense => {
    const date = new Date(expense.date)
    return date.getMonth()  === monthNum && date.getFullYear() === year
  })
  .reduce((acc, expense) => acc + expense.amount, 0)
 

  console.log('This is how the the budget data is looking ',postState)
  
  const getBarColor = () => {
    if (percentage <= 60) return '#1a6b3c'
    if (percentage <= 85) return '#d97706'
    return '#dc2626'
  }

  const getStatusText = () => {
    if (percentage <= 60) return 'On track'
    if (percentage <= 85) return 'Approaching limit'
    return 'Over budget'
  }
  if (budgetStateLoading) return <div>Fetching budget data</div>
const percentage = budgetState ? Math.min((spent / budgetState.amount) * 100, 100) : 0
const remaining = budgetState ? budgetState.amount - spent : 0
  
  return (
   <>

   {(!budgetState)?   
    <section className="bg-white px-8 md:px-24 py-24 border-t border-gray-100">
      {/* Section label */}
      <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
        Monthly budget
      </p>

      {/* Heading */}
      <h2 className="text-5xl font-light text-gray-900 leading-tight mb-2">
        No budget set for <span className="italic text-green-600">{month}.</span>
      </h2>
      <p className="text-gray-400 text-sm mb-12">
        Set a budget to start tracking your spending this month.
      </p>
      {/* Form */}
          <form action={actionFunction}>
      <div className="flex gap-3 max-w-sm">
        <div className="flex items-center border-b border-gray-300 flex-1 pb-1">
          <span className="text-gray-400 text-sm mr-2">Rs</span>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            className="flex-1 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-300"
          />
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors">
          Set budget
        </button>
      </div>
               {postState?.message}

          </form>
    </section>
  :
    <section className="bg-white px-8 md:px-24 py-24  border-t border-gray-100">
      {/* Section label */}
      <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
        Monthly budget
      </p>

      {/* Heading */}
      <h2 className="text-5xl font-light text-gray-900 leading-tight">
        Are you on <span className="italic text-green-600">track?</span>
      </h2>
      <p className="text-gray-400 text-sm mt-4 mb-12">
        {month} {year} · <span className={`font-semibold ${(percentage <= 85) ? 'text-orange-300':' text-red-700'} `}> {getStatusText()} </span> 
      </p>

      {/* Main content — two column */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        {/* Left — numbers */}
        <div>
          {/* Spent */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Spent</p>
            <p className="text-5xl font-light text-gray-900 leading-tight">
              Rs <span className="text-green-600">{spent.toLocaleString()}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-gray-200 mb-8" />

          {/* budgetState + Remaining */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">budget</p>
              <p className="text-2xl font-semibold text-gray-700">Rs {budgetState.amount}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Remaining</p>
              <p className="text-2xl font-semibold text-gray-700">Rs {remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Right — progress + form */}
        <div className="flex flex-col justify-between">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>0</span>
              <span>{percentage.toFixed(1)}% used</span>
              <span>Rs {budgetState.amount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mb-1">
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${percentage}%`, backgroundColor: getBarColor() }}
              />
            </div>
          </div>

          {/* Form */}
          <form action={actionFunction}>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              Update budget
            </p>
            <div className="flex gap-3">
              <div className="flex items-center border-b border-gray-300 flex-1 pb-1">
                <span className="text-gray-400 text-sm mr-2">Rs</span>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  className="flex-1 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-300"
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
   }
   </>


  )
}

export default BudgetComp