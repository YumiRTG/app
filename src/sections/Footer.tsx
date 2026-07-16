import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GAME_LINKS = ['Features', 'Dinos', 'World', 'Gameplay']
const COMMUNITY_LINKS = ['Discord', 'Forum', 'Wiki', 'Support']

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const columns = footer.querySelectorAll('.footer-col')
    gsap.fromTo(columns,
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
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === footer) st.kill()
      })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="section-dark pt-20 pb-10 px-6 md:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Row - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="footer-col opacity-0">
            <span className="font-display text-cream text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
            <p className="font-body text-cream/50 text-sm mt-3">
              TAME. FIGHT. SURVIVE.
            </p>
          </div>

          {/* Game Links */}
          <div className="footer-col opacity-0">
            <span className="label-text text-cream/50 mb-4 block">GAME</span>
            <ul className="space-y-2">
              {GAME_LINKS.map(link => (
                <li key={link}>
                  <button
                    className="font-body text-cream/80 text-base bg-transparent border-none cursor-pointer hover:text-cream transition-colors duration-300"
                    style={{ lineHeight: 2.2 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="footer-col opacity-0">
            <span className="label-text text-cream/50 mb-4 block">COMMUNITY</span>
            <ul className="space-y-2">
              {COMMUNITY_LINKS.map(link => (
                <li key={link}>
                  <button
                    className="font-body text-cream/80 text-base bg-transparent border-none cursor-pointer hover:text-cream transition-colors duration-300"
                    style={{ lineHeight: 2.2 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-cream/10 my-16" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-body text-cream/40 text-xs">
            © 2025 Dino Dominion. All rights reserved.
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

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Discord */}
            <button className="text-cream/40 hover:text-terracotta transition-colors duration-300 bg-transparent border-none cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </button>
            {/* X / Twitter */}
            <button className="text-cream/40 hover:text-terracotta transition-colors duration-300 bg-transparent border-none cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            {/* Instagram */}
            <button className="text-cream/40 hover:text-terracotta transition-colors duration-300 bg-transparent border-none cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </button>
            {/* YouTube */}
            <button className="text-cream/40 hover:text-terracotta transition-colors duration-300 bg-transparent border-none cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
