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

export default function MainLayout() {
  const { pathname } = useLocation()
  useSmoothScroll()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    ensureGsap()
    // refresh triggers after route paint
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col bg-[var(--void)]">
        <div className="site-atmosphere" aria-hidden />

        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.22] animate-bg-drift"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('env-loading-scene-6.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.85) brightness(0.4) contrast(1.1)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(7,6,10,0.5) 0%, rgba(7,6,10,0.72) 40%, rgba(7,6,10,0.92) 100%)',
          }}
        />

        <div
          className="glow-orb-magma fixed w-[420px] h-[420px] -top-20 -right-20 z-0 opacity-40 animate-orb-float"
          aria-hidden
        />
        <div
          className="glow-orb-gold fixed w-[320px] h-[320px] bottom-[10%] -left-24 z-0 opacity-30 animate-orb-float-slow"
          aria-hidden
        />

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
