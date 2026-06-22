import { OrderStatus } from '#enums/order_status'
import type Order from '#models/order'
import OrderStatusHistory from '#models/order_status_history'
import OrderCompletedNotification from '#mails/orders/order_completed_notification'
import OrderMaterialReturnNotification from '#mails/orders/order_material_return_notification'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.CANCELLED],
  [OrderStatus.ACCEPTED]: [OrderStatus.IN_PREPARATION],
  [OrderStatus.IN_PREPARATION]: [OrderStatus.IN_DELIVERY],
  [OrderStatus.IN_DELIVERY]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [OrderStatus.AWAITING_MATERIAL_RETURN, OrderStatus.COMPLETED],
  [OrderStatus.AWAITING_MATERIAL_RETURN]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
}

export class UpdateOrderStatusAction {
  async execute(order: Order, newStatus: OrderStatus): Promise<void> {
    const currentStatus = order.status as OrderStatus
    const allowed = TRANSITIONS[currentStatus] ?? []

    if (!allowed.includes(newStatus)) {
      throw new Error(`Transition interdite : ${currentStatus} → ${newStatus}`)
    }

    if (newStatus === OrderStatus.AWAITING_MATERIAL_RETURN && !order.materialLoan) {
      throw new Error('Ce statut requiert un prêt de matériel (material_loan = true)')
    }

    if (
      newStatus === OrderStatus.COMPLETED &&
      currentStatus === OrderStatus.DELIVERED &&
      order.materialLoan
    ) {
      throw new Error(
        'Une commande avec prêt de matériel doit passer par "en attente retour matériel" avant d\'être terminée.'
      )
    }

    order.status = newStatus
    await order.save()

    await OrderStatusHistory.create({
      orderId: order.id,
      status: newStatus,
      changedAt: DateTime.now(),
    })

    if (newStatus === OrderStatus.AWAITING_MATERIAL_RETURN) {
      await order.load('user')
      mail.sendLater(new OrderMaterialReturnNotification(order))
    }

    if (newStatus === OrderStatus.COMPLETED) {
      await order.load('user')
      mail.sendLater(new OrderCompletedNotification(order))
    }
  }
}
