import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'
import Diet from '#models/diet'
import Menu from '#models/menu'
import Theme from '#models/theme'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

async function downloadImage(url: string, dest: string): Promise<void> {
  if (existsSync(dest)) return
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Échec téléchargement ${url} (${response.status})`)
  const buffer = await response.arrayBuffer()
  writeFileSync(dest, Buffer.from(buffer))
}

export default class extends BaseSeeder {
  async run() {
    const [classique, vegetarien, vegan] = await Promise.all([
      Diet.findByOrFail('label', 'Classique'),
      Diet.findByOrFail('label', 'Végétarien'),
      Diet.findByOrFail('label', 'Vegan'),
    ])

    const [noel, paques, classiqueTheme, evenement] = await Promise.all([
      Theme.findByOrFail('label', 'Noël'),
      Theme.findByOrFail('label', 'Pâques'),
      Theme.findByOrFail('label', 'Classique'),
      Theme.findByOrFail('label', 'Évènement'),
    ])

    const menus = [
      {
        title: 'Menu Réveillon Prestige',
        description:
          "Une table d'exception pour le réveillon : foie gras poêlé, chapon rôti aux truffes et bûche maison. Un moment d'élégance pour célébrer en grand.",
        minPeople: 12,
        pricePerPeople: '89',
        dietId: classique.id,
        themeId: noel.id,
        stock: 5,
        image: {
          url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
          filename: 'menu-reveillon-prestige.jpg',
        },
      },
      {
        title: 'Menu Noël Végétarien',
        description:
          "Velouté de potimarron au lait de coco, galette de légumes racines en croûte d'herbes et fondant chocolat aux épices de Noël.",
        minPeople: 8,
        pricePerPeople: '55',
        dietId: vegetarien.id,
        themeId: noel.id,
        stock: 8,
        image: {
          url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
          filename: 'menu-noel-vegetarien.jpg',
        },
      },
      {
        title: "Menu Agneau de Pâques",
        description:
          "Gigot d'agneau rôti aux herbes de Provence, gratin dauphinois et tarte amandine aux fruits printaniers. La tradition revisitée.",
        minPeople: 10,
        pricePerPeople: '65',
        dietId: classique.id,
        themeId: paques.id,
        stock: 6,
        image: {
          url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
          filename: 'menu-agneau-paques.jpg',
        },
      },
      {
        title: 'Menu Pâques Fleuri',
        description:
          'Tartines aux asperges blanches et vertes, houmous aux petits pois et brioches artisanales. Un buffet printanier tout en légèreté.',
        minPeople: 6,
        pricePerPeople: '38',
        dietId: vegan.id,
        themeId: paques.id,
        stock: 10,
        image: {
          url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
          filename: 'menu-paques-fleuri.jpg',
        },
      },
      {
        title: 'Menu Cocktail Élégant',
        description:
          'Une sélection de canapés raffinés, verrines et pièces cocktail pour un apéritif dînatoire réussi. Idéal pour 20 personnes et plus.',
        minPeople: 20,
        pricePerPeople: '48',
        dietId: classique.id,
        themeId: classiqueTheme.id,
        stock: 15,
        image: {
          url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
          filename: 'menu-cocktail-elegant.jpg',
        },
      },
      {
        title: 'Menu Gastronomique',
        description:
          "Un dîner 5 services avec suggestions vins : mise en bouche, entrée, poisson, viande et dessert du chef. L'excellence bordelaise à table.",
        minPeople: 8,
        pricePerPeople: '95',
        dietId: classique.id,
        themeId: classiqueTheme.id,
        stock: 4,
        image: {
          url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
          filename: 'menu-gastronomique.jpg',
        },
      },
      {
        title: 'Menu Champêtre Végétarien',
        description:
          "Tarte aux légumes du marché, salade de lentilles du Puy et plateau de fromages AOP d'Aquitaine. Simple, local et généreux.",
        minPeople: 6,
        pricePerPeople: '42',
        dietId: vegetarien.id,
        themeId: classiqueTheme.id,
        stock: 10,
        image: {
          url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
          filename: 'menu-champetre-vegetarien.jpg',
        },
      },
      {
        title: 'Menu Vegan Gourmet',
        description:
          "Bouchées végétales aux saveurs du monde, houmous aux herbes fraîches et dessert coco-mangue. Savoureux et éthique.",
        minPeople: 8,
        pricePerPeople: '40',
        dietId: vegan.id,
        themeId: classiqueTheme.id,
        stock: 12,
        image: {
          url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
          filename: 'menu-vegan-gourmet.jpg',
        },
      },
      {
        title: 'Menu Mariage Prestige',
        description:
          "Dîner assis 4 services dressé à l'assiette : amuse-bouche, homard en entrée, magret de canard et pièce montée personnalisée.",
        minPeople: 50,
        pricePerPeople: '110',
        dietId: classique.id,
        themeId: evenement.id,
        stock: 3,
        image: {
          url: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
          filename: 'menu-mariage-prestige.jpg',
        },
      },
      {
        title: 'Menu Séminaire Business',
        description:
          'Buffet déjeuner complet pour vos équipes : salades composées, plat chaud, fromage et dessert. Formule adaptée aux réunions professionnelles.',
        minPeople: 15,
        pricePerPeople: '32',
        dietId: classique.id,
        themeId: evenement.id,
        stock: 20,
        image: {
          url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
          filename: 'menu-seminaire-business.jpg',
        },
      },
      {
        title: 'Menu Baby Shower',
        description:
          'Buffet sucré-salé coloré et léger : sandwichs mignons, verrines fraîches, macarons et cake pops. Pour célébrer le futur heureux événement.',
        minPeople: 10,
        pricePerPeople: '35',
        dietId: vegetarien.id,
        themeId: evenement.id,
        stock: 12,
        image: {
          url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
          filename: 'menu-baby-shower.jpg',
        },
      },
      {
        title: 'Menu Cocktail Vegan',
        description:
          "Finger foods 100 % végétaux : bouchées au pesto d'herbes, rouleaux de printemps et verrines betterave-avocat. Élégant et accessible à tous.",
        minPeople: 20,
        pricePerPeople: '45',
        dietId: vegan.id,
        themeId: evenement.id,
        stock: 8,
        image: {
          url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          filename: 'menu-cocktail-vegan.jpg',
        },
      },
    ]

    const picturesDir = app.makePath('storage/pictures')

    for (const { image, ...data } of menus) {
      const menu = await Menu.firstOrCreate({ title: data.title }, data)

      const existing = await menu.related('pictures').query()
      if (existing.length === 0) {
        const dest = join(picturesDir, image.filename)
        await downloadImage(image.url, dest)
        await menu.related('pictures').create({ imagePath: `pictures/${image.filename}` })
      }
    }
  }
}
