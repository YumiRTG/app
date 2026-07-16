import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import LoginModal from '@/components/LoginModal'

interface NavigationProps {
  onNavigate: (section: string) => void
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const { session, logout, ready } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.35)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Deep link: #login opens the modal
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#login') setLoginOpen(true)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const navItems = [
    { label: 'FEATURES', section: 'features' },
    { label: 'HEROES', section: 'heroes' },
    { label: 'DINOS', section: 'dinos' },
    { label: 'WORLD', section: 'world' },
    { label: 'APK', section: 'apk' },
  ]

  const handleNavClick = (section: string) => {
    onNavigate(section)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(8, 76, 97, 0.94)' : 'rgba(8, 76, 97, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(254, 250, 224, 0.15)'
            : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 xl:px-20 max-w-[1728px] mx-auto">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group bg-transparent border-none cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-terracotta"></span>
            <span className="font-display text-cream text-lg md:text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="nav-link bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {ready && session ? (
              <>
                <div className="flex flex-col items-end mr-1">
                  <span className="font-ui text-cream text-xs tracking-wider uppercase">
                    {session.displayName}
                  </span>
                  <span className="font-body text-cream/55 text-[11px] tracking-wide">
                    {session.accountId}
                    {session.source === 'firebase' ? ' · cloud' : ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-transparent text-cream/80 border border-cream/30 font-ui text-xs uppercase tracking-wider py-2.5 px-4 rounded-full cursor-pointer hover:border-cream hover:text-cream transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="bg-transparent text-cream border border-cream/40 font-ui text-xs uppercase tracking-wider py-2.5 px-5 rounded-full cursor-pointer hover:bg-cream hover:text-teal transition-colors"
              >
                Log in
              </button>
            )}
            <button
              onClick={() => handleNavClick('apk')}
              className="btn-primary text-sm py-3 px-7"
            >
              GET APK
            </button>
          </div>

          <button
            className="lg:hidden flex flex-col gap-[6px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[99] lg:hidden transition-transform duration-[600ms]"
        style={{
          backgroundColor: '#FEFAE0',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7 px-6">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => handleNavClick(item.section)}
              className="font-display text-teal text-4xl uppercase tracking-tight bg-transparent border-none cursor-pointer hover:text-terracotta transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}

          {ready && session ? (
            <div className="text-center mt-2">
              <p className="font-ui text-teal text-sm tracking-wider uppercase">
                {session.displayName}
              </p>
              <p className="font-body text-teal/50 text-xs mt-1 tracking-wide">
                {session.accountId}
              </p>
              <button
                type="button"
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="mt-4 font-ui text-terracotta text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setLoginOpen(true)
              }}
              className="font-display text-teal text-3xl uppercase tracking-tight bg-transparent border-none cursor-pointer hover:text-terracotta"
            >
              Log in
            </button>
          )}

          <button onClick={() => handleNavClick('apk')} className="btn-primary mt-4 text-lg">
            GET APK
          </button>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
