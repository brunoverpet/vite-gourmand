import { Roles } from '#enums/roles'
import { RoleService } from '#services/role_service'
import { UserService } from '#services/user_service'
import { registerValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RegisterController {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async create({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const userRole = await this.roleService.getRoleId(Roles.USER)

    const user = await this.userService.createUser(payload, userRole)

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
