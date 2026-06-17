import { MenuService } from '#services/menus/menu_service'
import DietTransformer from '#transformers/menus/diet_transformer'
import MenuTransformer from '#transformers/menus/menu_transformer'
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
    const { diets, themes } = await this.menuService.getFilters()

    const menus = await this.menuService.getAllValidMenu(page, 2, diet, theme)

    return inertia.render('public/menus/index', {
      diets: DietTransformer.transform(diets),
      themes: ThemeTransformer.transform(themes),
      menus: MenuTransformer.paginate(menus.all(), menus.getMeta()),
      activeFilters: {
        diet: diet ?? [],
        theme: theme ?? [],
      },
    })
  }
}
