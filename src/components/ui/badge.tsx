import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-surface-hover text-foreground-secondary border border-border',
  brand: 'bg-brand-50 text-brand-700 border border-brand-200',
  success: 'bg-success-muted text-success border border-emerald-200',
  warning: 'bg-warning-muted text-warning border border-amber-200',
  danger: 'bg-danger-muted text-danger border border-red-200',
  muted: 'bg-surface-muted text-muted border border-border-subtle',
} as const

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
