import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

/** Soft premium ease used across the site */
export const EASE = 'power3.out'
export const EASE_SOFT = 'power2.out'

/**
 * Animate all [data-reveal] elements inside a root.
 * Variants via data-reveal="up|left|right|scale|fade"
 * Optional data-reveal-delay="0.1" (seconds)
 * Optional data-reveal-stagger on a parent to stagger children with data-reveal-item
 */
export function initReveals(root: HTMLElement | Document = document) {
  ensureGsap()

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-item]').forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return () => {}
  }

  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []

  // Parent groups with stagger children
  root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]')
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 36 })

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: {
        trigger: group,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Individual reveals (skip those inside a stagger group)
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-reveal-stagger]')) return

    const variant = el.getAttribute('data-reveal') || 'up'
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0') || 0

    const from: gsap.TweenVars = { opacity: 0 }
    if (variant === 'up') from.y = 40
    else if (variant === 'down') from.y = -28
    else if (variant === 'left') from.x = -48
    else if (variant === 'right') from.x = 48
    else if (variant === 'scale') {
      from.scale = 0.92
      from.y = 16
    }

    gsap.set(el, from)

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.85,
      delay,
      ease: EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Parallax layers
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.15') || 0.15
    const tween = gsap.to(el, {
      yPercent: speed * 40,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  return () => {
    tweens.forEach((t) => t.kill())
    triggers.forEach((t) => t.kill())
  }
}

export function animateHero(root: HTMLElement) {
  ensureGsap()
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = root.querySelectorAll<HTMLElement>('[data-hero]')
  if (!targets.length) return () => {}

  if (prefersReduced) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' })
    return () => {}
  }

  gsap.set(targets, { opacity: 0, y: 28 })

  const tl = gsap.timeline({ defaults: { ease: EASE } })
  targets.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-hero-delay') || '0') || 0
    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      0.12 + delay
    )
  })

  const video = root.querySelector<HTMLElement>('[data-hero-video]')
  if (video) {
    gsap.fromTo(video, { scale: 1.1 }, { scale: 1, duration: 2.4, ease: EASE_SOFT })
  }

  return () => {
    tl.kill()
  }
}

export function pageEnter(el: HTMLElement) {
  ensureGsap()
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    gsap.set(el, { opacity: 1, y: 0 })
    return
  }
  gsap.fromTo(
    el,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, ease: EASE_SOFT }
  )
}
