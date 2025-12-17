'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { login } from './actions'
import Link from 'next/link'
import Swal from 'sweetalert2'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition"
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, { error: '' })

  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: state.error,
      })
    }
  }, [state])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {state?.error && (
            <div className="text-red-600 text-sm">{state.error}</div>
          )}

          <SubmitButton />
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
