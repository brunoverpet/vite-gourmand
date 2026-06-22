import Diet from '#models/diet'
import Menu from '#models/menu'
import Theme from '#models/theme'

type MenuFilters = {
  diet?: string[]
  theme?: string[]
  priceMin?: number
  priceMax?: number
  minPeople?: number
}

export class MenuService {
  async getAllValidMenu(page: number, perPage: number = 4, filters: MenuFilters = {}) {
    const { diet, theme, priceMin, priceMax, minPeople } = filters
    return await Menu.query()
      .where('stock', '>', 0)
      .if(diet?.length, (q) => q.whereHas('diet', (d) => d.whereIn('label', diet!)))
      .if(theme?.length, (q) => q.whereHas('theme', (t) => t.whereIn('label', theme!)))
      .if(priceMin !== null, (q) => q.where('price_per_people', '>=', priceMin!))
      .if(priceMax !== null, (q) => q.where('price_per_people', '<=', priceMax!))
      .if(minPeople !== null, (q) => q.where('min_people', '>=', minPeople!))
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

  async getMenuById(id: string) {
    return await Menu.query()
      .where('id', id)
      .preload('pictures')
      .preload('diet')
      .preload('theme')
      .preload('dishes', (q) => q.preload('allergens'))
      .firstOrFail()
  }

  async getFilters() {
    const [diets, themes] = await Promise.all([Diet.all(), Theme.all()])
    return { diets, themes }
  }
}
