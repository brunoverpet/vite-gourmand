import { BaseTransformer } from '@adonisjs/core/transformers'
import type Allergen from '#models/allergen'

export default class AllergenTransformer extends BaseTransformer<Allergen> {
  toObject() {
    return this.pick(this.resource, ['id', 'label'])
  }
}
