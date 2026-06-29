import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class ForgotPasswordNotification extends BaseMail {
  constructor(
    private user: User,
    private signedUrl: string
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to(this.user.email)
      .subject('Demande réinitialisation de mot de passe')
      .htmlView('emails/auth/forgot_password', { user: this.user, signedUrl: this.signedUrl })
  }
}
