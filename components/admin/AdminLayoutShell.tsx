'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"
import { Separator } from "@/components/ui/separator"

export function AdminLayoutShell({ children, userEmail }: { children: React.ReactNode, userEmail?: string }) {
  return (
    <SidebarProvider>
      <AdminSidebar userEmail={userEmail} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden h-screen bg-muted/20">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold tracking-tight">Admin</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
