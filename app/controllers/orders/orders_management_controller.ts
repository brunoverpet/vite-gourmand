import Order from '#models/order'
import OrderManagementTransformer from '#transformers/orders/order_management_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersManagementController {
  async index({ request, inertia }: HttpContext) {
    const status = request.input('status', '')
    const search = request.input('search', '')
    const page = request.input('page', 1)

    const query = Order.query().preload('user')

    if (status) {
      query.where('status', status)
    }

    if (search) {
      query.whereHas('user', (userQuery) => {
        userQuery
          .whereILike('firstname', `%${search}%`)
          .orWhereILike('lastname', `%${search}%`)
          .orWhereILike('email', `%${search}%`)
      })
    }

    query.orderBy('created_at', 'desc')

    const orders = await query.paginate(page, 20)

    return inertia.render('dashboard/orders/index', {
      orders: OrderManagementTransformer.paginate(orders.all(), orders.getMeta()),
      filters: { status, search },
    })
  }
}
