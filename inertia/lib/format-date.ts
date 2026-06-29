export function formatDate(date: string | null, opts?: Intl.DateTimeFormatOptions) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString(
    'fr-FR',
    opts ?? { day: '2-digit', month: 'long', year: 'numeric' }
  )
}

export function formatDateTime(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(time: string | null) {
  if (!time) return '—'
  return time.slice(0, 5)
}
