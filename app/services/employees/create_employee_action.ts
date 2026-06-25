import { Roles } from '#enums/roles'
import EmployeeWelcomeNotification from '#mails/employees/employee_welcome_notification'
import { RoleService } from '#services/shared/role_service'
import { UserService } from '#services/shared/user_service'
import type { AdminCreateEmployePayload } from '#validators/auth/user'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'

@inject()
export class CreateEmployeeAction {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async execute(payload: AdminCreateEmployePayload) {
    const roleId = await this.roleService.getRoleId(Roles.EMPLOYE)
    const password = this.userService.createPassword()
    const employe = await this.userService.createEmploye({ ...payload, password, passwordChange: true }, roleId)

    mail.sendLater(new EmployeeWelcomeNotification(employe))

    return { employe, password }
  }
}
