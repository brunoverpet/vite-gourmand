import User from '#models/user'
import type { RegisterPayload } from '#validators/auth/user'

export class UserService {
  async createUser(payload: RegisterPayload, roleId: string) {
    return User.create({ roleId, ...payload })
  }

  async findByEmail(email: string) {
    return User.findBy('email', email)
  }

  async updatePassword(id: string, password: string) {
    const user = await User.findBy('id', id)
    if (!user) return null

    user.password = password
    await user.save()

    return true
  }
}
