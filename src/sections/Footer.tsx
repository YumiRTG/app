import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GAME_LINKS = [
  { label: 'Features', section: 'features' },
  { label: 'Heroes', section: 'heroes' },
  { label: 'Army', section: 'army' },
  { label: 'Dinosaurs', section: 'dinos' },
  { label: 'World', section: 'world' },
  { label: 'Download APK', section: 'apk' },
]

const COMMUNITY_LINKS = ['Discord', 'Forum', 'Wiki', 'Support']

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const columns = footer.querySelectorAll('.footer-col')
    gsap.fromTo(
      columns,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === footer) st.kill()
      })
    }
  }, [])

  const scrollTo = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="section-dark pt-20 pb-10 px-6 md:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="footer-col opacity-0">
            <span className="font-display text-cream text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
            <p className="font-body text-cream/50 text-sm mt-3 leading-relaxed max-w-[280px]">
              Prehistoric strategy survival. Build your base, command heroes, tame dinosaurs,
              and conquer the campaign.
            </p>
            <p className="font-ui text-terracotta text-xs mt-4 tracking-[0.12em] uppercase">
              Tame. Fight. Survive.
            </p>
          </div>

          <div className="footer-col opacity-0">
            <span className="label-text text-cream/50 mb-4 block">GAME</span>
            <ul className="space-y-1">
              {GAME_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.section)}
                    className="font-body text-cream/80 text-base bg-transparent border-none cursor-pointer hover:text-cream transition-colors duration-300 py-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col opacity-0">
            <span className="label-text text-cream/50 mb-4 block">COMMUNITY</span>
            <ul className="space-y-1">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link}>
                  <button className="font-body text-cream/80 text-base bg-transparent border-none cursor-pointer hover:text-cream transition-colors duration-300 py-1">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-cream/10 my-14" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-body text-cream/40 text-xs">
            © {new Date().getFullYear()} Dino Dominion. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Legal Notice', 'Terms of Use'].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <button className="font-body text-cream/40 text-xs bg-transparent border-none cursor-pointer hover:text-cream/70 transition-colors duration-300">
                  {item}
                </button>
                {i < 2 && <span className="text-cream/20">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
