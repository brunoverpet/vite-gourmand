import { BaseTransformer } from '@adonisjs/core/transformers'
import type Notice from '#models/notice'

export default class NoticeTransformer extends BaseTransformer<Notice> {
  toObject() {
    const order = this.resource.$preloaded['order'] ? this.resource.order : null

    return {
      id: this.resource.id,
      note: this.resource.note,
      description: this.resource.description,
      status: this.resource.status,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      order: order
        ? {
            orderNumber: order.orderNumber,
            user: order.$preloaded['user']
              ? {
                  firstname: order.user.firstname,
                  lastname: order.user.lastname,
                  email: order.user.email,
                }
              : null,
          }
        : null,
    }
  }
}
