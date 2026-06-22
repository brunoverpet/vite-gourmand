import { updateProfileValidator } from '#validators/auth/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ inertia }: HttpContext) {
    return inertia.render('dashboard/profile/index', {})
  }

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(updateProfileValidator, {
      meta: { userId: user.id },
    })

    user.firstname = payload.firstname
    user.lastname = payload.lastname
    user.email = payload.email
    user.phone = payload.phone
    user.address = payload.address
    user.city = payload.city

    await user.save()

    session.flash('success', 'Profil mis à jour.')
    return response.redirect().back()
  }
}
