import { CancelOrderAction } from '#services/orders/cancel_order_action'
import { cancelOrderValidator } from '#validators/orders/cancel_order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

@inject()
export default class CancelOrderController {
  constructor(private cancelOrderAction: CancelOrderAction) {}

  async handle({ params, request, response, session }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    const { contactMode, cancellationReason } = await request.validateUsing(cancelOrderValidator)

    await this.cancelOrderAction.execute(order, {
      contactMode,
      cancellationReason,
    })

    session.flash('success', 'Commande annulée.')
    return response.redirect().back()
  }
}
