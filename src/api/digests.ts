import { api } from '@/lib/api'
import type { Digest } from '@/types/digest'

export type CreateDigestPayload = {
  name: string
  boardIds: string[]
  frequency: Digest['frequency']
  isActive?: boolean
}

export const digestsApi = {
  list: () => api.get<Digest[]>('/digests').then((r) => r.data),
  get: (id: string) => api.get<Digest>(`/digests/${id}`).then((r) => r.data),
  create: (payload: CreateDigestPayload) =>
    api.post<Digest>('/digests', payload).then((r) => r.data),
  update: (id: string, payload: Partial<CreateDigestPayload>) =>
    api.patch<Digest>(`/digests/${id}`, payload).then((r) => r.data),
  remove: (id: string) => api.delete(`/digests/${id}`),
}
