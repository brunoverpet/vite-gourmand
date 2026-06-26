import { updateProfileValidator, updatePasswordProfileValidator } from '#validators/auth/user'
import hash from '@adonisjs/core/services/hash'
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

  async updatePassword({ auth, request, response, session }: HttpContext) {
    const user = auth.getUserOrFail()

    const { currentPassword, password } = await request.validateUsing(
      updatePasswordProfileValidator
    )

    const isValid = await hash.verify(user.password, currentPassword)
    if (!isValid) {
      session.flash('errors', { currentPassword: 'Mot de passe actuel incorrect.' })
      return response.redirect().back()
    }

    user.password = password
    await user.save()

    session.flash('success', 'Mot de passe mis à jour.')
    return response.redirect().back()
  }
}
