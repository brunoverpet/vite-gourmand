import { Link } from '@inertiajs/react'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import {
  ACCEPTED_AND_BEYOND,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from '~/lib/order-status'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

type IndexProps = InertiaProps<{
  orders: Order[]
}>

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-800'}`}
    >
      {ORDER_STATUS_LABELS[status] ?? status}
    </span>
  )
}

function formatDate(date: string | null, opts?: Intl.DateTimeFormatOptions) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', opts ?? { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function MyOrdersIndex({ orders }: IndexProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-lg font-medium">Aucune commande</p>
        <p className="text-muted-foreground text-sm text-center">
          Vous n&apos;avez pas encore passé de commande.
        </p>
        <Link
          href="/menus"
          className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          Voir nos menus
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mes commandes</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} commande(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => {
          const canViewTracking = ACCEPTED_AND_BEYOND.includes(order.status)

          return (
            <div key={order.id} className="border rounded-lg p-4 bg-card space-y-3 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{order.orderNumber}</p>
                <StatusBadge status={order.status} />
              </div>

              <div className="space-y-1.5 text-sm grow">
                <div className="flex items-center gap-2 text-foreground">
                  <CalendarDays className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span>
                    Événement le{' '}
                    <span className="font-medium">{formatDate(order.eventDate)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>{order.numberOfPeople} personne(s)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>
                    {order.deliveryAddress}, {order.deliveryCity} {order.deliveryZipcode}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border">
                <div>
                  <span className="font-semibold">{order.totalAmount} €</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Commandé le {formatDate(order.orderDate, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {canViewTracking ? (
                  <Link
                    href={`/dashboard/my-orders/${order.id}`}
                    className="text-sm text-primary underline underline-offset-2 shrink-0"
                  >
                    Suivre ma commande
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground shrink-0">
                    Suivi dès validation
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
