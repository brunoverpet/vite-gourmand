import { Link } from '@adonisjs/inertia/react'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { ACCEPTED_AND_BEYOND, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '~/lib/order-status'
import { StatusBadge } from '~/components/ui/status-badge'
import { formatDate } from '~/lib/format-date'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

export function OrderCard({ order }: { order: Order }) {
  const canViewTracking = ACCEPTED_AND_BEYOND.includes(order.status)

  return (
    <Link
      route="client_orders.show"
      routeParams={{ id: order.id }}
      className="border rounded-lg p-4 bg-card space-y-3 flex flex-col hover:border-foreground/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-sm">{order.orderNumber}</p>
        <StatusBadge
          status={order.status}
          labels={ORDER_STATUS_LABELS}
          colors={ORDER_STATUS_COLORS}
        />
      </div>

      <div className="space-y-1.5 text-sm grow">
        <div className="flex items-center gap-2 text-foreground">
          <CalendarDays className="w-4 h-4 shrink-0 text-muted-foreground" />
          <span>
            Événement le <span className="font-medium">{formatDate(order.eventDate)}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4 shrink-0" />
          <span>{order.numberOfPeople} personne(s)</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{order.deliveryAddress}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <div>
          <span className="font-semibold">{order.totalAmount} €</span>
          <span className="text-xs text-muted-foreground ml-2">
            Commandé le{' '}
            {formatDate(order.orderDate, { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <span className="text-xs text-primary shrink-0">
          {canViewTracking ? 'Suivre ma commande →' : 'Voir la commande →'}
        </span>
      </div>
    </Link>
  )
}
