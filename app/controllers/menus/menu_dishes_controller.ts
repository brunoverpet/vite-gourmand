import { DishService } from '#services/dishes/dish_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MenuDishesController {
  constructor(private dishService: DishService) {}

  async sync({ params, request, response }: HttpContext) {
    const { dish_ids } = request.only(['dish_ids'])
    await this.dishService.syncMenuDishes(params.id, dish_ids ?? [])
    return response.redirect().back()
  }
}
