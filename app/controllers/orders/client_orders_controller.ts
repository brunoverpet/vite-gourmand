import Order from '#models/order'
import Notice from '#models/notice'
import { CancelOrderAction } from '#services/orders/cancel_order_action'
import { UpdateOrderAction } from '#services/orders/update_order_action'
import ClientOrderTransformer from '#transformers/orders/client_order_transformer'
import { updateOrderValidator } from '#validators/orders/order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClientOrdersController {
  constructor(
    private updateOrderAction: UpdateOrderAction,
    private cancelOrderAction: CancelOrderAction
  ) {}

  async index({ auth, inertia }: HttpContext) {
    const userId = auth.getUserOrFail().id

    const orders = await Order.query().where('user_id', userId).orderBy('created_at', 'desc')

    return inertia.render('dashboard/my-orders/index', {
      orders: async () => ClientOrderTransformer.transform(orders),
    })
  }

  async show({ auth, params, inertia, response, session }: HttpContext) {
    const userId = auth.getUserOrFail().id

    const order = await Order.query()
      .where('id', params.id)
      .where('user_id', userId)
      .preload('statusHistory', (q) => q.orderBy('changed_at', 'asc'))
      .preload('menu')
      .first()

    if (!order) {
      session.flash('error', 'Commande introuvable.')
      return response.redirect().toRoute('client_orders.index')
    }

    const notice = await Notice.findBy('order_id', order.id)

    return inertia.render('dashboard/my-orders/show', {
      order: async () => ClientOrderTransformer.transform(order),
      hasNotice: !!notice,
    })
  }

  async update({ auth, params, request, response, session }: HttpContext) {
    const userId = auth.getUserOrFail().id

    const order = await Order.query().where('id', params.id).where('user_id', userId).first()

    if (!order) {
      session.flash('error', 'Commande introuvable.')
      return response.redirect().toRoute('client_orders.index')
    }

    const payload = await request.validateUsing(updateOrderValidator)

    await this.updateOrderAction.execute(order, payload)
    session.flash('success', 'Commande mise à jour.')

    return response.redirect().back()
  }

  async cancel({ auth, params, response, session }: HttpContext) {
    const userId = auth.getUserOrFail().id

    const order = await Order.query().where('id', params.id).where('user_id', userId).first()

    if (!order) {
      session.flash('error', 'Commande introuvable.')
      return response.redirect().toRoute('client_orders.index')
    }

    await this.cancelOrderAction.execute(order)
    session.flash('success', 'Commande annulée.')

    return response.redirect().toPath('/dashboard/my-orders')
  }
}
