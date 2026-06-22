import { inject } from '@adonisjs/core'
import type { ValidateNoticePayload } from '#validators/notice/notice'
import { NoticeService } from '#services/shared/notice_service'
import mail from '@adonisjs/mail/services/main'
import NoticeValidateNotification from '#mails/notices/notice_validate_notification'

@inject()
export class ValidateNoticeAction {
  constructor(private noticeService: NoticeService) {}

  async execute(payload: ValidateNoticePayload) {
    const notice = await this.noticeService.findNoticeById(payload.notice_id)

    notice.status = payload.status
    await notice.load('order', (q) => q.preload('user'))
    await notice.save()

    mail.sendLater(new NoticeValidateNotification(notice))

    return notice
  }
}
