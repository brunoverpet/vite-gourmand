import { BaseTransformer } from '@adonisjs/core/transformers'
import type Dish from '#models/dish'
import type Allergen from '#models/allergen'

export default class DishAdminTransformer extends BaseTransformer<Dish> {
  toObject() {
    const allergens = (this.resource.allergens as unknown as Allergen[]) ?? []
    return {
      ...this.pick(this.resource, ['id', 'title', 'description', 'type']),
      photoPath: this.resource.photoPath || null,
      allergens: allergens.map((a) => ({ id: a.id, label: a.label })),
    }
  }
}
