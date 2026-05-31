import { Roles } from '#enums/roles'
import WelcomeNotification from '#mails/auth/welcome_notification'
import type User from '#models/user'
import { UserService } from '#services/auth/user_service'
import { RoleService } from '#services/shared/role_service'
import { RegisterPayload } from '#validators/auth/user'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'

@inject()
export class RegisterFlowService {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async execute(payload: RegisterPayload): Promise<User> {
    const userRole = await this.roleService.getRoleId(Roles.USER)

    const user = await this.userService.createUser(payload, userRole)

    await mail.sendLater(new WelcomeNotification(user))

    return user
  }
}
