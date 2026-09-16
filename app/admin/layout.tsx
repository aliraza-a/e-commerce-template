import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell'

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Check if logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Check if user is an admin
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="p-8 text-center bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="mb-2">Your current role: <strong>{profile?.role || 'null'}</strong></p>
        <p className="mb-2">Your User ID: <strong>{user.id}</strong></p>
        {error && <p className="text-red-500 text-sm">DB Error: {error.message}</p>}
        <p className="mt-4 text-gray-500">Please make sure your role is set to "admin" in the profiles table.</p>
        <Link href="/" className="mt-6 inline-block text-indigo-600 hover:underline">Return to Home</Link>
      </div>
    )
  }

  return (
    <AdminLayoutShell userEmail={user.email}>
      {children}
    </AdminLayoutShell>
  )
}
