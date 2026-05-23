import type { ReactNode } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  TriangleAlert,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = {
  info: {
    container: 'border-border bg-surface shadow-card',
    icon: 'text-muted',
    Icon: Info,
  },
  success: {
    container: 'border-emerald-200/80 bg-success-muted',
    icon: 'text-success',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'border-amber-200/80 bg-warning-muted',
    icon: 'text-warning',
    Icon: TriangleAlert,
  },
  error: {
    container: 'border-red-200/80 bg-danger-muted',
    icon: 'text-danger',
    Icon: AlertCircle,
  },
  brand: {
    container: 'border-brand-200/80 bg-brand-50',
    icon: 'text-brand-600',
    Icon: CheckCircle2,
  },
  loading: {
    container: 'border-border bg-surface shadow-card',
    icon: 'text-muted',
    Icon: Loader2,
  },
} as const

export type AlertVariant = keyof typeof variants

type AlertProps = {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  className?: string
}

export function Alert({
  variant = 'info',
  title,
  children,
  className,
}: AlertProps) {
  const { container, icon, Icon } = variants[variant]
  const isLoading = variant === 'loading'

  return (
    <div
      role="status"
      className={cn(
        'flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed',
        'animate-fade-in transition-colors',
        container,
        className,
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-4 shrink-0',
          icon,
          isLoading && 'animate-spin',
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1 text-foreground-secondary">
        {title ? <p className="mb-0.5 font-medium text-foreground">{title}</p> : null}
        <div className="text-muted [&_strong]:font-medium [&_strong]:text-foreground-secondary [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs">
          {children}
        </div>
      </div>
    </div>
  )
}
