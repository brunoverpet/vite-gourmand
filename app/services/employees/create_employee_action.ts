import { Roles } from '#enums/roles'
import { RoleService } from '#services/shared/role_service'
import { UserService } from '#services/shared/user_service'
import type { AdminCreateEmployePayload } from '#validators/auth/user'
import { inject } from '@adonisjs/core'

@inject()
export class CreateEmployeeAction {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async execute(payload: AdminCreateEmployePayload) {
    const roleId = await this.roleService.getRoleId(Roles.EMPLOYE)
    const password = this.userService.createPassword()
    const employe = await this.userService.createEmploye({ ...payload, password }, roleId)

    return { employe, password }
  }
}
