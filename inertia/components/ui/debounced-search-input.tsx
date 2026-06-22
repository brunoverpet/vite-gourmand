import { useEffect, useRef } from 'react'
import { Input } from '~/components/ui/input'

type DebouncedSearchInputProps = {
  defaultValue?: string
  placeholder?: string
  delay?: number
  onSearch: (value: string) => void
  className?: string
}

export function DebouncedSearchInput({
  defaultValue = '',
  placeholder = 'Rechercher…',
  delay = 400,
  onSearch,
  className,
}: DebouncedSearchInputProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSearch(e.target.value), delay)
  }

  return (
    <Input
      type="text"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleChange}
      className={className}
    />
  )
}
