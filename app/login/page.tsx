'use client'

import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { logIn } from '../actions/auth'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [state,loginAction,isPending] = useActionState(logIn,null)

      const router = useRouter()
    
 useEffect(()=>{
  if (state?.success){
    router.push('/')
  }
},[state,router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-black">Login</h1>
           {state?.success && (
          <p className="text-green-600 mb-4">{state.message}</p>
        )}
        {state?.error && <p className="text-red-600 mb-4">{state.error}</p>}
        <p className="text-gray-600 mb-6">Login to start tracking your expenses</p>

        <form action={loginAction} className="space-y-4">
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
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
          >
            {isPending ? 'Submitting...':'Submit'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/signup" className="text-green-500 hover:text-green-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}