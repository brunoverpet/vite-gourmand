import type Order from '#models/order'
import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class OrderMaterialReturnNotification extends BaseMail {
  constructor(private order: Order) {
    super()
  }

  prepare() {
    this.message
      .to(this.order.user.email)
      .subject(`Retour du matériel prêté — Vite & Gourmand`)
      .htmlView('emails/orders/order_material_return_reminder', {
        appUrl: env.get('APP_URL'),
        order: this.order,
      })
  }
}
