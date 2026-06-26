import { MenuService } from '#services/menus/menu_service'
import { GetStatsAction } from '#services/statistics/get_stats_action'
import MenuTransformer from '#transformers/menus/menu_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdminStatsController {
  constructor(
    private getStatsAction: GetStatsAction,
    private menuService: MenuService
  ) {}

  async render({ inertia, request }: HttpContext) {
    const menuId = request.input('menuId')
    const from = request.input('from')
    const to = request.input('to')

    const stats = await this.getStatsAction.execute(menuId, from, to)
    const menus = await this.menuService.getAllMenusAdmin()
    return inertia.render('dashboard/statistics/index', {
      stats,
      menus: MenuTransformer.transform(menus),
      filters: { menuId, from, to },
    })
  }
}
