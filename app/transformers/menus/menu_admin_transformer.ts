import { BaseTransformer } from '@adonisjs/core/transformers'
import type Menu from '#models/menu'
import type Picture from '#models/picture'
import PictureTransformer from '#transformers/picture_transformer'
import DietTransformer from '#transformers/menus/diet_transformer'
import ThemeTransformer from '#transformers/menus/theme_transformer'

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
      pictures: PictureTransformer.transform((this.resource.pictures as unknown as Picture[]) ?? []),
    }
  }
}
