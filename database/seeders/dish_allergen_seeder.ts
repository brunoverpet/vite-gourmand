import Allergen from '#models/allergen'
import Dish from '#models/dish'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const dishes = await Dish.all()
    const allergens = await Allergen.all()

    for (const dish of dishes) {
      const shuffled = allergens.sort(() => Math.random() - 0.5)
      const picked = shuffled.slice(0, Math.floor(Math.random() * 3) + 1)
      await dish.related('allergens').attach(picked.map((a) => a.id))
    }
  }
}
