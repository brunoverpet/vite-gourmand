import type { ContactMode } from '#enums/contact_mode'
import { OrderStatus } from '#enums/order_status'
import type Order from '#models/order'
import OrderStatusHistory from '#models/order_status_history'
import { DateTime } from 'luxon'

const TERMINAL_STATUSES = [OrderStatus.COMPLETED, OrderStatus.CANCELLED]

type EmployeePayload = {
  contactMode: ContactMode
  cancellationReason: string
}

export class CancelOrderAction {
  async execute(order: Order, employeePayload?: EmployeePayload): Promise<void> {
    if (!employeePayload && order.status !== OrderStatus.PENDING) {
      throw new Error('Annulation impossible : la commande a déjà été prise en charge.')
    }

    if (TERMINAL_STATUSES.includes(order.status as OrderStatus)) {
      throw new Error('Annulation impossible : la commande est déjà terminée ou annulée.')
    }

    if (employeePayload) {
      order.contactMode = employeePayload.contactMode
      order.cancellationReason = employeePayload.cancellationReason
    }

    order.status = OrderStatus.CANCELLED
    await order.save()

    await OrderStatusHistory.create({
      orderId: order.id,
      status: OrderStatus.CANCELLED,
      changedAt: DateTime.now(),
    })

    await order.load('menu')
    order.menu.stock += 1
    await order.menu.save()
  }
}
