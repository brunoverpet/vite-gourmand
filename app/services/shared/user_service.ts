import { Roles } from '#enums/roles'
import User from '#models/user'
import { RoleService } from '#services/shared/role_service'
import type { AdminCreateEmployePayload, RegisterPayload } from '#validators/auth/user'
import { inject } from '@adonisjs/core'

@inject()
export class UserService {
  constructor(private roleService: RoleService) {}

  async createUser(payload: RegisterPayload, roleId: string) {
    return User.create({ roleId, ...payload })
  }

  async createEmploye(payload: AdminCreateEmployePayload & { password: string }, roleId: string) {
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

  async getEmployees() {
    const employeRoleId = await this.roleService.getRoleId(Roles.EMPLOYE)
    return await User.query().where('roleId', employeRoleId)
  }

  async toggleActive(id: string, isActive: boolean) {
    const user = await this.findById(id)
    user.isActive = isActive
    await user.save()
    return user
  }

  createPassword(): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const all = upper + lower + digits + special

    const rand = (chars: string) => chars[Math.floor(Math.random() * chars.length)]

    const required = [rand(upper), rand(lower), rand(digits), rand(special)]
    const rest = Array.from({ length: 8 }, () => rand(all))

    return [...required, ...rest].sort(() => Math.random() - 0.5).join('')
  }
}
