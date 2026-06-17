import { BaseTransformer } from '@adonisjs/core/transformers'
import type Diet from '#models/diet'

export default class DietTransformer extends BaseTransformer<Diet> {
  toObject() {
    return this.pick(this.resource, ['id', 'label'])
  }
}
