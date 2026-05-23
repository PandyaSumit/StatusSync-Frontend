import { useQuery } from '@tanstack/react-query'
import { useMonday } from '@/features/monday/MondayProvider'
import { api } from '@/lib/api'
import type { Digest } from '@/types/digest'

async function fetchDigests(): Promise<Digest[]> {
  const { data } = await api.get<Digest[]>('/digests')
  return data
}

export function useDigests() {
  const { sessionToken, isEmbedded, isLoading: mondayLoading } = useMonday()

  return useQuery({
    queryKey: ['digests', sessionToken],
    queryFn: fetchDigests,
    enabled: Boolean(sessionToken) && !mondayLoading,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } })?.response?.status
      if (status === 401) return false
      return failureCount < 1
    },
    meta: {
      requiresMonday: isEmbedded,
    },
  })
}
