import User from '#models/user'
import type { RegisterPayload } from '#validators/auth/user'

export class UserService {
  async createUser(payload: RegisterPayload, roleId: string) {
    return User.create({ roleId, ...payload })
  }

  async findByEmail(email: string) {
    return User.findBy('email', email)
  }

  async findById(id: string) {
    return User.findOrFail(id)
  }

  async updatePassword(id: string, password: string) {
    const user = await this.findById(id)

    user.password = password
    await user.save()

    return true
  }

  async updateProfil(id: string, payload: any) {
    const user = await this.findById(id)
    user.merge(payload)
    await user.save()
  }
}
