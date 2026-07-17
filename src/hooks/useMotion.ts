import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import {
  animateHero,
  initAmbientLoops,
  initReveals,
  pageEnter,
  ensureGsap,
} from '@/lib/motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Run page enter + scroll reveals + continuous ambient motion on every page.
 */
export function usePageMotion(enabled = true) {
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    ensureGsap()
    pageEnter(el)

    const killHero = animateHero(el)
    const killReveal = initReveals(el)

    // Ambient loops after first paint so layout is stable
    let killAmbient: (() => void) | undefined
    const ambientTimer = window.setTimeout(() => {
      killAmbient = initAmbientLoops(el)
      ScrollTrigger.refresh()
    }, 500)

    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      window.clearTimeout(t)
      window.clearTimeout(ambientTimer)
      killHero()
      killReveal()
      killAmbient?.()
    }
  }, [pathname, enabled])

  return ref
}

/** Smooth scroll via Lenis + ScrollTrigger bridge */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let destroyed = false
    let raf = 0
    let lenis: { raf: (t: number) => void; destroy: () => void; on: (e: string, cb: () => void) => void } | null =
      null

    ;(async () => {
      const { default: Lenis } = await import('lenis')
      if (destroyed) return

      ensureGsap()
      const instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenis = instance

      instance.on('scroll', () => {
        ScrollTrigger.update()
      })

      const loop = (time: number) => {
        instance.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })()

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])
}
