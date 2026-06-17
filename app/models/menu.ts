import { MenuSchema } from '#database/schema'
import Diet from '#models/diet'
import Dish from '#models/dish'
import Theme from '#models/theme'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Menu extends MenuSchema {
  @belongsTo(() => Diet)
  declare diet: BelongsTo<typeof Diet>

  @belongsTo(() => Theme)
  declare theme: BelongsTo<typeof Theme>

  @manyToMany(() => Dish, { pivotTable: 'dish_menus' })
  declare dishes: ManyToMany<typeof Dish>
}
