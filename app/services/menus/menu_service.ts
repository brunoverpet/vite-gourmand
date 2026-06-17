import Diet from '#models/diet'
import Menu from '#models/menu'
import Theme from '#models/theme'

export class MenuService {
  async getAllValidMenu(page: number, perPage: number = 10, diet?: string[], theme?: string[]) {
    return await Menu.query()
      .where('stock', '>', 0)
      .if(diet?.length, (q) => q.whereHas('diet', (d) => d.whereIn('label', diet!)))
      .if(theme?.length, (q) => q.whereHas('theme', (t) => t.whereIn('label', theme!)))
      .preload('pictures')
      .preload('diet')
      .preload('theme')
      .paginate(page, perPage)
  }

  async getFeaturedMenus(limit: number = 3) {
    return await Menu.query()
      .where('stock', '>', 0)
      .preload('pictures')
      .preload('diet')
      .preload('theme')
      .limit(limit)
  }

  async getFilters() {
    const [diets, themes] = await Promise.all([Diet.all(), Theme.all()])
    return { diets, themes }
  }
}
