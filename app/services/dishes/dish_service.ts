import Dish from '#models/dish'
import Menu from '#models/menu'
import { FileService } from '#services/shared/file_service'
import type { CreateDishPayload, UpdateDishPayload } from '#validators/dishes/dish'
import { inject } from '@adonisjs/core'

@inject()
export class DishService {
  constructor(private fileService: FileService) {}

  async listDishes(params: { type?: string; search?: string; page?: number } = {}) {
    return await Dish.query()
      .preload('allergens')
      .if(params.type, (q) => q.where('type', params.type!))
      .if(params.search, (q) => q.whereILike('title', `%${params.search}%`))
      .orderBy('type')
      .orderBy('title')
      .paginate(params.page ?? 1, 8)
  }

  async listAllDishes() {
    return await Dish.query().preload('allergens').orderBy('type').orderBy('title')
  }

  async getDish(id: string) {
    return await Dish.query().where('id', id).preload('allergens').firstOrFail()
  }

  async createDish(payload: CreateDishPayload) {
    let photoPath = ''

    if (payload.photo) {
      photoPath = await this.fileService.upload(payload.photo, 'dishes')
    }

    const dish = await Dish.create({
      title: payload.title,
      description: payload.description,
      type: payload.type,
      photoPath,
    })

    if (payload.allergen_ids?.length) {
      await dish.related('allergens').attach(payload.allergen_ids)
    }

    return dish
  }

  async updateDish(id: string, payload: UpdateDishPayload) {
    const dish = await Dish.findOrFail(id)

    if (payload.photo) {
      if (dish.photoPath && !dish.photoPath.startsWith('http')) {
        await this.fileService.deleteFile(dish.photoPath)
      }
      dish.photoPath = await this.fileService.upload(payload.photo, 'dishes')
    }

    dish.merge({
      ...(payload.title !== undefined && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.type !== undefined && { type: payload.type }),
    })

    await dish.save()

    await dish.related('allergens').sync(payload.allergen_ids ?? [])

    return dish
  }

  async deleteDish(id: string) {
    const dish = await Dish.findOrFail(id)

    if (dish.photoPath && !dish.photoPath.startsWith('http')) {
      await this.fileService.deleteFile(dish.photoPath)
    }

    await dish.delete()
  }

  async syncMenuDishes(menuId: string, dishIds: string[]) {
    const menu = await Menu.findOrFail(menuId)
    await menu.related('dishes').sync(dishIds)
  }
}
