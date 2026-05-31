import User from '#models/user'
import type { SignupValidatorType } from '#validators/user'

export class UserService {
  async createUser(payload: SignupValidatorType, roleId: string) {
    return User.create({ roleId, ...payload })
  }
}
