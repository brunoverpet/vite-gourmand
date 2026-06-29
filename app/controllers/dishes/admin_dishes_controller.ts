import Allergen from '#models/allergen'
import { DishService } from '#services/dishes/dish_service'
import AllergenTransformer from '#transformers/menus/allergen_transformer'
import DishAdminTransformer from '#transformers/dishes/dish_admin_transformer'
import { createDishValidator, updateDishValidator } from '#validators/dishes/dish'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdminDishesController {
  constructor(private dishService: DishService) {}

  async index({ inertia, request }: HttpContext) {
    const { type, search, page } = request.qs()
    const dishes = await this.dishService.listDishes({
      type: type || undefined,
      search: search || undefined,
      page: page ? Number(page) : 1,
    })
    return inertia.render('dashboard/dishes/index', {
      dishes: DishAdminTransformer.transform(dishes.all()),
      meta: {
        currentPage: dishes.currentPage,
        lastPage: dishes.lastPage,
        total: dishes.total,
      },
      filters: { type: type || '', search: search || '' },
    })
  }

  async create({ inertia }: HttpContext) {
    const allergens = await Allergen.all()
    return inertia.render('dashboard/dishes/create', {
      allergens: AllergenTransformer.transform(allergens),
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createDishValidator)
    await this.dishService.createDish(payload)
    session.flash('success', 'Plat créé avec succès')
    return response.redirect().toRoute('admin_dishes.index')
  }

  async edit({ params, inertia }: HttpContext) {
    const [dish, allergens] = await Promise.all([
      this.dishService.getDish(params.id),
      Allergen.all(),
    ])
    return inertia.render('dashboard/dishes/edit', {
      dish: DishAdminTransformer.transform(dish),
      allergens: AllergenTransformer.transform(allergens),
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateDishValidator)
    await this.dishService.updateDish(params.id, payload)
    session.flash('success', 'Plat mis à jour avec succès')
    return response.redirect().toRoute('admin_dishes.edit', { id: params.id })
  }

  async destroy({ params, response, session }: HttpContext) {
    await this.dishService.deleteDish(params.id)
    session.flash('success', 'Plat supprimé')
    return response.redirect().toRoute('admin_dishes.index')
  }
}
