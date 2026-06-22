import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Field, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { TimePicker } from '~/components/ui/time-picker'
import { cn } from '~/lib/utils'

type Props = {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  hour: string
  minute: string
  onHourChange: (h: string) => void
  onMinuteChange: (m: string) => void
  dateError?: string | null
  dateFieldId?: string
  errorClassName?: string
}

export function DateTimePickerField({
  date,
  onDateChange,
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  dateError,
  dateFieldId,
  errorClassName,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Field id={dateFieldId}>
        <FieldLabel>Date</FieldLabel>
        <input type="hidden" name="event_date" value={date ? format(date, 'yyyy-MM-dd') : ''} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                'h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-left text-sm flex items-center gap-2 transition-colors',
                'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="w-4 h-4 shrink-0" />
              {date ? format(date, 'd MMM yyyy', { locale: fr }) : 'Choisir'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              disabled={(d) => d < new Date()}
            />
          </PopoverContent>
        </Popover>
        <FieldError message={dateError} className={errorClassName} />
      </Field>

      <Field>
        <FieldLabel>Heure</FieldLabel>
        <input type="hidden" name="delivery_time" value={`${hour}:${minute}`} />
        <TimePicker
          hour={hour}
          minute={minute}
          onHourChange={onHourChange}
          onMinuteChange={onMinuteChange}
        />
      </Field>
    </div>
  )
}
