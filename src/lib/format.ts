import type { Digest } from '@/types/digest'

const frequencyLabels: Record<Digest['frequency'], string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly',
  once: 'One-time',
}

export function formatDigestFrequency(frequency: Digest['frequency']): string {
  return frequencyLabels[frequency] ?? frequency
}
