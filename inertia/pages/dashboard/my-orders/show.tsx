import { Link } from '@adonisjs/inertia/react'
import { OrderActions } from '~/components/orders/order-actions'
import { OrderRecap } from '~/components/orders/order-recap'
import { OrderTimeline } from '~/components/orders/order-timeline'
import { ReviewForm } from '~/components/orders/review-form'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

type ShowProps = InertiaProps<{
  order: Order
  hasNotice: boolean
}>

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function MyOrderShow({ order, hasNotice }: ShowProps) {
  const isPending = order.status === 'en_attente'
  const isDone = order.status === 'terminee'

  return (
    <div className="space-y-8 max-w-5xl">
      <Link
        route="client_orders.index"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Mes commandes
      </Link>

      <div>
        <h1 className="text-2xl font-semibold">Commande {order.orderNumber}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Événement le {formatDate(order.eventDate)} · {order.numberOfPeople} personne(s)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {isPending && <OrderActions order={order} />}
          <OrderRecap order={order} />
          {isDone && (
            <div className="border rounded-lg p-4 bg-card space-y-4">
              <p className="font-medium text-sm">Votre avis</p>
              {hasNotice ? (
                <p className="text-sm text-muted-foreground">
                  Merci pour votre avis ! Il sera visible sur le site après validation.
                </p>
              ) : (
                <ReviewForm orderId={order.id} />
              )}
            </div>
          )}
        </div>

        <OrderTimeline order={order} />
      </div>
    </div>
  )
}
