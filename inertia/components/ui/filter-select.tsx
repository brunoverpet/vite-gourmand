import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

type Option = {
  value: string
  label: ReactNode
}

type FilterSelectProps = {
  id?: string
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  allLabel: string
  className?: string
}

export function FilterSelect({
  id,
  value,
  onValueChange,
  options,
  allLabel,
  className,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className={cn('h-10!', className)}>
        <SelectValue placeholder={allLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">{allLabel}</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
