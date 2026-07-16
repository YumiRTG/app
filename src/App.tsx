import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Features from './sections/Features'
import Gameplay from './sections/Gameplay'
import CharacterSpotlight from './sections/CharacterSpotlight'
import Troops from './sections/Troops'
import DinoShowcase from './sections/DinoShowcase'
import WorldRealms from './sections/WorldRealms'
import DawnAtmosphere from './sections/DawnAtmosphere'
import Gallery from './sections/Gallery'
import CTADownload from './sections/CTADownload'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

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
      <div className="grain-overlay" />

      <Navigation onNavigate={handleNavigate} />

      <main>
        <Hero />
        <Manifesto />
        <Features />
        <Gameplay />
        <CharacterSpotlight />
        <Troops />
        <DinoShowcase />
        <DawnAtmosphere />
        <WorldRealms />
        <Gallery />
        <CTADownload />
      </main>

      <Footer />
    </div>
  )
}
