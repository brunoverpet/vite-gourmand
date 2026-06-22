import { cn } from '~/lib/utils'

type Props = {
  message?: string | null
  className?: string
}

export function FieldError({ message, className }: Props) {
  if (!message) return null
  return <div className={cn('text-destructive text-sm', className)}>{message}</div>
}
