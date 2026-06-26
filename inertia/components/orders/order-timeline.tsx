import { Check } from 'lucide-react'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '~/lib/order-status'
import { formatDateTime } from '~/lib/format-date'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

const ALL_STATUSES = [
  'en_attente',
  'acceptee',
  'en_preparation',
  'en_cours_de_livraison',
  'livree',
  'en_attente_retour_materiel',
  'terminee',
]

export function OrderTimeline({ order }: { order: Order }) {
  const completedStatuses = new Set(order.statusHistory.map((h) => h.status))
  const historyByStatus = Object.fromEntries(order.statusHistory.map((h) => [h.status, h]))

  const isCancelled = order.status === 'annulee'

  const relevantStatuses = isCancelled
    ? [...ALL_STATUSES.filter((s) => completedStatuses.has(s) && s !== 'annulee'), 'annulee']
    : order.materialLoan
      ? ALL_STATUSES
      : ALL_STATUSES.filter((s) => s !== 'en_attente_retour_materiel')

  return (
    <div>
      <h3 className="font-medium mb-4">Suivi de commande</h3>
      <ol className="relative border-l border-border ml-3 space-y-6">
        {relevantStatuses.map((status) => {
          const isDone = completedStatuses.has(status)
          const isCurrent = order.status === status
          const entry = historyByStatus[status]

          return (
            <li key={status} className="ml-6">
              <span
                className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground ring-primary/20'
                    : isDone
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground/40'
                }`}
              >
                {isCurrent ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground animate-pulse" />
                ) : isDone ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
              </span>

              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : isDone
                        ? (ORDER_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-800')
                        : 'bg-muted text-muted-foreground/40'
                  }`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </span>
                {entry && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDateTime(entry.changedAt)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
