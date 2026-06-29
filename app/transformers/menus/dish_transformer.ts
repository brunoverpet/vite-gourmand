import { BaseTransformer } from '@adonisjs/core/transformers'
import type Dish from '#models/dish'

export default class DishTransformer extends BaseTransformer<Dish> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'description', 'type', 'photoPath']),
      allergens: (this.resource.allergens ?? []).map((a) => ({ id: a.id, label: a.label })),
    }
  }
}
