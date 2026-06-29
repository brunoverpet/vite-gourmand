import Allergen from '#models/allergen'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Allergen.updateOrCreateMany('label', [
      { label: 'Gluten' },
      { label: 'Crustacés' },
      { label: 'Œufs' },
      { label: 'Poisson' },
      { label: 'Arachides' },
      { label: 'Soja' },
      { label: 'Lait' },
      { label: 'Fruits à coque' },
      { label: 'Céleri' },
      { label: 'Moutarde' },
      { label: 'Graines de sésame' },
      { label: 'Lupin' },
      { label: 'Mollusques' },
      { label: 'Anhydride sulfureux et sulfites' },
    ])
  }
}
