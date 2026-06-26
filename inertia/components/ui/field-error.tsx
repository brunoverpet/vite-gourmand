import { cn } from '~/lib/utils'

type Props = {
  message?: string | null
  className?: string
}

export function FieldError({ message, className }: Props) {
  if (!message) return null
  return (
    <div role="status" aria-live="polite" className={cn('text-destructive text-sm', className)}>
      {message}
    </div>
  )
}
