import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async render({ inertia, request, session }: HttpContext) {
    const intended = request.input('intended')
    if (intended) {
      session.setIntendedUrl(intended)
    }
    return inertia.render('auth/login', {})
  }

  async handle({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)

    if (!user.isActive) {
      session.flash('error', 'Votre compte a été désactivé. Contactez un administrateur.')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    session.flash('info', 'Bienvenue sur votre espace client.')
    return response.redirect().toIntendedRoute('home')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('session.render')
  }
}
