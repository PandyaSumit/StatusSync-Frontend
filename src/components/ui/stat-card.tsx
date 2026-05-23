import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatCardProps = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  className?: string
}

export function StatCard({
  label,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface p-5 shadow-card',
        'transition-all duration-200 hover:border-border hover:shadow-sm',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {change ? (
            <p
              className={cn(
                'text-xs font-medium',
                trend === 'up' && 'text-success',
                trend === 'down' && 'text-danger',
                trend === 'neutral' && 'text-muted',
              )}
            >
              {change}
            </p>
          ) : null}
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-surface-hover">
          <Icon className="size-4.5 text-muted" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  )
}
