import Dish from '#models/dish'
import Menu from '#models/menu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const menu1 = await Menu.findBy('title', 'Menu Noël Classique')
    const dish1 = await Dish.findBy('title', 'Terrine de foie gras')
    const dish2 = await Dish.findBy('title', 'Filet de bœuf bordelais')
    const dish3 = await Dish.findBy('title', 'Panna cotta vanille')

    if (menu1 && dish1 && dish2 && dish3) {
      await menu1?.related('dishes').attach([dish1.id, dish2.id, dish3.id])
    }
  }
}
