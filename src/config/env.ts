const apiUrl = import.meta.env.VITE_API_URL

export const env = {
  /** Backend API base including `/api` prefix */
  apiUrl: apiUrl ?? 'http://localhost:3000/api',
  isDev: import.meta.env.DEV,
  /** When true, UI shows standalone dev hints (not inside monday iframe) */
  mondayDevMode: import.meta.env.VITE_MONDAY_DEV_MODE === 'true',
} as const
