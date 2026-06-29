type Props = {
  title: string
  description: string
  children?: React.ReactNode
}

export function EmptyState({ title, description, children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <p className="text-h3 text-foreground">{title}</p>
      <p className="text-body text-muted-foreground text-center">{description}</p>
      {children}
    </div>
  )
}
