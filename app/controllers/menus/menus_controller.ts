import { MenuService } from '#services/menus/menu_service'
import DietTransformer from '#transformers/menus/diet_transformer'
import MenuTransformer from '#transformers/menus/menu_transformer'
import MenuDetailTransformer from '#transformers/menus/menu_detail_transformer'
import ThemeTransformer from '#transformers/menus/theme_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MenusController {
  constructor(private menuService: MenuService) {}

  async render({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const qs = request.qs()

    const diet = qs.diet as string[] | undefined
    const theme = qs.theme as string[] | undefined
    const priceMin = qs.priceMin ? Number(qs.priceMin) : undefined
    const priceMax = qs.priceMax ? Number(qs.priceMax) : undefined
    const minPeople = qs.minPeople ? Number(qs.minPeople) : undefined

    const menus = await this.menuService.getAllValidMenu(page, 4, {
      diet,
      theme,
      priceMin,
      priceMax,
      minPeople,
    })

    return inertia.render('public/menus/index', {
      diets: async () => {
        const { diets } = await this.menuService.getFilters()
        return DietTransformer.transform(diets)
      },
      themes: async () => {
        const { themes } = await this.menuService.getFilters()
        return ThemeTransformer.transform(themes)
      },
      menus: MenuTransformer.paginate(menus.all(), menus.getMeta()),
      activeFilters: {
        diet: diet ?? [],
        theme: theme ?? [],
        priceMin: priceMin ?? null,
        priceMax: priceMax ?? null,
        minPeople: minPeople ?? null,
      },
    })
  }

  async show({ params, inertia }: HttpContext) {
    const menu = await this.menuService.getMenuById(params.id)
    return inertia.render('public/menus/show', {
      menu: MenuDetailTransformer.transform(menu),
    })
  }
}
