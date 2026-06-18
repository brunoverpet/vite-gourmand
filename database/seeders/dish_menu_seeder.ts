import { DishTypes } from '#enums/dish_types'
import Dish from '#models/dish'
import Menu from '#models/menu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const menus = await Menu.all()

    const starters = await Dish.query().where('type', DishTypes.STARTER)
    const mains = await Dish.query().where('type', DishTypes.MAIN)
    const desserts = await Dish.query().where('type', DishTypes.DESSERT)

    for (const [index, menu] of menus.entries()) {
      const starter = starters[index % starters.length]
      const main = mains[index % mains.length]
      const dessert = desserts[index % desserts.length]

      await menu.related('dishes').attach([starter.id, main.id, dessert.id])
    }
  }
}
