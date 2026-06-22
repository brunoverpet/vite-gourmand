import { OrderStatus } from '#enums/order_status'
import Order from '#models/order'

export class OrderService {
  async findById(id: string) {
    return Order.findOrFail(id)
  }

  async findByIdAndUser(id: string, userId: string) {
    return Order.query().where('id', id).where('user_id', userId).first()
  }

  async findCompletedByIdAndUser(id: string, userId: string) {
    return Order.query()
      .where('id', id)
      .where('user_id', userId)
      .where('status', OrderStatus.COMPLETED)
      .first()
  }
}
