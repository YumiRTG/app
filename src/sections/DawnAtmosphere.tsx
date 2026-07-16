import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DawnAtmosphere() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const elements = content.querySelectorAll('.animate-in')
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="dawn"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-end"
    >
      {/* CSS Gradient Background as fallback / main visual */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a3a4a 0%, #084C61 30%, #E76F51 60%, #F4A261 80%, #FEFAE0 100%)',
        }}
      />

      {/* Animated clouds / haze overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(231, 111, 81, 0.4) 0%, transparent 60%)',
        }}
      />

      {/* Grain overlay specific to this section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] px-6 md:px-20 pb-[80px] md:pb-[120px] max-w-[600px]"
      >
        <span className="label-text text-cream/70 animate-in block">THE WORLD AWAKENS</span>
        <h2
          className="font-display text-cream uppercase mt-3 animate-in"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          A NEW AGE
        </h2>
        <p
          className="font-body text-cream/80 mt-5 animate-in"
          style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            lineHeight: 1.6,
          }}
        >
          Every sunrise brings new dangers and opportunities. Explore dense jungles, rugged mountains, and vast plains — each region holds its own secrets and deadliest creatures.
        </p>
        <button
          className="btn-secondary mt-8 animate-in"
        >
          EXPLORE THE WORLD
        </button>
      </div>
    </section>
  )
}
