type Props = {
  reason: string
  contactModeLabel?: string
  variant?: 'card' | 'inline'
}

export function CancellationReasonBlock({ reason, contactModeLabel, variant = 'card' }: Props) {
  if (variant === 'inline') {
    return (
      <div className="border-t border-destructive/20 pt-2 text-xs text-muted-foreground">
        {contactModeLabel && (
          <span className="font-medium text-destructive mr-1">{contactModeLabel}</span>
        )}
        {reason}
      </div>
    )
  }

  return (
    <div className="border border-destructive/30 rounded-lg p-4 bg-destructive/5 space-y-1">
      <p className="text-sm font-medium text-destructive">Commande annulée</p>
      <p className="text-sm text-muted-foreground">{reason}</p>
    </div>
  )
}
