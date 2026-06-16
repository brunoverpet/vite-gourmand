import { RequestContactAction } from '#services/contact/request_contact_action'
import { createContactValidator } from '#validators/contact/contact'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContactController {
  constructor(private requestContactAction: RequestContactAction) {}

  render({ inertia }: HttpContext) {
    return inertia.render('public/contact', {})
  }

  async handle({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createContactValidator)

    await this.requestContactAction.execute(payload)
    session.flash(
      'success',
      'Votre demande a bien été envoyé à nos équipes, nous reviendrons sous peu vers vous.'
    )

    return response.redirect().toRoute('contact.render')
  }
}
