import {
  ArrowRight,
  Calendar,
  Mail,
  Palette,
  Sparkles,
} from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'

const features = [
  {
    icon: Palette,
    title: 'Board configuration',
    description:
      'Choose boards, groups, columns, and filters so every digest shows exactly what matters.',
  },
  {
    icon: Calendar,
    title: 'Recipients & schedule',
    description:
      'Add external emails and automate sends on daily, weekly, or custom cadences.',
  },
  {
    icon: Mail,
    title: 'Branded digests',
    description:
      'Mobile-friendly HTML emails with engagement tracked in analytics.',
  },
] as const

export function HomePage() {
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-card sm:p-10">
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand-100/40 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <PageHeader
            eyebrow="StatusSync"
            title="Beautiful status digests, on autopilot"
            description="Turn monday.com boards into polished email updates for clients, executives, and external stakeholders — no monday.com login required."
            actions={
              <>
                <ButtonLink to="/digests" variant="brand">
                  Configure a digest
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink to="/analytics" variant="secondary">
                  View analytics
                </ButtonLink>
              </>
            }
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-brand-600" strokeWidth={1.75} />
          <h2 className="text-sm font-semibold text-foreground">
            Everything you need
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="animate-slide-up hover:shadow-md"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-surface-hover">
                  <feature.icon
                    className="size-4.5 text-foreground-secondary"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
