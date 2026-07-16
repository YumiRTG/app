import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const text = el.textContent || ''
    const words = text.split(' ')
    el.innerHTML = words
      .map(word => `<span class="inline-block opacity-0 translate-y-[10px]" style="transition: none;">${word}</span>`)
      .join(' ')

    const wordSpans = el.querySelectorAll('span')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-light py-[120px] md:py-[200px] px-6 md:px-20"
    >
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Decorative Element */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-[60px] h-[1px] bg-sage" />
          <div className="w-2 h-2 rounded-full bg-terracotta mx-3" />
          <div className="w-[60px] h-[1px] bg-sage" />
        </div>

        {/* Manifesto Text */}
        <p
          ref={textRef}
          className="font-display text-teal uppercase text-center"
          style={{
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          EINE WELT, IN DER DIE STÄRKSTEN NICHT ÜBERLEBEN — SONDERN DIE ANPASSUNGSFÄHIGSTEN. IN DINO DOMINION BAUST DU DEINEN STAMM AUF, ZÄHMST MACHTVOLLE KREATUREN UND FÜHRST DEIN VOLK DURCH EINE LEBENDIGE PRÄHISTORISCHE WELT VOLLER GEFAHREN UND WUNDER.
        </p>
      </div>
    </section>
  )
}
