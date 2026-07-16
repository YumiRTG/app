import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTADownload() {
  const sectionRef = useRef<HTMLElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const decor = decorRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    const buttons = buttonsRef.current
    if (!section || !decor || !headline || !sub || !buttons) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(decor.querySelectorAll('.decor-line'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'cubic-bezier(0.23, 1, 0.32, 1)', stagger: 0.1 }
    )
    .fromTo(headline,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      '-=0.3'
    )
    .fromTo(sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      '-=0.4'
    )
    .fromTo(buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      '-=0.3'
    )

    return () => { tl.kill() }
  }, [])

  return (
    <section
      id="download"
      ref={sectionRef}
      className="section-light py-[120px] md:py-[200px] px-6 md:px-20"
    >
      <div className="max-w-[800px] mx-auto text-center">
        {/* Decorative Lines */}
        <div ref={decorRef} className="flex items-center justify-center gap-6 mb-10">
          <div
            className="decor-line w-[120px] h-[1px] bg-sage origin-center"
            style={{ transform: 'scaleX(0)' }}
          />
          <div
            className="decor-line w-[120px] h-[1px] bg-sage origin-center"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-teal uppercase opacity-0"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          BECOME A LEGEND
        </h2>

        <p
          ref={subRef}
          className="font-body text-teal/70 mt-5 opacity-0"
          style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            lineHeight: 1.6,
          }}
        >
          Download Dino Dominion free and start building your prehistoric empire.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 opacity-0">
          {/* App Store */}
          <button className="bg-teal text-cream font-ui uppercase text-base tracking-[0.06em] py-[18px] px-10 rounded-full hover:bg-[#0A5E78] transition-colors duration-300 cursor-pointer border-none flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            App Store
          </button>

          {/* Google Play */}
          <button className="bg-transparent text-teal font-ui uppercase text-base tracking-[0.06em] py-[18px] px-10 rounded-full border-2 border-teal hover:bg-teal hover:text-cream transition-all duration-300 cursor-pointer flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
            </svg>
            Google Play
          </button>
        </div>
      </div>
    </section>
  )
}
