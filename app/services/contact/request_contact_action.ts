import ContactNotification from '#mails/contact/contact_notification'
import type { ContactPayload } from '#validators/contact/contact'
import mail from '@adonisjs/mail/services/main'

export class RequestContactAction {
  async execute(payload: ContactPayload) {
    await mail.send(new ContactNotification(payload))
  }
}
