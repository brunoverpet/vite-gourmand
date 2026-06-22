import { OrderSchema } from '#database/schema'
import OrderStatusHistory from '#models/order_status_history'
import User from '#models/user'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Order extends OrderSchema {
  @hasMany(() => OrderStatusHistory)
  declare statusHistory: HasMany<typeof OrderStatusHistory>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
