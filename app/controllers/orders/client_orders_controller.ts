import Order from '#models/order'
import ClientOrderTransformer from '#transformers/orders/client_order_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClientOrdersController {
  async index({ auth, inertia }: HttpContext) {
    const userId = auth.getUserOrFail().id

    const orders = await Order.query()
      .where('user_id', userId)
      .orderBy('created_at', 'desc')

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
      .first()

    if (!order) {
      session.flash('error', 'Commande introuvable.')
      return response.redirect().toRoute('home')
    }

    return inertia.render('dashboard/my-orders/show', {
      order: async () => ClientOrderTransformer.transform(order),
    })
  }
}
