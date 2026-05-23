import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { monday } from '@/lib/monday/client'
import { sessionTokenStore } from '@/lib/monday/session-token-store'
import type { MondayAppState, MondayContext } from '@/features/monday/types'

const MondayContextReact = createContext<MondayAppState | null>(null)

function isMondayIframe(): boolean {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
}

async function loadSessionToken(): Promise<string | null> {
  try {
    const res = await monday.get('sessionToken')
    const token = typeof res.data === 'string' ? res.data : null
    sessionTokenStore.set(token)
    return token
  } catch {
    sessionTokenStore.set(null)
    return null
  }
}

type MondayProviderProps = {
  children: ReactNode
}

export function MondayProvider({ children }: MondayProviderProps) {
  const embedded = isMondayIframe()
  const [state, setState] = useState<MondayAppState>({
    isEmbedded: embedded,
    isLoading: embedded,
    context: null,
    sessionToken: null,
    error: null,
  })

  const refreshSession = useCallback(async () => {
    const token = await loadSessionToken()
    setState((prev) => ({ ...prev, sessionToken: token }))
    return token
  }, [])

  useEffect(() => {
    if (!embedded) {
      setState((prev) => ({ ...prev, isLoading: false }))
      return
    }

    monday.execute('valueCreatedForUser')

    monday.listen('context', (res) => {
      setState((prev) => ({
        ...prev,
        context: res.data as MondayContext,
        isLoading: false,
        error: null,
      }))
    })

    void (async () => {
      try {
        const [contextRes, token] = await Promise.all([
          monday.get('context'),
          loadSessionToken(),
        ])
        setState({
          isEmbedded: true,
          isLoading: false,
          context: contextRes.data as MondayContext,
          sessionToken: token,
          error: null,
        })
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load monday.com context',
        }))
      }
    })()

  }, [embedded])

  const value = useMemo(
    () => ({ ...state, refreshSession }),
    [state, refreshSession],
  )

  return (
    <MondayContextReact.Provider value={value}>
      {children}
    </MondayContextReact.Provider>
  )
}

export type MondayContextValue = MondayAppState & {
  refreshSession: () => Promise<string | null>
}

export function useMonday(): MondayContextValue {
  const ctx = useContext(MondayContextReact)
  if (!ctx) {
    throw new Error('useMonday must be used within MondayProvider')
  }
  return ctx as MondayContextValue
}
