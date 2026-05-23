import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { MobileNav } from '@/components/layout/MobileNav'
import { MondayStatusBanner } from '@/components/layout/MondayStatusBanner'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <AppSidebar />

      <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
        <header className="flex h-14 items-center border-b border-border bg-surface/80 px-4 backdrop-blur-md md:hidden">
          <span className="text-sm font-semibold tracking-tight">StatusSync</span>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-8 lg:py-10">
            <div className="mb-6">
              <MondayStatusBanner />
            </div>
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
