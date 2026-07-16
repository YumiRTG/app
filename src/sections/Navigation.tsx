import { useState, useEffect } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import LoginModal from '@/components/LoginModal'

/** Every button = its own single page */
const navItems = [
  { label: 'HOME', to: '/' },
  { label: 'STORY', to: '/story' },
  { label: 'FEATURES', to: '/features' },
  { label: 'GAMEPLAY', to: '/gameplay' },
  { label: 'HEROES', to: '/heroes' },
  { label: 'ARMY', to: '/army' },
  { label: 'DINOS', to: '/dinos' },
  { label: 'WORLD', to: '/world' },
  { label: 'REALMS', to: '/realms' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'DAILY', to: '/daily' },
  { label: 'ROULETTE', to: '/roulette' },
  { label: 'DOWNLOAD', to: '/download' },
]

export default function Navigation() {
  const { session, logout, ready } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchParams.get('login') === '1') setLoginOpen(true)
  }, [searchParams])

  const closeLogin = () => {
    setLoginOpen(false)
    if (searchParams.get('login')) {
      searchParams.delete('login')
      setSearchParams(searchParams, { replace: true })
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link bg-transparent border-none cursor-pointer no-underline whitespace-nowrap text-[11px] xl:text-xs 2xl:text-sm ${
      isActive ? 'text-terracotta after:scale-x-100' : ''
    }`

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(8, 76, 97, 0.97)' : 'rgba(8, 76, 97, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(254, 250, 224, 0.12)',
        }}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-3 md:px-5 max-w-[1800px] mx-auto gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
            <span className="font-display text-cream text-base md:text-lg tracking-[0.08em]">
              DINO DOMINION
            </span>
          </Link>

          {/* Desktop: every tab is its own page */}
          <div className="hidden 2xl:flex items-center gap-3 flex-1 justify-center overflow-x-auto px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {ready && session ? (
              <>
                <div className="flex flex-col items-end mr-1 max-w-[120px]">
                  <span className="font-ui text-cream text-[11px] tracking-wider uppercase truncate w-full text-right">
                    {session.displayName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-transparent text-cream/80 border border-cream/30 font-ui text-[10px] uppercase tracking-wider py-2 px-3 rounded-full cursor-pointer hover:border-cream"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="bg-transparent text-cream border border-cream/40 font-ui text-[10px] uppercase tracking-wider py-2 px-4 rounded-full cursor-pointer hover:bg-cream hover:text-teal"
              >
                Log in
              </button>
            )}
          </div>

          <button
            className="2xl:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none' }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Full menu: every single page */}
      <div
        className="fixed inset-0 z-[99] 2xl:hidden transition-transform duration-[500ms] overflow-y-auto"
        style={{
          backgroundColor: '#FEFAE0',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-full gap-4 px-6 py-20">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="font-display text-teal text-2xl sm:text-3xl uppercase tracking-tight no-underline hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}

          {ready && session ? (
            <button
              type="button"
              onClick={() => {
                logout()
                setMenuOpen(false)
              }}
              className="mt-4 font-ui text-terracotta text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer"
            >
              Log out ({session.displayName})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setLoginOpen(true)
              }}
              className="mt-4 font-display text-teal text-xl uppercase bg-transparent border-none cursor-pointer hover:text-terracotta"
            >
              Log in
            </button>
          )}
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  )
}
