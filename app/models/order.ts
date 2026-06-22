import { OrderSchema } from '#database/schema'
import OrderStatusHistory from '#models/order_status_history'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Order extends OrderSchema {
  @hasMany(() => OrderStatusHistory)
  declare statusHistory: HasMany<typeof OrderStatusHistory>
}
