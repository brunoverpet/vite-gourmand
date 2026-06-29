import { UserService } from '#services/shared/user_service'
import { resetPasswordValidator } from '#validators/auth/forgot_password'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ChangePasswordController {
  constructor(private userService: UserService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('dashboard/change-password', {})
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const { password } = await request.validateUsing(resetPasswordValidator)
    await this.userService.changePassword(auth.user!.id, password)

    session.flash('success', 'Votre mot de passe a été mis à jour.')
    return response.redirect().toRoute('orders_management.index')
  }
}
