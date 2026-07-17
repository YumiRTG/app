import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SupportChat from '@/components/SupportChat'
import { asset } from '@/lib/assets'
import { useSmoothScroll } from '@/hooks/useMotion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '@/lib/motion'

const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  left: `${(i * 9 + 2) % 100}%`,
  delay: `${(i * 0.35) % 16}s`,
  duration: `${8 + (i % 12)}s`,
  size: i % 5 === 0 ? 3 : 2,
}))

export default function MainLayout() {
  const { pathname } = useLocation()
  useSmoothScroll()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    ensureGsap()
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col bg-[var(--void)]">
        <div className="site-atmosphere" aria-hidden />

        {/* Premium void texture */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.35] animate-bg-drift"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('fx-void-bg.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
            filter: 'brightness(0.55) saturate(1.2)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.12]"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('env-loading-scene-6.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.7) brightness(0.35)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(5,4,10,0.35) 0%, rgba(5,4,10,0.65) 40%, rgba(5,4,10,0.92) 100%)',
          }}
        />

        <div
          className="glow-orb-magma fixed w-[480px] h-[480px] -top-24 -right-16 z-0 opacity-40 animate-orb-float"
          aria-hidden
        />
        <div
          className="fixed w-[380px] h-[380px] bottom-[8%] -left-20 z-0 opacity-35 animate-orb-float-slow rounded-full pointer-events-none"
          aria-hidden
          style={{
            background: 'radial-gradient(circle, rgba(79,143,99,0.45), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="fixed w-[300px] h-[300px] top-[40%] left-[40%] z-0 opacity-20 animate-orb-drift rounded-full pointer-events-none"
          aria-hidden
          style={{
            background: 'radial-gradient(circle, rgba(240,193,77,0.35), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Continuous light sweep */}
        <div className="fx-light-sweep" aria-hidden />

        {/* Rising particles — always on */}
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
          <SupportChat />
        </div>
      </div>
    </AuthProvider>
  )
}
