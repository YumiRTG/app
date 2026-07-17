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

export const EASE = 'power3.out'
export const EASE_SOFT = 'power2.out'

/**
 * Scroll reveals + auto-detect sections/cards for animation on every page.
 */
export function initReveals(root: HTMLElement | Document = document) {
  ensureGsap()

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    root
      .querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-item], section, .dd-card, .stat-chip')
      .forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    return () => {}
  }

  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []

  // Explicit stagger groups
  root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]')
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 48, scale: 0.96 })

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.07,
      ease: EASE,
      scrollTrigger: {
        trigger: group,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Explicit data-reveal
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-reveal-stagger]')) return

    const variant = el.getAttribute('data-reveal') || 'up'
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0') || 0
    const from: gsap.TweenVars = { opacity: 0 }
    if (variant === 'up') from.y = 56
    else if (variant === 'down') from.y = -36
    else if (variant === 'left') from.x = -64
    else if (variant === 'right') from.x = 64
    else if (variant === 'scale') {
      from.scale = 0.9
      from.y = 24
    }

    gsap.set(el, from)
    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.9,
      delay,
      ease: EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Auto: sections without data-reveal still animate in
  root.querySelectorAll<HTMLElement>('section').forEach((section, i) => {
    if (section.querySelector('[data-reveal], [data-hero], [data-reveal-stagger]')) return
    if (section.closest('[data-hero-bg]')) return

    gsap.set(section, { opacity: 0, y: 40 })
    const tween = gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay: Math.min(i * 0.02, 0.15),
      ease: EASE,
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Auto: orphan cards not in a stagger group
  root.querySelectorAll<HTMLElement>('.dd-card, .stat-chip').forEach((el, i) => {
    if (el.closest('[data-reveal-stagger]') || el.closest('[data-reveal]')) return
    if (el.hasAttribute('data-reveal-item')) return

    gsap.set(el, { opacity: 0, y: 36 })
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      delay: (i % 6) * 0.05,
      ease: EASE,
      scrollTrigger: {
        trigger: el,
        start: 'top 93%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Explicit parallax
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.15') || 0.15
    const tween = gsap.to(el, {
      yPercent: speed * 50,
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

  // Scrub fade for section-band blocks
  root.querySelectorAll<HTMLElement>('.section-band').forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { opacity: 0.55 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          end: 'top 45%',
          scrub: true,
        },
      }
    )
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  return () => {
    tweens.forEach((t) => t.kill())
    triggers.forEach((t) => t.kill())
  }
}

/**
 * Background layers move with page scroll (parallax atmosphere).
 */
export function initBackgroundScroll() {
  ensureGsap()
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []

  document.querySelectorAll<HTMLElement>('[data-bg-scroll]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-bg-scroll') || '0.25') || 0.25
    const tween = gsap.to(el, {
      y: () => window.innerHeight * speed * 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  // Orbs react to scroll
  document.querySelectorAll<HTMLElement>('[data-bg-orb]').forEach((el, i) => {
    const dir = i % 2 === 0 ? 1 : -1
    const tween = gsap.to(el, {
      y: dir * 120,
      x: dir * 40,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
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

  gsap.set(targets, { opacity: 0, y: 32 })

  const tl = gsap.timeline({ defaults: { ease: EASE } })
  targets.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-hero-delay') || '0') || 0
    tl.to(el, { opacity: 1, y: 0, duration: 0.95 }, 0.1 + delay)
  })

  const bg = root.querySelector<HTMLElement>('[data-hero-bg], [data-hero-video]')
  if (bg) {
    gsap.fromTo(bg, { scale: 1.14 }, { scale: 1.06, duration: 2.8, ease: EASE_SOFT })
  }

  return () => {
    tl.kill()
  }
}

export function initAmbientLoops(root: HTMLElement) {
  ensureGsap()
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  const tweens: gsap.core.Tween[] = []

  root.querySelectorAll<HTMLElement>('.dd-card, .dd-panel, .stat-chip').forEach((el, i) => {
    const t = gsap.to(el, {
      boxShadow:
        i % 2 === 0
          ? '0 0 28px rgba(255,77,26,0.18), 0 20px 50px rgba(0,0,0,0.35)'
          : '0 0 24px rgba(240,193,77,0.14), 0 18px 44px rgba(0,0,0,0.32)',
      duration: 2.8 + (i % 5) * 0.35,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: (i % 7) * 0.12,
    })
    tweens.push(t)
  })

  root.querySelectorAll<HTMLElement>('.media-frame img, .dd-card img').forEach((el, i) => {
    if (el.hasAttribute('data-hero-bg')) return
    const t = gsap.to(el, {
      scale: 1.07,
      duration: 7 + (i % 5),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: (i % 6) * 0.18,
    })
    tweens.push(t)
  })

  root.querySelectorAll<HTMLElement>('.eyebrow, .label-text, .sec-ornament span').forEach((el, i) => {
    const t = gsap.to(el, {
      opacity: 0.7,
      duration: 2 + (i % 3) * 0.35,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.1,
    })
    tweens.push(t)
  })

  root.querySelectorAll<HTMLElement>('h1, h2.display-lg, h2.display-md').forEach((el, i) => {
    const t = gsap.to(el, {
      textShadow: '0 0 48px rgba(255,77,26,0.22), 0 0 80px rgba(240,193,77,0.1)',
      duration: 3.5 + (i % 3),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.2,
    })
    tweens.push(t)
  })

  return () => {
    tweens.forEach((t) => t.kill())
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
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.5, ease: EASE_SOFT }
  )
}
