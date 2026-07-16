import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Gameplay from './sections/Gameplay'
import DinoShowcase from './sections/DinoShowcase'
import DawnAtmosphere from './sections/DawnAtmosphere'
import Gallery from './sections/Gallery'
import CharacterSpotlight from './sections/CharacterSpotlight'
import CTADownload from './sections/CTADownload'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after all content loads
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  const handleNavigate = useCallback((section: string) => {
    const lenis = lenisRef.current
    if (!lenis) return

    const target = document.getElementById(section)
    if (target) {
      lenis.scrollTo(target, { offset: 0, duration: 1.5 })
    }
  }, [])

  return (
    <div className="relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content */}
      <main>
        <Hero />
        <Manifesto />
        <Gameplay />
        <DinoShowcase />
        <DawnAtmosphere />
        <Gallery />
        <CharacterSpotlight />
        <CTADownload />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
