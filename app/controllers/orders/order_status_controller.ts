import Order from '#models/order'
import { UpdateOrderStatusAction } from '#services/orders/update_order_status_action'
import { updateOrderStatusValidator } from '#validators/orders/order_status'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrderStatusController {
  constructor(private updateOrderStatusAction: UpdateOrderStatusAction) {}

  async update({ params, request, response, session }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    const { status } = await request.validateUsing(updateOrderStatusValidator)

    await this.updateOrderStatusAction.execute(order, status)
    session.flash('success', 'Statut mis à jour.')

    return response.redirect().back()
  }
}
