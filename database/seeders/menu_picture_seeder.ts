import Menu from '#models/menu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const menu = await Menu.first()
    await menu
      ?.related('pictures')
      .createMany([
        { imagePath: 'https://placehold.co/600x400' },
        { imagePath: 'https://placehold.co/600x400' },
      ])
  }
}
