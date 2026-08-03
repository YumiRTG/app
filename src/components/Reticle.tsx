import { useEffect, useRef } from 'react'

/**
 * A targeting reticle that trails the pointer, the way a strategy game marks
 * where your order will land. Desktop and fine pointers only: on touch there is
 * no cursor to decorate, and with reduced motion it never mounts.
 *
 * Deliberately does not replace the system cursor. The arrow stays, so nothing
 * about clicking or text selection changes.
 */
export default function Reticle() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el || !fine || reduced) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let raf = 0
    let idle = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      idle = 0
      el.dataset.on = 'true'
      const t = e.target as HTMLElement | null
      // Lock on when the pointer is over something you can act on.
      el.dataset.lock = t?.closest('a,button,[role="tab"]') ? 'true' : 'false'
    }

    const onLeave = () => {
      el.dataset.on = 'false'
    }

    const loop = () => {
      // Trails behind rather than tracking exactly, so it reads as a system
      // following your hand instead of a second cursor.
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      idle += 1
      if (idle > 180) el.dataset.on = 'false'
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="reticle" data-on="false" aria-hidden>
      <span className="reticle__ring" />
      <span className="reticle__tick reticle__tick--n" />
      <span className="reticle__tick reticle__tick--s" />
      <span className="reticle__tick reticle__tick--e" />
      <span className="reticle__tick reticle__tick--w" />
    </div>
  )
}
