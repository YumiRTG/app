import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const HERO_VARIANTS = [
  { name: 'hero-mobile-480.webp', width: 480, height: 853 },
  { name: 'hero-mobile-768.webp', width: 768, height: 1365 },
  { name: 'hero-mobile-1080.webp', width: 1080, height: 1920 },
  { name: 'hero-wide-1280.webp', width: 1280 },
  { name: 'hero-wide-1920.webp', width: 1920 },
  { name: 'hero-wide-2560.webp', width: 2560 },
]

export async function buildHeroImages({ sharpImpl, root = process.cwd(), mkdirImpl = mkdir } = {}) {
  const sharp = sharpImpl ?? (await import('sharp')).default
  const input = path.join(root, 'public', 'hero-poster.png')
  const directory = path.join(root, 'public', 'optimized')
  await mkdirImpl(directory, { recursive: true })
  // Sequential processing limits memory use in CI. The original PNG is untouched.
  for (const variant of HERO_VARIANTS) {
    await sharp(input).rotate().resize({ width: variant.width, height: variant.height, fit: 'cover', position: 'centre' })
      .webp({ quality: 82, effort: 4 }).toFile(path.join(directory, variant.name))
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildHeroImages()
}
