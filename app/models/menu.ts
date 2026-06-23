import { MenuSchema } from '#database/schema'
import Allergen from '#models/allergen'
import Diet from '#models/diet'
import Dish from '#models/dish'
import Picture from '#models/picture'
import Theme from '#models/theme'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Menu extends MenuSchema {
  @belongsTo(() => Diet)
  declare diet: BelongsTo<typeof Diet>

  @hasMany(() => Allergen)
  declare allergens: HasMany<typeof Allergen>

  @belongsTo(() => Theme)
  declare theme: BelongsTo<typeof Theme>

  @hasMany(() => Picture)
  declare pictures: HasMany<typeof Picture>

  @manyToMany(() => Dish, { pivotTable: 'dish_menus' })
  declare dishes: ManyToMany<typeof Dish>
}
