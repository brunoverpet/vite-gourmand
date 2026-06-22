import { Link } from '@inertiajs/react'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '~/lib/order-status'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatDateTime(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

type Order = Data.Orders.ClientOrder

type ShowProps = InertiaProps<{
  order: Order
}>

const ALL_STATUSES = [
  'en_attente',
  'acceptee',
  'en_preparation',
  'en_cours_de_livraison',
  'livree',
  'en_attente_retour_materiel',
  'terminee',
]

export default function MyOrderShow({ order }: ShowProps) {
  const completedStatuses = new Set(order.statusHistory.map((h) => h.status))
  const historyByStatus = Object.fromEntries(order.statusHistory.map((h) => [h.status, h]))

  const relevantStatuses =
    order.materialLoan
      ? ALL_STATUSES
      : ALL_STATUSES.filter((s) => s !== 'en_attente_retour_materiel')

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/my-orders"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Mes commandes
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">Commande {order.orderNumber}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Événement le {formatDate(order.eventDate)}{' '}
          · {order.numberOfPeople} personne(s)
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="border rounded-lg p-4 bg-card space-y-2 text-sm">
        <p className="font-medium mb-3">Récapitulatif</p>
        <div className="flex justify-between text-muted-foreground">
          <span>Adresse</span>
          <span>
            {order.deliveryAddress}, {order.deliveryZipcode} {order.deliveryCity}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Menu</span>
          <span>{order.menuPrice} €</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Livraison</span>
          <span>{order.deliveryFees} €</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total</span>
          <span>{order.totalAmount} €</span>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <p className="font-medium mb-4">Suivi de commande</p>
        <ol className="relative border-l border-border ml-3 space-y-6">
          {relevantStatuses.map((status) => {
            const isDone = completedStatuses.has(status)
            const isCurrent = order.status === status
            const entry = historyByStatus[status]

            return (
              <li key={status} className="ml-6">
                <span
                  className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                    isDone
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? (
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-current" />
                  )}
                </span>

                <div className={`${isCurrent ? 'font-semibold' : ''}`}>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ORDER_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-800'}`}
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
    </div>
  )
}
