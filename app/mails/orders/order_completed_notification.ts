import type Order from '#models/order'
import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class OrderCompletedNotification extends BaseMail {
  constructor(private order: Order) {
    super()
  }

  prepare() {
    this.message
      .to(this.order.user.email)
      .subject(`Votre commande est terminée — Vite & Gourmand`)
      .htmlView('emails/orders/order_completed', {
        appUrl: env.get('APP_URL'),
        order: this.order,
      })
  }
}
