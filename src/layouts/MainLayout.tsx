import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col bg-[#050807]">
        <div className="grain-overlay" />
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
