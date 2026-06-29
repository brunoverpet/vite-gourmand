import env from '#start/env'
import type { ContactPayload } from '#validators/contact/contact'
import { BaseMail } from '@adonisjs/mail'

export default class ContactNotification extends BaseMail {
  constructor(private payload: ContactPayload) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to(env.get('MAIL_FROM_ADDRESS'))
      .replyTo(this.payload.email)
      .subject(`Nouveau message de contact : ${this.payload.title}`)
      .htmlView('emails/contact/contact_notification', {
        title: this.payload.title,
        description: this.payload.description,
        visitorEmail: this.payload.email,
      })
  }
}
