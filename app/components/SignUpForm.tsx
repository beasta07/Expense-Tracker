'use client'

import { useActionState, useEffect } from 'react'
import { signUp } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'  // ✅ Correct!

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, null)
  const router = useRouter()


  useEffect(() => {
  if (state?.success) {
    router.push('/')
  }
}, [state, router])

  return (
    <>
      {state?.success && (
        <p className="text-green-600 mb-4">Sign up successful! Redirecting...</p>
      )}
      {state?.error && <p className="text-red-600 mb-4">{state.error}</p>}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </>
  )
}