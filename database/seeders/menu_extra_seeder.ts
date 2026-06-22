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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            filename: 'menu-reveillon-prestige-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
            filename: 'menu-reveillon-prestige-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-reveillon-prestige-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
            filename: 'menu-reveillon-prestige-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
            filename: 'menu-reveillon-prestige-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
            filename: 'menu-noel-vegetarien-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
            filename: 'menu-noel-vegetarien-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-noel-vegetarien-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
            filename: 'menu-noel-vegetarien-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-noel-vegetarien-5.jpg',
          },
        ],
      },
      {
        title: 'Menu Agneau de Pâques',
        description:
          "Gigot d'agneau rôti aux herbes de Provence, gratin dauphinois et tarte amandine aux fruits printaniers. La tradition revisitée.",
        minPeople: 10,
        pricePerPeople: '65',
        dietId: classique.id,
        themeId: paques.id,
        stock: 6,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
            filename: 'menu-agneau-paques-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
            filename: 'menu-agneau-paques-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80',
            filename: 'menu-agneau-paques-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            filename: 'menu-agneau-paques-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
            filename: 'menu-agneau-paques-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-paques-fleuri-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
            filename: 'menu-paques-fleuri-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
            filename: 'menu-paques-fleuri-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
            filename: 'menu-paques-fleuri-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-paques-fleuri-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
            filename: 'menu-cocktail-elegant-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
            filename: 'menu-cocktail-elegant-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-cocktail-elegant-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
            filename: 'menu-cocktail-elegant-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            filename: 'menu-cocktail-elegant-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
            filename: 'menu-gastronomique-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            filename: 'menu-gastronomique-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
            filename: 'menu-gastronomique-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
            filename: 'menu-gastronomique-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-gastronomique-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
            filename: 'menu-champetre-vegetarien-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
            filename: 'menu-champetre-vegetarien-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-champetre-vegetarien-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-champetre-vegetarien-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
            filename: 'menu-champetre-vegetarien-5.jpg',
          },
        ],
      },
      {
        title: 'Menu Vegan Gourmet',
        description:
          'Bouchées végétales aux saveurs du monde, houmous aux herbes fraîches et dessert coco-mangue. Savoureux et éthique.',
        minPeople: 8,
        pricePerPeople: '40',
        dietId: vegan.id,
        themeId: classiqueTheme.id,
        stock: 12,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-vegan-gourmet-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-vegan-gourmet-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
            filename: 'menu-vegan-gourmet-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
            filename: 'menu-vegan-gourmet-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
            filename: 'menu-vegan-gourmet-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
            filename: 'menu-mariage-prestige-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            filename: 'menu-mariage-prestige-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
            filename: 'menu-mariage-prestige-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-mariage-prestige-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
            filename: 'menu-mariage-prestige-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
            filename: 'menu-seminaire-business-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
            filename: 'menu-seminaire-business-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
            filename: 'menu-seminaire-business-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-seminaire-business-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
            filename: 'menu-seminaire-business-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
            filename: 'menu-baby-shower-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
            filename: 'menu-baby-shower-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
            filename: 'menu-baby-shower-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-baby-shower-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-baby-shower-5.jpg',
          },
        ],
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
        images: [
          {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            filename: 'menu-cocktail-vegan-1.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
            filename: 'menu-cocktail-vegan-2.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
            filename: 'menu-cocktail-vegan-3.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
            filename: 'menu-cocktail-vegan-4.jpg',
          },
          {
            url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
            filename: 'menu-cocktail-vegan-5.jpg',
          },
        ],
      },
    ]

    const picturesDir = app.makePath('storage/pictures')

    for (const { images, ...data } of menus) {
      const menu = await Menu.firstOrCreate({ title: data.title }, data)

      const existing = await menu.related('pictures').query()
      if (existing.length === 0) {
        for (const image of images) {
          const dest = join(picturesDir, image.filename)
          await downloadImage(image.url, dest)
          await menu.related('pictures').create({ imagePath: `pictures/${image.filename}` })
        }
      }
    }
  }
}
