/** In-memory session token for API requests (refreshed when monday context loads). */
let sessionToken: string | null = null

export const sessionTokenStore = {
  get(): string | null {
    return sessionToken
  },
  set(token: string | null): void {
    sessionToken = token
  },
}
