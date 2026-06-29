import mongoose, { Schema, type Document } from 'mongoose'

export interface OrderInterface extends Document {
  orderId: string
  menuId: string
  menuTitle: string
  totalPrice: number
  orderDate: Date
}

const OrderSchema = new Schema<OrderInterface>({
  orderId: { type: String, required: true, unique: true },
  menuId: { type: String, required: true },
  menuTitle: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, required: true },
})

export const OrderStat = mongoose.model<OrderInterface>('OrderStat', OrderSchema)
