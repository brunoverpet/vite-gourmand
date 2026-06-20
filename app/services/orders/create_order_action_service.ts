import { OrderStatus } from '#enums/order_status'
import Order from '#models/order'
import { DeliveryFeeService } from '#services/shared/delivery_fee_service'
import { PriceCalculatorService } from '#services/shared/price_calculator_service'
import type { CreateOrderPayload } from '#validators/order/order'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export class CreateOrderActionService {
  constructor(
    private deliveryFeeService: DeliveryFeeService,
    private priceCalculatorService: PriceCalculatorService
  ) {}

  async execute(
    payload: CreateOrderPayload,
    userId: string,
    pricePerPeople: number,
    min_people: number
  ) {
    const finalPrice = this.priceCalculatorService.calculateMenuPrice(
      pricePerPeople,
      min_people,
      payload.number_of_people
    )

    const distanceMeters = await this.deliveryFeeService.calculateDistance(
      payload.longitude,
      payload.latitude
    )
    const fees = this.deliveryFeeService.calculateFees(distanceMeters, payload.delivery_zipcode)

    await Order.create({
      userId,
      menuId: payload.menu_id,
      deliveryAddress: payload.delivery_address,
      deliveryCity: payload.delivery_city,
      deliveryZipcode: payload.delivery_zipcode,
      deliveryFees: (Math.round(fees * 100) / 100).toString(),
      deliveryTime: payload.delivery_time,
      eventDate: payload.event_date,
      numberOfPeople: payload.number_of_people,
      totalAmount: (Math.round(finalPrice * 100) / 100).toString(),
      status: OrderStatus.PENDING,
      orderNumber: this.#createOrderNumber(),
      orderDate: DateTime.now(),
    })
  }

  #createOrderNumber() {
    return 'ORD-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  }
}
