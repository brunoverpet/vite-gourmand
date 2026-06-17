import { MenuSchema } from '#database/schema'
import Diet from '#models/diet'
import Theme from '#models/theme'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Menu extends MenuSchema {
  @belongsTo(() => Diet)
  declare diet: BelongsTo<typeof Diet>

  @belongsTo(() => Theme)
  declare theme: BelongsTo<typeof Theme>
}
