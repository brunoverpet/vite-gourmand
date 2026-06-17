import { DishSchema } from '#database/schema'
import Allergen from '#models/allergen'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Dish extends DishSchema {
  @manyToMany(() => Allergen, { pivotTable: 'dish_allergens' })
  declare allergens: ManyToMany<typeof Allergen>
}
