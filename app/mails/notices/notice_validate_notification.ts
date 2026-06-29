import { NoticeStatus } from '#enums/notice_status'
import env from '#start/env'
import type Notice from '#models/notice'
import { BaseMail } from '@adonisjs/mail'

export default class NoticeValidateNotification extends BaseMail {
  constructor(private notice: Notice) {
    super()
  }

  prepare() {
    const user = this.notice.order.user
    const isApproved = this.notice.status === NoticeStatus.APPROVED

    this.message
      .to(user.email)
      .subject(
        isApproved
          ? 'Votre avis a été publié — Vite & Gourmand'
          : "Votre avis n'a pas pu être publié — Vite & Gourmand"
      )
      .htmlView('emails/notices/notice_validate_notification', {
        appUrl: env.get('APP_URL'),
        user,
        isApproved,
      })
  }
}
