import { NoticeStatus } from '#enums/notice_status'
import Notice from '#models/notice'
import { OrderService } from '#services/shared/order_service'
import { inject } from '@adonisjs/core'
import type { CreateNoticePayload } from '#validators/notice/notice'

@inject()
export class CreateNoticeAction {
  constructor(private orderService: OrderService) {}

  async execute(userId: string, payload: CreateNoticePayload): Promise<Notice | null> {
    const order = await this.orderService.findCompletedByIdAndUser(payload.order_id, userId)

    if (!order) return null

    const existing = await Notice.findBy('order_id', order.id)
    if (existing) return null

    return Notice.create({
      orderId: order.id,
      note: payload.note,
      description: payload.description,
      status: NoticeStatus.PENDING,
    })
  }
}
