import { AllergenSchema } from '#database/schema'
import Menu from '#models/menu'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Allergen extends AllergenSchema {
  @belongsTo(() => Menu)
  declare menu: BelongsTo<typeof Menu>
}
