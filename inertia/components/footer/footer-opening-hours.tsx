import { usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'

const DAY_LABELS: Record<number, string> = {
  0: 'Lundi',
  1: 'Mardi',
  2: 'Mercredi',
  3: 'Jeudi',
  4: 'Vendredi',
  5: 'Samedi',
  6: 'Dimanche',
}

function formatHour(time: string) {
  const [h, m] = time.split(':')
  return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`
}

export function FooterOpeningHours() {
  const { openingHours } = usePage<InertiaProps>().props
  const sorted = [...(openingHours ?? [])].sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  return (
    <div>
      <p className="text-label-caps text-primary-foreground/60 my-1" aria-hidden="true">
        Horaires
      </p>
      {sorted.map((h) => {
        const hours =
          h.isClosed || !h.openTime || !h.closeTime
            ? 'Fermé'
            : `${formatHour(h.openTime)} – ${formatHour(h.closeTime)}`
        return (
          <div key={h.dayOfWeek} className="flex gap-4">
            <span className="w-24 text-primary-foreground/60">{DAY_LABELS[h.dayOfWeek]}</span>
            <span>{hours}</span>
          </div>
        )
      })}
    </div>
  )
}
