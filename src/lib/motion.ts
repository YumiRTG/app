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

function forceVisible(el: HTMLElement) {
  gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' })
}

/**
 * Reliable scroll reveals — never leave black empty boxes.
 * Uses IntersectionObserver (works without Lenis/ScrollTrigger quirks).
 */
export function initReveals(root: HTMLElement | Document = document) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = Array.from(
    root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-item]')
  )

  if (prefersReduced) {
    targets.forEach(forceVisible)
    return () => {}
  }

  // Initial hidden state via class (CSS), not only GSAP
  targets.forEach((el) => {
    el.classList.add('reveal-pending')
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.classList.remove('reveal-pending')
        el.classList.add('reveal-in')
        observer.unobserve(el)
      })
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  targets.forEach((el) => observer.observe(el))

  // Safety net: never stay invisible
  const safety = window.setTimeout(() => {
    targets.forEach((el) => {
      if (el.classList.contains('reveal-pending')) {
        el.classList.remove('reveal-pending')
        el.classList.add('reveal-in')
      }
    })
  }, 2500)

  // Optional GSAP parallax only (does not hide content)
  ensureGsap()
  const tweens: gsap.core.Tween[] = []
  const triggers: ScrollTrigger[] = []

  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.12') || 0.12
    const tween = gsap.to(el, {
      yPercent: speed * 30,
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
    window.clearTimeout(safety)
    observer.disconnect()
    tweens.forEach((t) => t.kill())
    triggers.forEach((t) => t.kill())
  }
}

export function initBackgroundScroll() {
  ensureGsap()
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []

  document.querySelectorAll<HTMLElement>('[data-bg-scroll]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-bg-scroll') || '0.2') || 0.2
    const tween = gsap.to(el, {
      y: () => Math.min(window.innerHeight * speed * 0.25, 120),
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })
    tweens.push(tween)
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  })

  document.querySelectorAll<HTMLElement>('[data-bg-orb]').forEach((el, i) => {
    const dir = i % 2 === 0 ? 1 : -1
    const tween = gsap.to(el, {
      y: dir * 80,
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

  // CSS class based — always ends visible
  targets.forEach((el) => {
    el.classList.add('hero-pending')
  })

  const tl = gsap.timeline({ defaults: { ease: EASE } })
  targets.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-hero-delay') || '0') || 0
    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        onStart: () => {
          el.classList.remove('hero-pending')
        },
        onComplete: () => {
          el.classList.remove('hero-pending')
          gsap.set(el, { clearProps: 'transform' })
        },
      },
      0.08 + delay
    )
  })

  // Force visible if something goes wrong
  const safety = window.setTimeout(() => {
    targets.forEach((el) => {
      el.classList.remove('hero-pending')
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
    })
  }, 2000)

  const bg = root.querySelector<HTMLElement>('[data-hero-bg]')
  if (bg) {
    gsap.fromTo(bg, { scale: 1.1 }, { scale: 1.04, duration: 2.2, ease: EASE_SOFT })
  }

  return () => {
    window.clearTimeout(safety)
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

  // Mild image drift only — no opacity hide
  root.querySelectorAll<HTMLElement>('.media-frame img, .dd-card img').forEach((el, i) => {
    if (el.hasAttribute('data-hero-bg')) return
    const t = gsap.to(el, {
      scale: 1.05,
      duration: 8 + (i % 4),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: (i % 5) * 0.2,
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
    { opacity: 0.4, y: 12 },
    { opacity: 1, y: 0, duration: 0.45, ease: EASE_SOFT }
  )
}
