import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function MainLayout() {
  const location = useLocation()

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col">
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
