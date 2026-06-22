import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Roles } from '#enums/roles'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, roles: Roles[]) {
    const user = ctx.auth.getUserOrFail()

    if (!roles.includes(user.role.label as Roles)) {
      ctx.session.flash('error', 'Accès non autorisé.')
      return ctx.response.redirect().toRoute('home')
    }

    return next()
  }
}
