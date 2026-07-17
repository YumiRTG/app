import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SupportChat from '@/components/SupportChat'
import PageTransition from '@/components/PageTransition'
import { asset } from '@/lib/assets'
import { useSmoothScroll } from '@/hooks/useMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap, initBackgroundScroll } from '@/lib/motion'

const PARTICLES = Array.from({ length: 52 }, (_, i) => ({
  left: `${(i * 9 + 2) % 100}%`,
  delay: `${(i * 0.32) % 16}s`,
  duration: `${8 + (i % 12)}s`,
  size: i % 5 === 0 ? 3 : 2,
}))

export default function MainLayout() {
  const { pathname } = useLocation()
  useSmoothScroll()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    ensureGsap()
    const killBg = initBackgroundScroll()
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => {
      window.clearTimeout(t)
      killBg()
    }
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col bg-[var(--void)]">
        <div className="site-atmosphere" aria-hidden />

        {/* Parallax background stack */}
        <div
          data-bg-scroll="0.35"
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.4] will-change-transform"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('fx-void-bg.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
            filter: 'brightness(0.55) saturate(1.25)',
            transform: 'scale(1.12)',
          }}
        />
        <div
          data-bg-scroll="0.55"
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.16] will-change-transform"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('env-loading-scene-6.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.85) brightness(0.4)',
            transform: 'scale(1.15)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(5,4,10,0.3) 0%, rgba(5,4,10,0.62) 40%, rgba(5,4,10,0.94) 100%)',
          }}
        />

        {/* Animated fog bands */}
        <div className="fx-fog fx-fog-a" aria-hidden />
        <div className="fx-fog fx-fog-b" aria-hidden />

        <div
          data-bg-orb
          className="glow-orb-magma fixed w-[480px] h-[480px] -top-24 -right-16 z-0 opacity-45 animate-orb-float will-change-transform"
          aria-hidden
        />
        <div
          data-bg-orb
          className="fixed w-[380px] h-[380px] bottom-[8%] -left-20 z-0 opacity-40 animate-orb-float-slow rounded-full pointer-events-none will-change-transform"
          aria-hidden
          style={{
            background: 'radial-gradient(circle, rgba(79,143,99,0.5), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          data-bg-orb
          className="fixed w-[300px] h-[300px] top-[40%] left-[40%] z-0 opacity-25 animate-orb-drift rounded-full pointer-events-none will-change-transform"
          aria-hidden
          style={{
            background: 'radial-gradient(circle, rgba(240,193,77,0.4), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="fx-light-sweep" aria-hidden />

        <div className="fx-particles" aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="grain-overlay" />
        <div className="site-vignette" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <PageTransition />
          <SupportChat />
        </div>
      </div>
    </AuthProvider>
  )
}
