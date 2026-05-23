import { Eye, MailCheck, MousePointerClick, Users } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { PageHeader } from '@/components/ui/page-header'
import { StatCard } from '@/components/ui/stat-card'

const placeholderStats = [
  {
    label: 'Emails sent',
    value: '—',
    change: 'Connect backend',
    trend: 'neutral' as const,
    icon: MailCheck,
  },
  {
    label: 'Open rate',
    value: '—',
    change: 'Last 30 days',
    trend: 'neutral' as const,
    icon: Eye,
  },
  {
    label: 'Click rate',
    value: '—',
    change: 'Last 30 days',
    trend: 'neutral' as const,
    icon: MousePointerClick,
  },
  {
    label: 'Active recipients',
    value: '—',
    change: 'Across all digests',
    trend: 'neutral' as const,
    icon: Users,
  },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Analytics"
        description="Track delivery, opens, and engagement across all digest campaigns."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placeholderStats.map((stat, index) => (
          <div
            key={stat.label}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <EmptyState
        icon={Eye}
        title="Analytics coming soon"
        description="Wire this dashboard to your backend metrics endpoints to surface open rates, delivery health, and top-performing digests."
      />
    </div>
  )
}
