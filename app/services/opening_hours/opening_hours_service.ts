import OpeningHour from '#models/opening_hour'
import type { UpdateOpeningHoursPayload } from '#validators/opening_hours/opening_hours'

export class OpeningHoursService {
  async getOpeningHours() {
    return OpeningHour.all()
  }

  async updateHours(payload: UpdateOpeningHoursPayload['hours']) {
    return OpeningHour.updateOrCreateMany('id', payload)
  }
}
