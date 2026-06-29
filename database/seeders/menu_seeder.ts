import Diet from '#models/diet'
import Menu from '#models/menu'
import Theme from '#models/theme'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const classiqueDiet = await Diet.findByOrFail('label', 'Classique')
    const vegan = await Diet.findByOrFail('label', 'Vegan')
    const vegetarien = await Diet.findByOrFail('label', 'Végétarien')
    const noel = await Theme.findByOrFail('label', 'Noël')
    const paques = await Theme.findByOrFail('label', 'Pâques')
    const classiqueTheme = await Theme.findByOrFail('label', 'Classique')

    await Menu.createMany([
      {
        title: 'Menu Noël Classique',
        description:
          'Un menu festif généreux pour célébrer les fêtes en grande compagnie, avec des produits du terroir bordelais.',
        minPeople: 10,
        pricePerPeople: '45',
        dietId: classiqueDiet.id,
        themeId: noel.id,
        stock: 10,
      },
      {
        title: 'Menu Vegan Printemps ',
        description:
          'Une sélection végétale fraîche et colorée pour un événement écoresponsable et savoureux.',
        minPeople: 6,
        pricePerPeople: '35',
        dietId: vegan.id,
        themeId: classiqueTheme.id,
        stock: 6,
      },
      {
        title: 'Menu Pâques Gourmand',
        description:
          'Un menu de saison autour des saveurs printanières, idéal pour réunir famille et amis à Pâques.',
        minPeople: 8,
        pricePerPeople: '42',
        dietId: vegetarien.id,
        themeId: paques.id,
        stock: 8,
      },
    ])
  }
}
