import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { asset } from '@/lib/assets'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleLine1 = useRef<HTMLDivElement>(null)
  const titleLine2 = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video — from game Intro */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster={asset('hero-poster.png')}
      >
        <source src={asset('hero-intro.mp4')} type="video/mp4" />
      </video>

      {/* Jungle / ember overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,38,28,0.35) 0%, rgba(6,38,28,0.55) 50%, rgba(11,61,46,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(196,92,38,0.25), transparent 70%)',
        }}
      />

      {/* Text Content */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6">
        <p className="label-text text-amber mb-4 opacity-90 tracking-[0.25em]">
          PREHISTORIC STRATEGY
        </p>
        <h1 className="text-center">
          <div
            ref={titleLine1}
            className="font-display text-cream uppercase opacity-0 translate-y-10"
            style={{
              fontSize: 'clamp(80px, 12vw, 192px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 40px rgba(0,0,0,0.45)',
            }}
          >
            DINO
          </div>
          <div
            ref={titleLine2}
            className="font-display uppercase opacity-0 translate-y-10"
            style={{
              fontSize: 'clamp(80px, 12vw, 192px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#D4A15A',
              textShadow: '0 4px 40px rgba(0,0,0,0.45)',
            }}
          >
            DOMINION
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="font-ui text-cream uppercase opacity-0 translate-y-4 mt-5 text-center"
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            letterSpacing: '0.2em',
          }}
        >
          TAME · HUNT · CONQUER
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mt-8 opacity-0 translate-y-4">
          <Link to="/download" className="btn-primary no-underline justify-center">
            DOWNLOAD APK
          </Link>
          <Link to="/features" className="btn-secondary no-underline justify-center">
            FEATURES
          </Link>
        </div>
      </div>
    </section>
  )
}
