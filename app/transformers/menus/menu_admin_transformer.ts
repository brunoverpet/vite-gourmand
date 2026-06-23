import { BaseTransformer } from '@adonisjs/core/transformers'
import type Menu from '#models/menu'
import PictureTransformer from '#transformers/picture_transformer'
import DietTransformer from '#transformers/menus/diet_transformer'
import ThemeTransformer from '#transformers/menus/theme_transformer'
import DishTransformer from '#transformers/menus/dish_transformer'

export default class MenuAdminTransformer extends BaseTransformer<Menu> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'conditions',
        'minPeople',
        'pricePerPeople',
        'stock',
      ]),
      diet: DietTransformer.transform(this.resource.diet),
      theme: ThemeTransformer.transform(this.resource.theme),
      pictures: PictureTransformer.transform(this.whenLoaded(this.resource.pictures) ?? []),
      dishes: DishTransformer.transform(this.whenLoaded(this.resource.dishes) ?? []),
    }
  }
}
