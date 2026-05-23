import { NavLink } from 'react-router-dom'
import { BarChart3, LayoutDashboard, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/digests', label: 'Digests', icon: Mail },
  { to: '/analytics', label: 'Stats', icon: BarChart3 },
] as const

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
      aria-label="Mobile"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={'end' in item ? item.end : false}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
              isActive ? 'text-foreground' : 'text-muted',
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn('size-5', isActive && 'text-brand-600')}
                strokeWidth={isActive ? 2 : 1.75}
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
