/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  homePublic: typeof routes['home-public']
  contact: typeof routes['contact'] & {
    render: typeof routes['contact.render']
  }
  register: {
    create: typeof routes['register.create']
    store: typeof routes['register.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  requestPasswordReset: typeof routes['request_password_reset'] & {
    show: typeof routes['request_password_reset.show']
  }
  resetPassword: typeof routes['reset_password'] & {
    show: typeof routes['reset_password.show']
  }
  home: typeof routes['home']
}
