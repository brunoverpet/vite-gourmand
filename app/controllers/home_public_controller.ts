import { MenuService } from '#services/menus/menu_service'
import MenuTransformer from '#transformers/menus/menu_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomePublicController {
  constructor(private menuService: MenuService) {}

  async render({ inertia }: HttpContext) {
    const menus = await this.menuService.getFeaturedMenus()

    return inertia.render('public/home-public', { menus: MenuTransformer.transform(menus) })
  }
}
