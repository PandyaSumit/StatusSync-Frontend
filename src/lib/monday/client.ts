import createMonday from '@/lib/monday/load-sdk'
import type { MondaySDK } from '@/types/monday-sdk'

/** Singleton monday SDK instance for board view / widget iframe. */
export const monday = createMonday() as MondaySDK

monday.setApiVersion('2024-10')
