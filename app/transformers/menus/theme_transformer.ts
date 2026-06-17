import { BaseTransformer } from '@adonisjs/core/transformers'
import type Theme from '#models/theme'

export default class ThemeTransformer extends BaseTransformer<Theme> {
  toObject() {
    return this.pick(this.resource, ['id', 'label'])
  }
}
