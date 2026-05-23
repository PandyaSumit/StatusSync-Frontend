import type { MondayContext } from '@/types/monday-sdk'

export type { MondayContext }

export type MondayAppState = {
  isEmbedded: boolean
  isLoading: boolean
  context: MondayContext | null
  sessionToken: string | null
  error: string | null
}
