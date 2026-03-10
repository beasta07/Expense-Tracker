'use client'

import { useEffect, useState } from 'react'
import { getLoggedInUserExpense, getUsersWithExpenses } from '@/app/actions/expenses'
import type { Expense, Users } from '@/types'

const useExpenses = (refreshTrigger) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUserExpense()
        setExpenses(data)
      } catch (err) {
        console.error(err)
        setErrors(err as Error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [refreshTrigger])  // Refetch when refreshTrigger changes

  return { expenses, loading, errors }
}

export default useExpenses