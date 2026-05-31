import type { Roles } from '#enums/roles'
import Role from '#models/role'

export class RoleService {
  async getRoleId(label: Roles) {
    const role = await Role.findByOrFail('label', label)
    return role.id
  }
}
