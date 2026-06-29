import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon, XIcon } from 'lucide-react'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

type Props = {
  value: string | undefined
  onChange: (value: string | undefined) => void
  placeholder: string
}

export function DatePickerFilter({ value, onChange, placeholder }: Props) {
  const date = value ? new Date(value) : undefined

  return (
    <div className="flex h-10 items-center rounded-md border border-input bg-background text-sm">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex h-full items-center gap-2 pl-3 pr-2 text-sm',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="w-4 h-4 shrink-0" />
            {date ? format(date, 'd MMM yyyy', { locale: fr }) : placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => onChange(d ? format(d, 'yyyy-MM-dd') : undefined)}
          />
        </PopoverContent>
      </Popover>
      {date && (
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="flex h-full items-center pr-2 text-muted-foreground hover:text-foreground"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
