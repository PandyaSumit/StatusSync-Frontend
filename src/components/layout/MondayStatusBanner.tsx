import { env } from '@/config/env'
import { useMonday } from '@/features/monday/MondayProvider'
import { Alert } from '@/components/ui/alert'

export function MondayStatusBanner() {
  const { isEmbedded, isLoading, context, sessionToken, error } = useMonday()

  if (isLoading) {
    return (
      <Alert variant="loading" title="Connecting">
        Establishing secure connection with monday.com…
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert variant="error" title="Connection failed">
        {error}
      </Alert>
    )
  }

  if (!isEmbedded) {
    return (
      <Alert variant="warning" title="Development mode">
        Running outside monday.com. Open as a <strong>Board View</strong> or run{' '}
        <code>mapps tunnel:create</code> for local testing.
        {env.mondayDevMode ? (
          <>
            {' '}
            API calls need a session token and will not work until embedded.
          </>
        ) : null}
      </Alert>
    )
  }

  if (!sessionToken) {
    return (
      <Alert variant="warning" title="Authentication required">
        No session token detected. Verify OAuth credentials in the monday
        Developer Center.
      </Alert>
    )
  }

  const boardLabel = context?.boardId
    ? `Board #${context.boardId}`
    : 'Workspace'

  return (
    <Alert variant="brand" title="Connected to monday.com">
      {boardLabel}
      {context?.user?.name ? (
        <>
          {' '}
          · <span className="text-foreground-secondary">{context.user.name}</span>
        </>
      ) : null}
    </Alert>
  )
}
