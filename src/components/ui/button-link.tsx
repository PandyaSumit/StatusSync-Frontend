import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-foreground text-surface shadow-sm hover:bg-foreground-secondary active:scale-[0.98]',
  secondary:
    'bg-surface text-foreground shadow-card border border-border hover:bg-surface-hover active:scale-[0.98]',
  brand:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:scale-[0.98]',
  ghost: 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
} as const

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variants
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = 'brand', ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          'inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium [&_svg]:shrink-0',
          'transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
          variants[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

ButtonLink.displayName = 'ButtonLink'
