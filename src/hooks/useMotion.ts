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
 * Page enter + scroll reveals + ambient loops.
 * Scroll uses IntersectionObserver (reliable). No Lenis — native scroll.
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

    let killAmbient: (() => void) | undefined
    const ambientTimer = window.setTimeout(() => {
      killAmbient = initAmbientLoops(el)
      ScrollTrigger.refresh()
    }, 400)

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)

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

/** Native smooth scroll only — Lenis broke ScrollTrigger visibility. */
export function useSmoothScroll() {
  useEffect(() => {
    // Keep native scrolling; document already has scroll-behavior: smooth in CSS
  }, [])
}
