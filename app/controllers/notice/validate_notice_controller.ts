import { ValidateNoticeAction } from '#services/notices/validate_notice_action'
import { NoticeService } from '#services/shared/notice_service'
import NoticeTransformer from '#transformers/notices/notice_transformer'
import { validateNoticeValidator } from '#validators/notice/notice'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ValidateNoticeController {
  constructor(
    private validateNoticeAction: ValidateNoticeAction,
    private noticeService: NoticeService
  ) {}

  async render({ inertia }: HttpContext) {
    const notices = await this.noticeService.getNotices()
    return inertia.render('dashboard/notices/index', {
      notices: async () => NoticeTransformer.transform(notices),
    })
  }

  async handle({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(validateNoticeValidator)

    const notice = await this.validateNoticeAction.execute(payload)

    if (!notice) {
      session.flash('error', 'Avis introuvable ou non éligible.')
      return response.redirect().back()
    }

    session.flash('success', "L'avis a bien été accepté. Il est désormais visible sur le site.")
    return response.redirect().back()
  }
}
