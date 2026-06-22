import { MenuService } from '#services/menus/menu_service'
import { NoticeService } from '#services/shared/notice_service'
import MenuTransformer from '#transformers/menus/menu_transformer'
import NoticeTransformer from '#transformers/notices/notice_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomePublicController {
  constructor(
    private menuService: MenuService,
    private noticeService: NoticeService
  ) {}

  async render({ inertia }: HttpContext) {
    const menus = await this.menuService.getFeaturedMenus()
    const notices = await this.noticeService.getValidateNotice()

    return inertia.render('public/home-public', {
      menus: MenuTransformer.transform(menus),
      notices: NoticeTransformer.transform(notices).useVariant('forPublic'),
    })
  }
}
