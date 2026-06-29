import { BaseTransformer } from '@adonisjs/core/transformers'
import type Picture from '#models/picture'

export default class PictureTransformer extends BaseTransformer<Picture> {
  toObject() {
    return this.pick(this.resource, ['id', 'imagePath'])
  }
}
