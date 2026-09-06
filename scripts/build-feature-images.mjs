import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// Existing project artwork only. Sources stay intact for other pages.
const images = [
  ['base', 'env-base.png'], ['heroes', 'feature-heroes-hero.jpg'],
  ['dinosaurs', 'dino-raptor.png'], ['campaign', 'campaign-map.png'],
  ['alliance', 'feat-alliance.png'], ['world', 'modes/mode-world.jpg'],
  ['defense', 'modes/mode-defense.jpg'], ['arena', 'modes/mode-arena.jpg'],
  ['partner', 'promo/partner-system-promo.webp'], ['infantry', 'icon-infantry.png'],
  ['riders', 'icon-rider.png'], ['shooters', 'icon-shooter.png'],
]
const output = new URL('../public/features/', import.meta.url)
await mkdir(output, { recursive: true })
for (const [name, source] of images) {
  for (const width of [480, 960]) {
    await sharp(fileURLToPath(new URL(`../public/${source}`, import.meta.url)))
      .resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
      .toFile(fileURLToPath(new URL(`${name}-${width}.webp`, output)))
  }
}
console.log('Feature artwork prepared from 12 existing project assets.')
