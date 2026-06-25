import OpeningHour from '#models/opening_hour'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await OpeningHour.updateOrCreateMany('dayOfWeek', [
      { dayOfWeek: 0, openTime: '09:00:00', closeTime: '19:00:00', isClosed: false },
      { dayOfWeek: 1, openTime: '09:00:00', closeTime: '19:00:00', isClosed: false },
      { dayOfWeek: 2, openTime: '09:00:00', closeTime: '19:00:00', isClosed: false },
      { dayOfWeek: 3, openTime: '09:00:00', closeTime: '19:00:00', isClosed: false },
      { dayOfWeek: 4, openTime: '09:00:00', closeTime: '19:00:00', isClosed: false },
      { dayOfWeek: 5, openTime: '10:00:00', closeTime: '18:00:00', isClosed: false },
      { dayOfWeek: 6, openTime: null, closeTime: null, isClosed: true },
    ])
  }
}
