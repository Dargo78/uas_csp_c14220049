'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { register } from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition"
    >
      {pending ? 'Registering...' : 'Register'}
    </button>
  )
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, { error: '' })
  const router = useRouter()

  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: state.error,
      })
    } else if (state?.success) {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Please check your email to confirm your account',
      }).then(() => {
        router.push('/login')
      })
    }
  }, [state, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        
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
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {state?.error && (
            <div className="text-red-600 text-sm">{state.error}</div>
          )}

          <SubmitButton />
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
