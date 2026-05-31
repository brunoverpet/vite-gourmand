import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class WelcomeNotification extends BaseMail {
  constructor(private user: User) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to(this.user.email)
      .subject('Bienvenue chez Vite & Gourmand')
      .htmlView('emails/auth/welcome', { user: this.user })
  }
}
