import { OrderStatusHistorySchema } from '#database/schema'
import Order from '#models/order'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrderStatusHistory extends OrderStatusHistorySchema {
  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
