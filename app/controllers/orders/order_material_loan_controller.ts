import Order from '#models/order'
import { updateMaterialLoanValidator } from '#validators/orders/order_material_loan'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

const LOCKABLE_STATUSES = ['en_attente_retour_materiel', 'terminee', 'annulee']

@inject()
export default class OrderMaterialLoanController {
  async update({ params, request, response, session }: HttpContext) {
    const order = await Order.findOrFail(params.id)

    if (LOCKABLE_STATUSES.includes(order.status)) {
      session.flash('error', 'Impossible de modifier le prêt matériel à ce stade.')
      return response.redirect().back()
    }

    const { materialLoan } = await request.validateUsing(updateMaterialLoanValidator)
    order.materialLoan = materialLoan
    await order.save()

    return response.redirect().back()
  }
}
