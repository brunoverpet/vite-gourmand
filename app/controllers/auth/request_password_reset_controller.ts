import { RequestPasswordResetAction } from '#services/auth/request_password_reset_action'
import { forgotPasswordValidator } from '#validators/auth/forgot_password'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RequestPasswordResetController {
  constructor(private requestPasswordResetAction: RequestPasswordResetAction) {}

  show({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password', {})
  }

  async handle({ request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)
    await this.requestPasswordResetAction.execute(email)

    session.flash(
      'info',
      'Si cet e-mail correspond à un compte, un lien de réinitialisation vous a été envoyé.'
    )

    return response.redirect().toRoute('session.render')
  }
}
