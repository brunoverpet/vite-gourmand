import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'
import Menu from '#models/menu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

async function downloadImage(url: string, dest: string): Promise<void> {
  if (existsSync(dest)) return
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Échec téléchargement ${url} (${response.status})`)
  const buffer = await response.arrayBuffer()
  writeFileSync(dest, Buffer.from(buffer))
}

const images: Record<string, { url: string; filename: string }> = {
  'Menu Noël Classique': {
    url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    filename: 'menu-noel-classique.jpg',
  },
  'Menu Vegan Printemps ': {
    url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
    filename: 'menu-vegan-printemps.jpg',
  },
  'Menu Pâques Gourmand': {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    filename: 'menu-paques-gourmand.jpg',
  },
}

export default class extends BaseSeeder {
  async run() {
    const picturesDir = app.makePath('storage/pictures')

    for (const [title, image] of Object.entries(images)) {
      const menu = await Menu.findBy('title', title)
      if (!menu) continue

      const existing = await menu.related('pictures').query()
      if (existing.length === 0) {
        const dest = join(picturesDir, image.filename)
        await downloadImage(image.url, dest)
        await menu.related('pictures').create({ imagePath: `pictures/${image.filename}` })
      }
    }
  }
}
