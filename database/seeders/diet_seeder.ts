import Diet from '#models/diet'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Diet.updateOrCreateMany('label', [
      {
        label: 'Végétarien',
      },
      {
        label: 'Vegan',
      },
      {
        label: 'Classique',
      },
    ])
  }
}
