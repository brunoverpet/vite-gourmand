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

type FormSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  id?: string
  className?: string
}

export function FormSelect({
  value,
  onValueChange,
  options,
  placeholder,
  id,
  className,
}: FormSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className={cn('h-10!', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
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
