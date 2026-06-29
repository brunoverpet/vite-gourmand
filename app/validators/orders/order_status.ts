import { OrderStatus } from '#enums/order_status'
import vine from '@vinejs/vine'

export const updateOrderStatusValidator = vine.create({
  status: vine.enum(OrderStatus),
})
