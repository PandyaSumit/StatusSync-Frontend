import axios, { type AxiosError } from 'axios'
import { env } from '@/config/env'
import { sessionTokenStore } from '@/lib/monday/session-token-store'

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
})

api.interceptors.request.use((config) => {
  const token = sessionTokenStore.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; code?: string }>) => {
    if (import.meta.env.DEV) {
      console.error('[api]', error.response?.data ?? error.message)
    }
    return Promise.reject(error)
  },
)
