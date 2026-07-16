import { useEffect, useState } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import LoginModal from '@/components/LoginModal'
import DinoMark from '@/components/DinoMark'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Story', to: '/story' },
  { label: 'Features', to: '/features' },
  { label: 'Play', to: '/play' },
  { label: 'Bestiary', to: '/bestiary' },
  { label: 'Download', to: '/download' },
]

export default function Navigation() {
  const { session, logout, ready } = useAuth()
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    if (params.get('login') === '1') setLoginOpen(true)
  }, [params])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeLogin = () => {
    setLoginOpen(false)
    if (params.get('login')) {
      params.delete('login')
      setParams(params, { replace: true })
    }
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100]">
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled
              ? 'linear-gradient(180deg, rgba(7,6,10,0.94) 0%, rgba(7,6,10,0.88) 100%)'
              : 'linear-gradient(180deg, rgba(7,6,10,0.75) 0%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
            borderBottom: scrolled
              ? '1px solid rgba(245,193,93,0.12)'
              : '1px solid transparent',
            boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          <nav className="container-dd flex items-center justify-between gap-4 h-16 sm:h-[4.25rem]">
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline shrink-0 group"
              onClick={() => setOpen(false)}
            >
              <span className="text-[var(--gold)] group-hover:text-[var(--magma-glow)] transition-colors">
                <DinoMark className="w-8 h-8" />
              </span>
              <div className="leading-none">
                <span className="font-display text-[0.95rem] sm:text-lg tracking-[0.14em] text-[var(--bone)] block">
                  DINO DOMINION
                </span>
                <span className="hidden sm:block font-ui text-[9px] tracking-[0.28em] text-[var(--gold)]/70 uppercase mt-0.5">
                  Prehistoric strategy
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `nav-link no-underline ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2.5">
              {ready && session ? (
                <>
                  <div className="text-right max-w-[140px] px-2">
                    <p className="font-ui text-[10px] tracking-wider uppercase text-[var(--gold)]/80">
                      Commander
                    </p>
                    <p className="font-ui text-[12px] tracking-wider uppercase text-[var(--bone)] truncate">
                      {session.displayName}
                    </p>
                  </div>
                  <button type="button" onClick={logout} className="btn-ghost">
                    Log out
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setLoginOpen(true)} className="btn-ghost">
                  Log in
                </button>
              )}
              <Link
                to="/download"
                className="btn-primary !py-2.5 !px-4 !text-[0.7rem] no-underline"
              >
                Get APK
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-0.5 bg-[var(--bone)] transition-transform origin-center"
                style={{ transform: open ? 'translateY(4px) rotate(45deg)' : undefined }}
              />
              <span
                className="block w-6 h-0.5 bg-[var(--bone)] transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-6 h-0.5 bg-[var(--bone)] transition-transform origin-center"
                style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : undefined }}
              />
            </button>
          </nav>
          <div className="hud-line opacity-60" />
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[99] lg:hidden pt-20 px-6 pb-10 overflow-y-auto"
          style={{
            background:
              'linear-gradient(165deg, rgba(7,6,10,0.98) 0%, rgba(20,12,16,0.98) 100%)',
          }}
        >
          <div className="flex flex-col gap-1 max-w-sm mx-auto">
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl uppercase tracking-wide text-[var(--bone)] no-underline hover:text-[var(--gold)] py-2 border-b border-white/5"
                style={{ animation: `rise-in 0.4s ease ${i * 0.05}s both` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="btn-secondary w-full"
                >
                  Log out · {session.displayName}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setLoginOpen(true)
                  }}
                  className="btn-secondary w-full"
                >
                  Log in
                </button>
              )}
              <Link
                to="/download"
                onClick={() => setOpen(false)}
                className="btn-primary no-underline w-full"
              >
                Download APK
              </Link>
            </div>
          </div>
        </div>
      )}

      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  )
}
