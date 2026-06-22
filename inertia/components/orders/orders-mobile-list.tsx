import { formatDate } from '~/lib/format-date'
import { CONTACT_MODE_LABELS } from '~/lib/order-status'
import { CancellationReasonBlock } from '~/components/orders/cancellation-reason-block'
import { MaterialLoanCheckbox } from '~/components/orders/material-loan-checkbox'
import { StatusUpdateForm } from '~/components/orders/status-update-form'
import type { Data } from '@generated/data'

type Order = Data.Orders.OrderManagement

export function OrdersMobileList({ orders }: { orders: Order[] }) {
  return (
    <div className="md:hidden space-y-4">
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm py-8 text-center">Aucune commande trouvée</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-3 bg-card">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm">{order.orderNumber}</p>
                <p className="text-muted-foreground text-xs">
                  {order.user
                    ? `${order.user.firstname} ${order.user.lastname}`
                    : 'Client inconnu'}
                </p>
              </div>
              <StatusUpdateForm order={order} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Événement : {formatDate(order.eventDate)}</span>
              <span className="font-medium text-foreground">{order.totalAmount} €</span>
            </div>
            <MaterialLoanCheckbox order={order} />
            {order.status === 'annulee' && order.cancellationReason && (
              <CancellationReasonBlock
                reason={order.cancellationReason}
                contactModeLabel={order.contactMode ? CONTACT_MODE_LABELS[order.contactMode] : undefined}
                variant="inline"
              />
            )}
          </div>
        ))
      )}
    </div>
  )
}
