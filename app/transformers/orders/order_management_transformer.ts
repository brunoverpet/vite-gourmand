import { BaseTransformer } from '@adonisjs/core/transformers'
import type Order from '#models/order'

export default class OrderManagementTransformer extends BaseTransformer<Order> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'orderNumber',
        'status',
        'eventDate',
        'totalAmount',
        'materialLoan',
        'contactMode',
        'cancellationReason',
      ]),
      user: this.whenLoaded(this.resource.user)
        ? {
            id: this.resource.user.id,
            firstname: this.resource.user.firstname,
            lastname: this.resource.user.lastname,
            email: this.resource.user.email,
            phone: this.resource.user.phone,
          }
        : null,
    }
  }
}
