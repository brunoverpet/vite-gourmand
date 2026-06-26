import Diet from '#models/diet'
import Menu from '#models/menu'
import Theme from '#models/theme'
import type { CreateMenuPayload, UpdateMenuPayload } from '#validators/menus/menu'

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
      .if(priceMin !== null && priceMin !== undefined, (q) =>
        q.where('price_per_people', '>=', priceMin!)
      )
      .if(priceMax !== null && priceMax !== undefined, (q) =>
        q.where('price_per_people', '<=', priceMax!)
      )
      .if(minPeople !== null && minPeople !== undefined, (q) =>
        q.where('min_people', '>=', minPeople!)
      )
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

  async createMenu(payload: CreateMenuPayload) {
    return await Menu.create({
      title: payload.title,
      description: payload.description,
      conditions: payload.conditions ?? null,
      minPeople: payload.min_people,
      pricePerPeople: payload.price_per_people.toString(),
      stock: payload.stock,
      dietId: payload.diet_id,
      themeId: payload.theme_id,
    })
  }

  async updateMenu(id: string, payload: UpdateMenuPayload) {
    const menu = await Menu.findOrFail(id)
    return await menu
      .merge({
        title: payload.title,
        description: payload.description,
        conditions: payload.conditions ?? null,
        minPeople: payload.min_people,
        pricePerPeople: payload.price_per_people?.toString(),
        stock: payload.stock,
        dietId: payload.diet_id,
        themeId: payload.theme_id,
      })
      .save()
  }

  async deleteMenu(id: string) {
    const menu = await this.getMenuById(id)

    await menu.delete()
  }

  async getAllMenusAdmin(params: { search?: string; theme?: string; page?: number } = {}) {
    return await Menu.query()
      .preload('diet')
      .preload('theme')
      .preload('pictures')
      .if(params.search, (q) => q.whereILike('title', `%${params.search}%`))
      .if(params.theme, (q) => q.whereHas('theme', (t) => t.where('label', params.theme!)))
      .orderBy('created_at', 'desc')
      .paginate(params.page ?? 1, 8)
  }

  async getAllMenus() {
    return await Menu.query().preload('diet').preload('theme').orderBy('title', 'asc')
  }

  async getMenuForEdit(id: string) {
    return await Menu.query()
      .where('id', id)
      .preload('diet')
      .preload('theme')
      .preload('pictures')
      .preload('dishes', (q) => q.preload('allergens'))
      .firstOrFail()
  }
}
