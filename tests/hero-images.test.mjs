import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildHeroImages, HERO_VARIANTS } from '../scripts/build-hero-images.mjs'

test('mobile picture sources match every generated filename and width', async () => {
  const source = await readFile(new URL('../src/components/ResponsiveHero.tsx', import.meta.url), 'utf8')
  for (const { name, width } of HERO_VARIANTS) {
    assert.ok(source.includes(`optimized/${name}`), `Missing picture source for ${name}`)
    assert.ok(source.includes(`${width}w`))
  }
  assert.match(source, /orientation: portrait/)
  assert.match(source, /sizes="100vw"/)
  assert.match(source, /onError=\{\(\) => setFallback\(true\)\}/)
  assert.match(source, /hero-poster\.png/)
})
test('image pipeline requests portrait dimensions without overwriting the source', async () => {
  const writes = []
  const sharpImpl = (input) => {
    const operation = { input }
    const pipeline = {
      rotate() { return this }, resize(options) { operation.resize = options; return this },
      webp(options) { operation.webp = options; return this },
      async toFile(output) { operation.output = output; writes.push(operation) },
    }
    return pipeline
  }
  await buildHeroImages({ sharpImpl, root: '/test-repo', mkdirImpl: async () => {} })
  assert.equal(writes.length, 6)
  for (const write of writes) {
    assert.equal(write.input.replaceAll('\\', '/'), '/test-repo/public/hero-poster.png')
    assert.notEqual(write.input, write.output)
    assert.match(write.output.replaceAll('\\', '/'), /\/public\/optimized\/.*\.webp$/)
    assert.equal(write.webp.quality, 82)
    assert.equal(write.resize.position, 'centre')
    if (write.output.includes('mobile')) assert.ok(write.resize.height > write.resize.width)
  }
})
test('a failed image conversion fails the build instead of publishing missing files', async () => {
  await assert.rejects(buildHeroImages({ root: '/test', mkdirImpl: async () => {}, sharpImpl: () => { throw new Error('missing source') } }), /missing source/)
})
