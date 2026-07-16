import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { asset } from '@/lib/assets'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col">
        {/* Living jungle atmosphere — not pure black */}
        <div className="site-atmosphere" aria-hidden />
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.18]"
          aria-hidden
          style={{
            backgroundImage: `url(${asset('env-loading-scene-6.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.15) brightness(0.55)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(12,26,18,0.55) 0%, rgba(12,26,18,0.72) 45%, rgba(12,26,18,0.88) 100%)',
          }}
        />

        <div className="grain-overlay" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}
