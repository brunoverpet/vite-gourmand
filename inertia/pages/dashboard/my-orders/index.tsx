import { EmptyOrders } from '~/components/orders/empty-orders'
import { OrderCard } from '~/components/orders/order-card'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

type IndexProps = InertiaProps<{
  orders: Order[]
}>

export default function MyOrdersIndex({ orders }: IndexProps) {
  if (orders.length === 0) return <EmptyOrders />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mes commandes</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} commande(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
