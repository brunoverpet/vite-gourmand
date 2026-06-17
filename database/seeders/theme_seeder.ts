import Theme from '#models/theme'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Theme.updateOrCreateMany('label', [
      {
        label: 'Noël',
      },
      {
        label: 'Pâques',
      },
      {
        label: 'Classique',
      },
      {
        label: 'Évènement',
      },
    ])
  }
}
