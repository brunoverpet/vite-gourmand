import type OrderStatusHistory from '#models/order_status_history'
import { BaseTransformer } from '@adonisjs/core/transformers'
import type Order from '#models/order'

export default class ClientOrderTransformer extends BaseTransformer<Order> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'orderNumber',
        'status',
        'eventDate',
        'deliveryAddress',
        'deliveryCity',
        'deliveryZipcode',
        'numberOfPeople',
        'menuPrice',
        'deliveryFees',
        'totalAmount',
        'materialLoan',
      ]),
      statusHistory:
        (
          this.whenLoaded(this.resource.statusHistory) as unknown as OrderStatusHistory[] | undefined
        )?.map((h) => ({
          status: h.status,
          changedAt: h.changedAt,
        })) ?? [],
    }
  }
}
