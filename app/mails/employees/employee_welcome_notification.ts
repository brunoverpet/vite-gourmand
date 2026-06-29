import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class EmployeeWelcomeNotification extends BaseMail {
  constructor(private employe: User) {
    super()
  }

  prepare() {
    this.message
      .to(this.employe.email)
      .subject('Votre compte employé Vite & Gourmand a été créé')
      .htmlView('emails/employees/welcome', { employe: this.employe })
  }
}
