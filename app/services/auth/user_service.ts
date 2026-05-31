import User from '#models/user'
import type { RegisterPayload } from '#validators/auth/user'

export class UserService {
  async createUser(payload: RegisterPayload, roleId: string) {
    return User.create({ roleId, ...payload })
  }
}
