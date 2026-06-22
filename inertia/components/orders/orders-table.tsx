import React from 'react'
import { formatDate } from '~/lib/format-date'
import { CONTACT_MODE_LABELS } from '~/lib/order-status'
import { MaterialLoanCheckbox } from '~/components/orders/material-loan-checkbox'
import { StatusUpdateForm } from '~/components/orders/status-update-form'
import type { Data } from '@generated/data'

type Order = Data.Orders.OrderManagement

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-3 font-medium">N° commande</th>
            <th className="text-left px-4 py-3 font-medium">Client</th>
            <th className="text-left px-4 py-3 font-medium">Date événement</th>
            <th className="text-left px-4 py-3 font-medium">Montant</th>
            <th className="text-left px-4 py-3 font-medium">Matériel</th>
            <th className="text-left px-4 py-3 font-medium">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                Aucune commande trouvée
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    {order.user ? (
                      <div>
                        <p className="font-medium">
                          {order.user.firstname} {order.user.lastname}
                        </p>
                        <p className="text-muted-foreground text-xs">{order.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(order.eventDate)}</td>
                  <td className="px-4 py-3 font-medium">{order.totalAmount} €</td>
                  <td className="px-4 py-3">
                    <MaterialLoanCheckbox order={order} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusUpdateForm order={order} />
                  </td>
                </tr>
                {order.status === 'annulee' && order.cancellationReason && (
                  <tr className="bg-destructive/5">
                    <td colSpan={6} className="px-4 py-2 text-xs text-muted-foreground">
                      <span className="font-medium text-destructive mr-2">
                        {order.contactMode ? CONTACT_MODE_LABELS[order.contactMode] : '—'}
                      </span>
                      {order.cancellationReason}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
