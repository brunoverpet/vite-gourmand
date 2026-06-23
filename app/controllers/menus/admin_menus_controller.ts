import type Dish from '#models/dish'
import { DishService } from '#services/dishes/dish_service'
import { MenuService } from '#services/menus/menu_service'
import DietTransformer from '#transformers/menus/diet_transformer'
import MenuAdminTransformer from '#transformers/menus/menu_admin_transformer'
import ThemeTransformer from '#transformers/menus/theme_transformer'
import { createMenuValidator, updateMenuValidator } from '#validators/menus/menu'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdminMenusController {
  constructor(
    private menuService: MenuService,
    private dishService: DishService
  ) {}

  async index({ inertia }: HttpContext) {
    const menus = await this.menuService.getAllMenusAdmin()
    return inertia.render('dashboard/menus/index', {
      menus: MenuAdminTransformer.transform(menus),
    })
  }

  async create({ inertia }: HttpContext) {
    const { diets, themes } = await this.menuService.getFilters()
    return inertia.render('dashboard/menus/create', {
      diets: DietTransformer.transform(diets),
      themes: ThemeTransformer.transform(themes),
    })
  }

  async store({ request, response }: HttpContext) {
    const { diets, themes } = await this.menuService.getFilters()
    const payload = await createMenuValidator.validate(request.all(), {
      meta: {
        themeIds: themes.map((t) => t.id),
        dietIds: diets.map((d) => d.id),
      },
    })
    const menu = await this.menuService.createMenu(payload)
    return response.redirect().toRoute('admin_menus.edit', { id: menu.id })
  }

  async edit({ params, inertia }: HttpContext) {
    const [menu, { diets, themes }, allDishes] = await Promise.all([
      this.menuService.getMenuForEdit(params.id),
      this.menuService.getFilters(),
      this.dishService.listAllDishes(),
    ])

    const selectedDishIds = (menu.dishes as unknown as Dish[]).map((d) => d.id)

    const toDishPickerItem = (d: (typeof allDishes)[number]) => ({
      id: d.id,
      title: d.title,
      photoPath: d.photoPath || null,
    })

    return inertia.render('dashboard/menus/edit', {
      menu: MenuAdminTransformer.transform(menu),
      selectedDishIds,
      diets: DietTransformer.transform(diets),
      themes: ThemeTransformer.transform(themes),
      dishes: {
        entrées: allDishes.filter((d) => d.type === 'entrée').map(toDishPickerItem),
        plats: allDishes.filter((d) => d.type === 'plat').map(toDishPickerItem),
        desserts: allDishes.filter((d) => d.type === 'dessert').map(toDishPickerItem),
      },
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const { diets, themes } = await this.menuService.getFilters()
    const payload = await updateMenuValidator.validate(request.all(), {
      meta: {
        themeIds: themes.map((t) => t.id),
        dietIds: diets.map((d) => d.id),
      },
    })
    await this.menuService.updateMenu(params.id, payload)
    session.flash('success', 'Menu mis à jour avec succès')

    return response.redirect().toRoute('admin_menus.edit', { id: params.id })
  }

  async destroy({ params, response, session }: HttpContext) {
    await this.menuService.deleteMenu(params.id)
    session.flash('success', 'Menu supprimé')
    return response.redirect().toRoute('admin_menus.index')
  }
}
