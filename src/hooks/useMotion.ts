import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { animateHero, initReveals, pageEnter, ensureGsap } from '@/lib/motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Run page enter + scroll reveals whenever the route or container remounts.
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

    // slight delay so layout is ready
    const killHero = animateHero(el)
    const killReveal = initReveals(el)

    // refresh after images/video settle
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      window.clearTimeout(t)
      killHero()
      killReveal()
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
