import { OrderStatus } from '#enums/order_status'
import type Order from '#models/order'
import { DeliveryFeeService } from '#services/shared/delivery_fee_service'
import { PriceCalculatorService } from '#services/shared/price_calculator_service'
import type { UpdateOrderPayload } from '#validators/orders/order'
import { inject } from '@adonisjs/core'

@inject()
export class UpdateOrderAction {
  constructor(
    private deliveryFeeService: DeliveryFeeService,
    private priceCalculatorService: PriceCalculatorService
  ) {}

  async execute(order: Order, payload: UpdateOrderPayload): Promise<void> {
    if (order.status !== OrderStatus.PENDING) {
      throw new Error('Modification impossible : la commande a déjà été acceptée.')
    }

    const updates: Partial<typeof order.$attributes> = {}

    if (payload.event_date !== undefined) updates.eventDate = payload.event_date
    if (payload.delivery_time !== undefined) updates.deliveryTime = payload.delivery_time
    if (payload.delivery_address !== undefined) updates.deliveryAddress = payload.delivery_address
    if (payload.delivery_city !== undefined) updates.deliveryCity = payload.delivery_city
    if (payload.delivery_zipcode !== undefined) updates.deliveryZipcode = payload.delivery_zipcode
    if (payload.number_of_people !== undefined) updates.numberOfPeople = payload.number_of_people

    const needsPriceUpdate =
      payload.longitude !== undefined ||
      payload.latitude !== undefined ||
      payload.number_of_people !== undefined

    if (needsPriceUpdate) {
      await order.load('menu')
      const menu = order.menu

      if (payload.number_of_people !== undefined && payload.number_of_people < menu.minPeople) {
        throw new Error(`Le nombre minimum de personnes pour ce menu est ${menu.minPeople}.`)
      }

      const lon = payload.longitude ?? 0
      const lat = payload.latitude ?? 0
      const nbPeople = payload.number_of_people ?? order.numberOfPeople
      const zipcode = payload.delivery_zipcode ?? order.deliveryZipcode

      const finalPrice = this.priceCalculatorService.calculateMenuPrice(
        Number(menu.pricePerPeople),
        menu.minPeople,
        nbPeople
      )
      const distanceMeters = await this.deliveryFeeService.calculateDistance(lon, lat)
      const fees = this.deliveryFeeService.calculateFees(distanceMeters, zipcode)

      const basePrice = Number(menu.pricePerPeople) * nbPeople
      const reductionAmount =
        nbPeople >= menu.minPeople + 5 ? Math.round((basePrice - finalPrice) * 100) / 100 : 0

      updates.menuPrice = (Math.round(finalPrice * 100) / 100).toString()
      updates.deliveryFees = (Math.round(fees * 100) / 100).toString()
      updates.reductionAmount = reductionAmount.toString()
      updates.totalAmount = (Math.round((finalPrice + fees) * 100) / 100).toString()
    }

    await order.merge(updates).save()
  }
}
