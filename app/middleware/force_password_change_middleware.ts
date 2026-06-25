import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const EXCLUDED_PATHS = ['/dashboard/change-password', '/logout']

export default class ForcePasswordChangeMiddleware {
  async handle({ auth, response, request }: HttpContext, next: NextFn) {
    const user = auth.user

    if (user?.passwordChange && !EXCLUDED_PATHS.includes(request.url())) {
      return response.redirect().toRoute('dashboard.change-password')
    }

    return next()
  }
}
