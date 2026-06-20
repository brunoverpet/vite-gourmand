import { DeliveryFeeService } from '#services/shared/delivery_fee_service'
import { PriceCalculatorService } from '#services/shared/price_calculator_service'
import { MenuService } from '#services/menus/menu_service'
import { CreateOrderActionService } from '#services/orders/create_order_action_service'
import MenuTransformer from '#transformers/menus/menu_transformer'
import { createOrderValidator } from '#validators/order/order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrderController {
  constructor(
    private menuService: MenuService,
    private createOrderAction: CreateOrderActionService,
    private deliveryFeeService: DeliveryFeeService,
    private priceCalculatorService: PriceCalculatorService
  ) {}

  async render({ params, request, inertia }: HttpContext) {
    const { menuId } = params
    const longitude = Number(request.input('longitude'))
    const latitude = Number(request.input('latitude'))
    const zipcode = String(request.input('zipcode') ?? '')
    const numberOfPeople = Number(request.input('number_of_people') ?? 0)

    const menu = await this.menuService.getMenuById(menuId)

    return inertia.render('public/order/index', {
      menu: MenuTransformer.transform(menu),
      estimate: inertia.optional(
        this.#buildEstimate(
          Number.parseFloat(menu.pricePerPeople),
          menu.minPeople,
          longitude,
          latitude,
          zipcode,
          numberOfPeople
        )
      ),
    })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createOrderValidator)
    const userId = auth.getUserOrFail().id

    const menu = await this.menuService.getMenuById(payload.menu_id)

    if (menu.stock <= 0) {
      session.flash({ error: "Ce menu n'est plus disponible." })
      return response.redirect().back()
    }

    if (payload.number_of_people < menu.minPeople) {
      session.flash({ error: "Le nombre de personnes minimums n'est pas valide" })
      return response.redirect().back()
    }

    await this.createOrderAction.execute(
      payload,
      userId,
      Number.parseFloat(menu.pricePerPeople),
      menu.minPeople
    )

    menu.stock -= 1
    await menu.save()

    session.flash({ success: 'Votre commande a bien été enregistrée.' })

    return response.redirect().toRoute('home')
  }

  #buildEstimate(
    pricePerPeople: number,
    minPeople: number,
    longitude: number,
    latitude: number,
    zipcode: string,
    numberOfPeople: number
  ) {
    return async () => {
      if (!longitude || !latitude || !zipcode || !numberOfPeople) return undefined
      const distanceMeters = await this.deliveryFeeService.calculateDistance(longitude, latitude)
      const deliveryFee = this.deliveryFeeService.calculateFees(distanceMeters, zipcode)
      const menuPrice = this.priceCalculatorService.calculateMenuPrice(
        pricePerPeople,
        minPeople,
        numberOfPeople
      )
      return {
        distanceKm: Math.round(distanceMeters / 1000),
        deliveryFee: Math.round(deliveryFee * 100) / 100,
        menuPrice: Math.round(menuPrice * 100) / 100,
        total: Math.round((menuPrice + deliveryFee) * 100) / 100,
        hasReduction: numberOfPeople >= minPeople + 5,
        savedAmount:
          numberOfPeople >= minPeople + 5
            ? Math.round(pricePerPeople * numberOfPeople * 0.1 * 100) / 100
            : 0,
      }
    }
  }
}
