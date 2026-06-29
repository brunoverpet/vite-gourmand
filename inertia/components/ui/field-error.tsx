import { cn } from '~/lib/utils'

type Props = {
  message?: string | null
  className?: string
}

export function FieldError({ message, className }: Props) {
  if (!message) return null
  return (
    <div role="alert" aria-live="assertive" className={cn('text-destructive text-sm', className)}>
      {message}
    </div>
  )
}
