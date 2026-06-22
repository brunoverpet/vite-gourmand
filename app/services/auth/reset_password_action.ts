import { UserService } from '#services/shared/user_service'
import { inject } from '@adonisjs/core'

@inject()
export class ResetPasswordAction {
  constructor(private userService: UserService) {}

  async execute(id: string, password: string) {
    await this.userService.updatePassword(id, password)
  }
}
