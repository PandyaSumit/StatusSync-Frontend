export type MondayContext = {
  boardId?: number
  boardIds?: number[]
  boardViewId?: number
  instanceId?: number
  instanceType?: string
  account?: { id: string }
  user?: { id: string; name?: string; email?: string }
  theme?: string
}

export type MondaySDK = {
  setApiVersion(version: string): void
  listen(
    type: 'context' | 'settings' | 'itemIds' | 'events',
    callback: (res: { data: unknown }) => void,
  ): void
  get(
    type: 'context' | 'sessionToken' | 'settings',
  ): Promise<{ data: unknown }>
  execute(
    type: string,
    params?: Record<string, unknown>,
  ): Promise<unknown>
  api(
    query: string,
    options?: { variables?: Record<string, unknown> },
  ): Promise<{ data: unknown }>
}
