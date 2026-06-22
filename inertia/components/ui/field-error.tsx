type Props = {
  message?: string | null
}

export function FieldError({ message }: Props) {
  if (!message) return null
  return <div className="text-destructive text-sm">{message}</div>
}
