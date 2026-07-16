import { useState, useEffect } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import LoginModal from '@/components/LoginModal'

const navItems = [
  { label: 'FEATURES', to: '/features' },
  { label: 'HEROES', to: '/heroes' },
  { label: 'DINOS', to: '/dinos' },
  { label: 'WORLD', to: '/world' },
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

  // Open login via ?login=1
  useEffect(() => {
    if (searchParams.get('login') === '1') {
      setLoginOpen(true)
    }
  }, [searchParams])

  const closeLogin = () => {
    setLoginOpen(false)
    if (searchParams.get('login')) {
      searchParams.delete('login')
      setSearchParams(searchParams, { replace: true })
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link bg-transparent border-none cursor-pointer no-underline ${
      isActive ? 'text-terracotta' : ''
    }`

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(8, 76, 97, 0.96)' : 'rgba(8, 76, 97, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(254, 250, 224, 0.12)',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8 xl:px-16 max-w-[1728px] mx-auto gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-3 h-3 rounded-full bg-terracotta" />
            <span className="font-display text-cream text-lg md:text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-wrap justify-center">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {ready && session ? (
              <>
                <div className="flex flex-col items-end mr-1 max-w-[140px]">
                  <span className="font-ui text-cream text-xs tracking-wider uppercase truncate w-full text-right">
                    {session.displayName}
                  </span>
                  <span className="font-body text-cream/55 text-[10px] tracking-wide truncate w-full text-right">
                    {session.accountId}
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
            <Link to="/download" className="btn-primary text-sm py-3 px-6 no-underline">
              GET APK
            </Link>
          </div>

          <button
            className="xl:hidden flex flex-col gap-[6px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] bg-cream transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      <div
        className="fixed inset-0 z-[99] xl:hidden transition-transform duration-[600ms] overflow-y-auto"
        style={{
          backgroundColor: '#FEFAE0',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-full gap-5 px-6 py-24">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-teal text-3xl uppercase no-underline hover:text-terracotta"
          >
            Home
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="font-display text-teal text-3xl uppercase tracking-tight no-underline hover:text-terracotta transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {ready && session ? (
            <div className="text-center mt-2">
              <p className="font-ui text-teal text-sm tracking-wider uppercase">
                {session.displayName}
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
              className="font-display text-teal text-2xl uppercase bg-transparent border-none cursor-pointer hover:text-terracotta"
            >
              Log in
            </button>
          )}

          <Link
            to="/download"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 text-lg no-underline"
          >
            GET APK
          </Link>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  )
}
