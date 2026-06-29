import type Order from '#models/order'
import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class OrderConfirmationNotification extends BaseMail {
  constructor(private order: Order) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to(this.order.user.email)
      .subject(`Votre commande a bien été reçue — Vite & Gourmand`)
      .htmlView('emails/orders/order_confirmation', {
        appUrl: env.get('APP_URL'),
        order: this.order,
        formattedEventDate: this.order.eventDate.setLocale('fr').toFormat('d MMMM yyyy'),
      })
  }
}
