import { BaseTransformer } from '@adonisjs/core/transformers'
import type Dish from '#models/dish'
import AllergenTransformer from '#transformers/menus/allergen_transformer'

export default class DishTransformer extends BaseTransformer<Dish> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'description', 'type', 'photoPath']),
      allergens: AllergenTransformer.transform(this.whenLoaded(this.resource.allergens)),
    }
  }
}
