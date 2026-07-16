import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SupportChat from '@/components/SupportChat'
import { asset } from '@/lib/assets'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col bg-[var(--void)]">
        <div className="site-atmosphere" aria-hidden />

        {/* Cinematic background art — desaturated, dark */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.22]"
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

        {/* Magma + biolume glow orbs */}
        <div
          className="glow-orb-magma fixed w-[420px] h-[420px] -top-20 -right-20 z-0 opacity-40"
          aria-hidden
        />
        <div
          className="glow-orb-gold fixed w-[320px] h-[320px] bottom-[10%] -left-24 z-0 opacity-30"
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
