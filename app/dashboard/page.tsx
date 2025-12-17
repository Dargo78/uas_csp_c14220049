import { createClient } from '@/lib/supabase/server'
import { logout } from './actions'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

async function Announcements() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      {announcements?.map((announcement) => (
        <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {announcement.title}
          </h3>
          <p className="text-gray-600">{announcement.content}</p>
        </div>
      ))}
    </div>
  )
}

function AnnouncementsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
            {user && (
              <p className="text-gray-600 mt-2">Logged in as: {user.email}</p>
            )}
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </form>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Announcements</h2>
        <Suspense fallback={<AnnouncementsLoading />}>
          <Announcements />
        </Suspense>
      </div>
    </div>
  )
}
