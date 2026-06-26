import type OrderAccepted from '#events/order_accepted'
import { OrderStat } from '../mongodb/order_stat.js'

export default class SyncOrderToMongo {
  handle(event: OrderAccepted) {
    if (!event.order.menuId) return

    OrderStat.create({
      orderId: event.order.id,
      menuId: event.order.menuId,
      menuTitle: event.order.menu.title,
      totalPrice: Number(event.order.totalAmount),
      orderDate: event.order.orderDate.toJSDate()
    })
  }
} 
