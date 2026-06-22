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
        'orderDate',
        'eventDate',
        'deliveryAddress',
        'deliveryCity',
        'deliveryZipcode',
        'deliveryTime',
        'numberOfPeople',
        'menuPrice',
        'deliveryFees',
        'totalAmount',
        'materialLoan',
      ]),
      menuMinPeople: this.resource.$preloaded['menu'] ? this.resource.menu.minPeople : null,
      statusHistory: this.resource.$preloaded['statusHistory']
        ? (this.resource.statusHistory as unknown as OrderStatusHistory[]).map((h) => ({
            status: h.status,
            changedAt: h.changedAt,
          }))
        : [],
    }
  }
}
