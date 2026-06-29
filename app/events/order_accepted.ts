import type Order from '#models/order'
import { BaseEvent } from '@adonisjs/core/events'

export default class OrderAccepted extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor(public order: Order) {
    super()
  }
}
