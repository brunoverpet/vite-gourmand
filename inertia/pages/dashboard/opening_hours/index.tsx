import type { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { TimePicker } from '~/components/ui/time-picker'
import { formatTime } from '~/lib/format-date'
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

type IndexProps = InertiaProps<{
  openingHours: Data.OpeningHours.OpeningHours[]
}>

export default function OpeningHoursIndex({ openingHours }: IndexProps) {
  const sorted = [...openingHours].sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  const form = useForm({
    hours: sorted.map((h) => ({
      id: h.id,
      openTime: h.openTime ? (formatTime(h.openTime) ?? '') : '',
      closeTime: h.closeTime ? (formatTime(h.closeTime) ?? '') : '',
      isClosed: h.isClosed ?? false,
    })),
  })

  function updateHour(index: number, field: string, value: string | boolean) {
    form.setData(
      'hours',
      form.data.hours.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    )
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    form.transform((data) => ({
      hours: data.hours.map((h) => ({
        ...h,
        openTime: h.openTime || undefined,
        closeTime: h.closeTime || undefined,
      })),
    }))
    form.put('/dashboard/opening-hours')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Horaires d&apos;ouverture</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-2xl">
        {form.data.hours.map((hour, i) => (
          <div key={hour.id} className="flex items-center gap-4 rounded-lg border p-4">
            <span className="w-24 text-sm font-medium">{DAY_LABELS[sorted[i].dayOfWeek]}</span>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={hour.isClosed}
                onCheckedChange={(checked) => updateHour(i, 'isClosed', !!checked)}
              />
              Fermé
            </label>

            <div
              className={
                hour.isClosed
                  ? 'opacity-40 pointer-events-none flex items-center gap-2'
                  : 'flex items-center gap-2'
              }
            >
              {(() => {
                const [rawOpenH, rawOpenM] = hour.openTime.split(':')
                const [rawCloseH, rawCloseM] = hour.closeTime.split(':')
                const openH = rawOpenH || '09'
                const openM = rawOpenM || '00'
                const closeH = rawCloseH || '17'
                const closeM = rawCloseM || '00'
                return (
                  <>
                    <TimePicker
                      hour={openH}
                      minute={openM}
                      onHourChange={(h) => updateHour(i, 'openTime', `${h}:${openM}`)}
                      onMinuteChange={(m) => updateHour(i, 'openTime', `${openH}:${m}`)}
                    />
                    <span className="text-muted-foreground text-sm">—</span>
                    <TimePicker
                      hour={closeH}
                      minute={closeM}
                      onHourChange={(h) => updateHour(i, 'closeTime', `${h}:${closeM}`)}
                      onMinuteChange={(m) => updateHour(i, 'closeTime', `${closeH}:${m}`)}
                    />
                  </>
                )
              })()}
            </div>
          </div>
        ))}

        <Button type="submit" disabled={form.processing || !form.isDirty}>
          Enregistrer
        </Button>
      </form>
    </div>
  )
}
