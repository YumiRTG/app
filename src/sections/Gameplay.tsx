import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asset } from '@/lib/assets'

gsap.registerPlugin(ScrollTrigger)

export default function Gameplay() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const title = titleRef.current
    const desc = descRef.current
    if (!section || !video || !title || !desc) return

    let triggerInstance: ScrollTrigger | null = null

    const setupScrollTrigger = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      triggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          video.currentTime = duration * (1 - progress)
        },
      })

      // Title character animation
      const chars = title.querySelectorAll('.char')
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          chars.forEach((char, i) => {
            const charStart = (i / chars.length) * 0.5
            const charEnd = charStart + (0.5 / chars.length)
            const charProgress = (progress - charStart) / (charEnd - charStart)
            const el = char as HTMLElement
            el.style.opacity = String(Math.max(0.1, Math.min(1, charProgress)))
          })
        },
      })

      // Description fade in
      gsap.fromTo(desc,
        { opacity: 0, y: 20 },
        {
          opacity: 0.8,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        }
      )
    }

    // Split title into characters
    const text = title.textContent || ''
    title.innerHTML = text
      .split('')
      .map(char => char === ' ' ? '<span class="char inline-block">&nbsp;</span>' : `<span class="char inline-block" style="opacity:0.1">${char}</span>`)
      .join('')

    video.addEventListener('loadedmetadata', setupScrollTrigger)
    if (video.readyState >= 1) setupScrollTrigger()

    return () => {
      video.removeEventListener('loadedmetadata', setupScrollTrigger)
      if (triggerInstance) triggerInstance.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="gameplay"
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          muted
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={asset('gameplay-sequence.mp4')} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(8, 76, 97, 0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[2] px-6">
          <h2
            ref={titleRef}
            className="font-display text-cream uppercase text-center"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            MASTER THE WILD
          </h2>
          <p
            ref={descRef}
            className="font-body text-cream/80 text-center mt-6 max-w-[560px]"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            Build your tribe, explore mysterious landscapes, and tame mighty dinosaurs that stand with you against rivals and the unforgiving wilderness.
          </p>
        </div>
      </div>
    </section>
  )
}
