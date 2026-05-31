import { RegisterFlowService } from '#services/auth/register_flow_service'
import { registerValidator } from '#validators/auth/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RegisterController {
  constructor(private registerFlow: RegisterFlowService) {}

  async create({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.registerFlow.execute(payload)

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
