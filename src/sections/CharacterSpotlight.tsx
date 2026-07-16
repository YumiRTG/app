import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { label: 'STÄRKE', value: 88 },
  { label: 'WEISHEIT', value: 92 },
  { label: 'MUT', value: 95 },
]

export default function CharacterSpotlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    if (!section || !image || !content) return

    // Image slide in from left
    gsap.fromTo(image,
      { opacity: 0, x: -60 },
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

    // Content slide in from right
    gsap.fromTo(content,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Parallax on image
    gsap.to(image.querySelector('img'), {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-dark py-[120px] md:py-[200px] px-6 md:px-20"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Left - Character Image (60%) */}
        <div className="w-full md:w-[60%]">
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-[4px]"
            style={{ aspectRatio: '3/4', maxHeight: '700px' }}
          >
            <img
              src="/character-kira.jpg"
              alt="Kira, Stammesführerin"
              className="w-full h-full object-cover scale-110"
              style={{ transform: 'translateY(-40px) scale(1.1)' }}
            />
          </div>
        </div>

        {/* Right - Character Info (40%) */}
        <div ref={contentRef} className="w-full md:w-[40%] flex flex-col justify-center">
          <span className="label-text text-sage">DEIN PROTAGONIST</span>
          <h2
            className="font-display text-cream uppercase mt-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            KIRA, STAMMESFÜHRERIN
          </h2>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-terracotta mt-6" />

          <p
            className="font-body text-cream/80 mt-6 max-w-[440px]"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              lineHeight: 1.7,
            }}
          >
            Als junge Anführerin eines zersplitterten Stammes musst du gegen die Elemente, wilde Bestien und rivalisierende Clans bestehen. Deine Entscheidungen prägen das Schicksal deines Volkes.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-0 mt-10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-6 md:px-8">
                  <span className="label-text text-sage text-[10px]">{stat.label}</span>
                  <span
                    className="font-display text-terracotta mt-1"
                    style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
                  >
                    {stat.value}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-[1px] h-12 bg-cream/15" />
                )}
              </div>
            ))}
          </div>

          <button
            className="btn-primary mt-12 w-fit"
          >
            MEHR ERFAHREN
          </button>
        </div>
      </div>
    </section>
  )
}
