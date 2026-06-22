import { Roles } from '#enums/roles'
import Order from '#models/order'
import { UpdateOrderStatusAction } from '#services/orders/update_order_status_action'
import { updateOrderStatusValidator } from '#validators/orders/order_status'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrderStatusController {
  constructor(private updateOrderStatusAction: UpdateOrderStatusAction) {}

  async update({ params, request, response, session, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load('role')

    if (user.role.label !== Roles.EMPLOYE && user.role.label !== Roles.ADMIN) {
      session.flash('error', 'Accès non autorisé.')
      return response.redirect().back()
    }

    const order = await Order.findOrFail(params.id)
    const { status } = await request.validateUsing(updateOrderStatusValidator)

    try {
      await this.updateOrderStatusAction.execute(order, status)
      session.flash('success', 'Statut mis à jour.')
    } catch (error) {
      session.flash('error', error instanceof Error ? error.message : 'Erreur inattendue.')
    }

    return response.redirect().back()
  }
}
