import { cn } from '@/lib/utils'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-gradient-to-r from-surface-hover via-surface-muted to-surface-hover bg-[length:200%_100%] animate-shimmer',
        className,
      )}
      aria-hidden
    />
  )
}
