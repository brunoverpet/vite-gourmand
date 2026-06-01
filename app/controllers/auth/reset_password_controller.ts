import { ResetPasswordAction } from '#services/auth/reset_password_action'
import { resetPasswordValidator } from '#validators/auth/forgot_password'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ResetPasswordController {
  constructor(private resetPasswordAction: ResetPasswordAction) {}

  async show({ request, response, inertia }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Ce lien est invalide ou a expiré.')
    }

    const id = request.param('id')
    return inertia.render('auth/reset_password', { id })
  }

  async handle({ request, response, session }: HttpContext) {
    const id = request.param('id')
    const { password } = await request.validateUsing(resetPasswordValidator)
    await this.resetPasswordAction.execute(id, password)

    session.flash('success', 'Votre mot de passe a été modifié.')

    return response.redirect().toRoute('session.create')
  }
}
