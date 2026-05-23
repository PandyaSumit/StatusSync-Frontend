import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  LayoutDashboard,
  Mail,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/digests', label: 'Digests', icon: Mail },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
] as const

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-14 items-center gap-2.5 border-b border-border-subtle px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-surface shadow-sm">
          <Sparkles className="size-4" strokeWidth={2} />
        </div>
        <div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            StatusSync
          </span>
          <p className="text-[10px] font-medium tracking-wide text-muted uppercase">
            Board digests
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={'end' in item ? item.end : false}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-foreground text-surface shadow-sm'
                  : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    'size-4 shrink-0 transition-colors',
                    isActive ? 'text-surface' : 'text-muted group-hover:text-foreground',
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border-subtle p-4">
        <p className="text-xs leading-relaxed text-muted">
          Automated status emails for clients & stakeholders.
        </p>
      </div>
    </aside>
  )
}
