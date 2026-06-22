import { Clock } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

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
          <Select value={hour} onValueChange={onHourChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0')).map((h) => (
                <SelectItem key={h} value={h}>
                  {h}h
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={minute} onValueChange={onMinuteChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['00', '15', '30', '45'].map((m) => (
                <SelectItem key={m} value={m}>
                  {m} min
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
