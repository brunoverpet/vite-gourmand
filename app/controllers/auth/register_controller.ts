import { RegisterAction } from '#services/auth/register_action'
import { registerValidator } from '#validators/auth/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RegisterController {
  constructor(private registerAction: RegisterAction) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async handle({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    await this.registerAction.execute(payload)
    session.flash(
      'success',
      'Votre inscription à bien été prise enregistré, vous pouvez vous connecter.'
    )

    return response.redirect().toRoute('session.render')
  }
}
