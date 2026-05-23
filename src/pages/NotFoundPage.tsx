import { FileQuestion } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 animate-fade-in">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-surface shadow-card">
        <FileQuestion className="size-6 text-muted" strokeWidth={1.75} />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-center text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <ButtonLink to="/" variant="brand" className="mt-8">
        Back to overview
      </ButtonLink>
    </div>
  )
}
