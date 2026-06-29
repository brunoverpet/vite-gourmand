import { Roles } from '#enums/roles'
import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    const adminRole = await Role.findByOrFail('label', Roles.ADMIN)
    const employeRole = await Role.findByOrFail('label', Roles.EMPLOYE)
    const userRole = await Role.findByOrFail('label', Roles.USER)

    await User.updateOrCreateMany('email', [
      {
        email: 'admin@vite-gourmand.fr',
        firstname: 'Julie',
        lastname: 'Admin',
        password: 'Admin1234!',
        roleId: adminRole.id,
        isActive: true,
        passwordChange: true,
        passwordReset: false,
        phone: '+33600000001',
        address: '12 Rue Sainte-Catherine',
        city: 'Bordeaux',
      },
      {
        email: 'employe@vite-gourmand.fr',
        firstname: 'José',
        lastname: 'Employe',
        password: 'Employe1234!',
        roleId: employeRole.id,
        isActive: true,
        passwordChange: true,
        passwordReset: false,
        phone: '+33600000002',
        address: '5 Cours du Médoc',
        city: 'Bordeaux',
      },
      {
        email: 'client@vite-gourmand.fr',
        firstname: 'Jean',
        lastname: 'Client',
        password: 'Client1234!',
        roleId: userRole.id,
        isActive: true,
        passwordChange: false,
        passwordReset: false,
        phone: '+33600000003',
        address: '8 Allée de Tourny',
        city: 'Bordeaux',
      },
    ])
  }
}
