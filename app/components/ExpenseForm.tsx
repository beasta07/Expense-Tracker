'use client'

export function ExpenseForm({ state, actionFunction, isPending }) {
  return (
    <div className="px-8 md:px-24 py-16 bg-white border-t border-gray-100">

      {/* Section header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
          New Entry
        </p>
        <h2 className="text-4xl font-light text-gray-900">
          Add an <span className="text-green-800 italic">expense</span>
        </h2>
        <div className="w-12 h-px bg-green-800 mt-5" />
      </div>

      <form action={actionFunction} className="max-w-2xl space-y-5">

        {/* Feedback messages */}
        {state?.success && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
            <p className="text-green-700 text-sm">{state.message}</p>
          </div>
        )}
        {state?.error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <p className="text-red-600 text-sm">{state.error}</p>
          </div>
        )}

        {/* Amount + Category row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                Rs
              </span>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                required
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all text-sm appearance-none"
            >
              <option value="">Select...</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Saving">Saving</option>
              <option value="Essentials">Essentials</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="What was this for?"
            required
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:bg-white transition-all text-sm"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-green-800 text-white text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Recording...
            </span>
          ) : (
            'Record Expense'
          )}
        </button>
      </form>
    </div>
  )
}