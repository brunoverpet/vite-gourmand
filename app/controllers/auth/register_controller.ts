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

  async handle({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.registerAction.execute(payload)

    await auth.use('web').login(user)
    return response.redirect().toRoute('home')
  }
}
