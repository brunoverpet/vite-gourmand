import { CreateNoticeAction } from '#services/notice/create_notice_action'
import { createNoticeValidator } from '#validators/notice/notice'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NoticesController {
  constructor(private createNoticeAction: CreateNoticeAction) {}

  async handle({ auth, request, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createNoticeValidator)

    const notice = await this.createNoticeAction.execute(user.id, payload)

    if (!notice) {
      session.flash('error', 'Commande introuvable ou non éligible.')
      return response.redirect().back()
    }

    session.flash('success', 'Votre avis a bien été envoyé. Il sera visible après validation.')
    return response.redirect().back()
  }
}
