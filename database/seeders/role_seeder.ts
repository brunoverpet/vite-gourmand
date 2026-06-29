import { Roles } from '#enums/roles'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.updateOrCreateMany(
      'label',
      Object.values(Roles).map((label) => ({ label }))
    )
  }
}
