import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
} from 'lucide-react'
import { DigestsTableSkeleton } from '@/components/digests/DigestsTableSkeleton'
import {
  Badge,
  Button,
  Drawer,
  EmptyState,
  ErrorState,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { useDigests } from '@/hooks/useDigests'
import { useMonday } from '@/features/monday/MondayProvider'
import { formatDigestFrequency } from '@/lib/format'

export function DigestsPage() {
  const { isEmbedded, sessionToken } = useMonday()
  const queryClient = useQueryClient()
  const { data: digests, isLoading, isError, error, refetch, isFetching } =
    useDigests()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!isEmbedded || !sessionToken) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          title="Digests"
          description="Install StatusSync in monday.com and open it from a board to manage scheduled reports."
        />
        <EmptyState
          className="mt-8"
          icon={Mail}
          title="Open from monday.com"
          description="Digest management requires an active monday.com board view session with a valid connection."
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Digests"
        description={
          digests?.length
            ? `${digests.length} scheduled report${digests.length === 1 ? '' : 's'} for this workspace`
            : 'Create automated board digests for your external stakeholders.'
        }
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              leftIcon={
                <RefreshCw
                  className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
                />
              }
              onClick={() => refetch()}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button
              variant="brand"
              size="md"
              leftIcon={<Plus className="size-4" />}
              onClick={() => setDrawerOpen(true)}
            >
              New digest
            </Button>
          </>
        }
      />

      {isLoading ? <DigestsTableSkeleton /> : null}

      {isError ? (
        <ErrorState
          message={
            (error as Error)?.message ?? 'Unable to load digests. Please try again.'
          }
          onRetry={() => refetch()}
        />
      ) : null}

      {!isLoading && !isError && digests && digests.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Boards</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Recipients</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {digests.map((digest) => (
              <TableRow key={digest.id}>
                <TableCell>
                  <p className="font-medium text-foreground">{digest.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    Updated{' '}
                    {new Date(digest.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="text-foreground-secondary">
                    {formatDigestFrequency(digest.frequency)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums text-foreground-secondary">
                    {digest.boardIds.length}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={digest.isActive ? 'success' : 'muted'}>
                    {digest.isActive ? 'Active' : 'Paused'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums text-foreground-secondary">
                  {digest.recipientCount}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Actions for ${digest.name}`}
                    className="text-muted"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      {!isLoading && !isError && digests?.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No digests yet"
          description="Create your first scheduled digest to send polished board updates to clients and stakeholders automatically."
          action={
            <Button
              variant="brand"
              leftIcon={<Plus className="size-4" />}
              onClick={() => setDrawerOpen(true)}
            >
              Create digest
            </Button>
          }
        />
      ) : null}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="New digest"
        description="Configure content, recipients, and schedule. Full wizard coming soon."
        footer={
          <>
            <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="brand"
              onClick={() => {
                setDrawerOpen(false)
                void queryClient.invalidateQueries({ queryKey: ['digests'] })
              }}
            >
              Save draft
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="digest-name"
              className="text-sm font-medium text-foreground"
            >
              Digest name
            </label>
            <input
              id="digest-name"
              type="text"
              placeholder="e.g. Weekly client update"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Next steps: select board columns, add recipients, preview email, and
            set your send schedule.
          </p>
        </div>
      </Drawer>
    </div>
  )
}
