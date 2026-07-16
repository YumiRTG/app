import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleLine1 = useRef<HTMLDivElement>(null)
  const titleLine2 = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.23, 1, 0.32, 1)' } })

    tl.to(titleLine1.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
    })
    .to(titleLine2.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.4')
    .to(subtitleRef.current, {
      opacity: 0.8,
      y: 0,
      duration: 0.8,
    }, '-=0.4')
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.6,
    }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/hero-poster-mobile.jpg"
      >
        <source src="/hero-jungle-aerial.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 76, 97, 0.3) 0%, rgba(8, 76, 97, 0.6) 100%)',
        }}
      />

      {/* Text Content */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6">
        <h1 className="text-center">
          <div
            ref={titleLine1}
            className="font-display text-cream uppercase opacity-0 translate-y-10"
            style={{
              fontSize: 'clamp(80px, 12vw, 192px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
            }}
          >
            DINO
          </div>
          <div
            ref={titleLine2}
            className="font-display text-cream uppercase opacity-0 translate-y-10"
            style={{
              fontSize: 'clamp(80px, 12vw, 192px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
            }}
          >
            DOMINION
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="font-ui text-cream uppercase opacity-0 translate-y-4 mt-5 text-center"
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            letterSpacing: '0.15em',
          }}
        >
          ZÄHME. KÄMPFE. ÜBERLEBE.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center opacity-0"
      >
        <div className="relative w-[1px] h-10 bg-cream/30">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta animate-scroll-dot"
          />
        </div>
        <span
          className="font-ui text-cream/40 text-[10px] uppercase tracking-[0.1em] mt-2"
        >
          SCROLLEN
        </span>
      </div>
    </section>
  )
}
