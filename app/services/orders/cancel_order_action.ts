import { OrderStatus } from '#enums/order_status'
import type Order from '#models/order'
import OrderStatusHistory from '#models/order_status_history'
import { DateTime } from 'luxon'

export class CancelOrderAction {
  async execute(order: Order): Promise<void> {
    if (order.status !== OrderStatus.PENDING) {
      throw new Error('Annulation impossible : la commande a déjà été prise en charge.')
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
