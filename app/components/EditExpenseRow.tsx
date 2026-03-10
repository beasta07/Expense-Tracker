'use client'
import { useState } from 'react'
import { editExpense } from '@/app/actions/expenses'
import type { Expense } from '@/types'

export default function EditExpenseRow({ 
  expense, 
  onCancel, 
  onSuccess 
}: { 
  expense: Expense
  onCancel: () => void
  onSuccess: () => void
}) {
  const [isPending, setIsPending] = useState(false)
  
  const [formData, setFormData] = useState({
    amount: expense.amount,
    description: expense.description,
    date: new Date(expense.date).toISOString().split('T')[0],
    category: expense.category || ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsPending(true)
    try {
      const fd = new FormData()
      fd.append('id', String(expense.id))
      fd.append('amount', formData.amount.toString())
      fd.append('description', formData.description)
      fd.append('date', formData.date)
      fd.append('category', formData.category)
      
      const result = await editExpense(null, fd)
      if (result.success) {
        onSuccess()
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <tr>
      <td className="border border-gray-300 p-2">{expense.id}</td>
      <td className="border border-gray-300 p-2">
        <input 
          type="number" 
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          name="amount"
          required
        />
      </td>
      <td className="border border-gray-300 p-2">
        <input 
          type="text" 
          value={formData.description}
          onChange={handleChange}
          name="description"
          required
        />
      </td>
      <td className="border border-gray-300 p-2">
        <input 
          type="date" 
          value={formData.date}
          onChange={handleChange}
          name="date"
          required
        />
      </td>
      <td className="border border-gray-300 p-2">
        <input 
          type="text" 
          value={formData.category}
          onChange={handleChange}
          name="category"
        />
      </td>
      <td className="border border-gray-300 p-2 flex gap-2">
        <button className='border border-red-600 p-2 rounded-lg text-red-800 font-medium' type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
        className='border border-blue-600 p-2 rounded-lg text-blue-800 font-medium' 
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
        >
          Save
        </button>
      </td>
    </tr>
  )
}