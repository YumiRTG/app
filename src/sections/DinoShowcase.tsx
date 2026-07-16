import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DINOS = [
  'TYRANNOSAURUS REX',
  'TRICERATOPS',
  'VELOCIRAPTOR',
  'STEGOSAURUS',
  'PTERANODON',
  'BRACHIOSAURUS',
  'SPINOSAURUS',
  'ANKYLOSAURUS',
  'PARASAUROLOPHUS',
]

export default function DinoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cylinderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cylinder = cylinderRef.current
    const content = contentRef.current
    if (!section || !cylinder || !content) return

    // Cylinder fade in
    gsap.fromTo(cylinder,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Content slide in from right
    gsap.fromTo(content,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
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

  const itemCount = DINOS.length
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 180

  return (
    <section
      id="dinos"
      ref={sectionRef}
      className="section-light py-[160px] md:py-[240px] px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Cylinder (Left - 55%) */}
        <div className="w-full lg:w-[55%] relative" style={{ height: '400px' }}>
          {/* Vignette fades */}
          <div
            className="absolute top-0 left-0 right-0 h-[100px] z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #FEFAE0, transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(to top, #FEFAE0, transparent)' }}
          />

          <div
            ref={cylinderRef}
            className="absolute top-1/2 left-1/2 w-full"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'cylinder-rotate 20s linear infinite',
            }}
          >
            {DINOS.map((dino, i) => {
              const angle = (360 / itemCount) * i
              return (
                <div
                  key={dino}
                  className="absolute top-1/2 left-1/2 w-full text-center font-display text-terracotta uppercase backface-hidden"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    letterSpacing: '-0.01em',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    transform: `translate(-50%, -50%) rotateX(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  {dino}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content (Right - 45%) */}
        <div ref={contentRef} className="w-full lg:w-[45%] lg:pl-20">
          <span className="label-text text-sage">YOUR ARMY</span>
          <h2
            className="font-display text-teal uppercase mt-4"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            MIGHTY CREATURES
          </h2>
          <p
            className="font-body text-teal/80 mt-6 max-w-[480px]"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            From the crushing jaws of the T-Rex to the soaring wings of the Pteranodon — every dino has unique abilities that shape your strategy. Discover, tame, and train over 50 different species.
          </p>
          <button
            className="mt-10 bg-teal text-cream font-ui uppercase text-sm tracking-[0.06em] py-4 px-10 rounded-full hover:bg-[#0A5E78] transition-colors duration-300 cursor-pointer border-none"
            onClick={() => {}}
          >
            DISCOVER ALL DINOS
          </button>
        </div>
      </div>
    </section>
  )
}
