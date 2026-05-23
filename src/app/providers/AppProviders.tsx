import type { ReactNode } from 'react'
import { MondayProvider } from '@/features/monday/MondayProvider'
import { QueryProvider } from '@/app/providers/QueryProvider'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MondayProvider>
      <QueryProvider>{children}</QueryProvider>
    </MondayProvider>
  )
}
