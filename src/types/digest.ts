export type DigestScheduleFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'once'

export type Digest = {
  id: string
  name: string
  boardIds: string[]
  isActive: boolean
  frequency: DigestScheduleFrequency
  recipientCount: number
  nextSendAt: string | null
  createdAt: string
  updatedAt: string
}
