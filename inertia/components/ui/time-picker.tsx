import { Clock } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { FormSelect } from '~/components/ui/form-select'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

const HOUR_OPTIONS = Array.from({ length: 15 }, (_, i) => {
  const h = String(i + 8).padStart(2, '0')
  return { value: h, label: `${h}h` }
})

const MINUTE_OPTIONS = ['00', '15', '30', '45'].map((m) => ({ value: m, label: `${m} min` }))

type Props = {
  hour: string
  minute: string
  onHourChange: (h: string) => void
  onMinuteChange: (m: string) => void
}

export function TimePicker({ hour, minute, onHourChange, onMinuteChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-left text-sm flex items-center gap-2 transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
        >
          <Clock className="w-4 h-4 shrink-0" />
          {hour}h{minute}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex gap-3">
          <FormSelect
            value={hour}
            onValueChange={onHourChange}
            options={HOUR_OPTIONS}
            className="w-24"
          />
          <FormSelect
            value={minute}
            onValueChange={onMinuteChange}
            options={MINUTE_OPTIONS}
            className="w-24"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
