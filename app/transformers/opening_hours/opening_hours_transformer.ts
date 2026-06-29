import { BaseTransformer } from '@adonisjs/core/transformers'
import type OpeningHour from '#models/opening_hour'

export default class OpeningHoursTransformer extends BaseTransformer<OpeningHour> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'closeTime', 'dayOfWeek', 'openTime', 'isClosed']),
    }
  }
}
