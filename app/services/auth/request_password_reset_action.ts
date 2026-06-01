import ForgotPasswordNotification from '#mails/auth/forgot_password_notification'
import { UserService } from '#services/auth/user_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { signedUrlFor } from '@adonisjs/core/services/url_builder'
import mail from '@adonisjs/mail/services/main'

@inject()
export class RequestPasswordResetAction {
  constructor(private userService: UserService) {}

  async execute(email: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) return

    const signedUrl = signedUrlFor(
      'reset_password.show',
      { id: user.id },
      {
        prefixUrl: env.get('APP_URL'),
        expiresIn: '15min',
        qs: {
          password: user.password,
        },
      }
    )

    await mail.send(new ForgotPasswordNotification(user, signedUrl))
  }
}
