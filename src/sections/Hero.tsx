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
          BUILD · TAME · CONQUER
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mt-8 opacity-0 translate-y-4">
          <Link to="/download" className="btn-primary no-underline justify-center">
            DOWNLOAD APK
          </Link>
          <Link
            to="/roulette"
            className="btn-secondary no-underline justify-center"
          >
            PLAY ROULETTE
          </Link>
        </div>
      </div>
    </section>
  )
}
