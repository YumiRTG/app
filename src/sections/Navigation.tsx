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
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    if (params.get('login') === '1') setLoginOpen(true)
  }, [params])

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
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-4">
          <nav
            className="flex items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 h-14 sm:h-16"
            style={{
              background: 'rgba(20, 53, 36, 0.78)',
              border: '1px solid rgba(240, 193, 77, 0.22)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.28)',
            }}
          >
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline shrink-0"
              onClick={() => setOpen(false)}
            >
              <span className="text-[#e9b44c]">
                <DinoMark className="w-7 h-7" />
              </span>
              <span className="font-display text-[0.95rem] sm:text-lg tracking-[0.12em] text-[#f0e6d0]">
                DINO DOMINION
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-7">
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

            <div className="hidden sm:flex items-center gap-3">
              {ready && session ? (
                <>
                  <div className="text-right max-w-[140px]">
                    <p className="font-ui text-[11px] tracking-wider uppercase text-[#f0e6d0] truncate">
                      {session.displayName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="font-ui text-[11px] uppercase tracking-wider text-[#c4b89a] border border-white/10 rounded-full px-3 py-1.5 hover:border-[#e9b44c]/50 hover:text-[#e9b44c] transition-colors bg-transparent cursor-pointer"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="font-ui text-[11px] uppercase tracking-wider text-[#f0e6d0] border border-white/15 rounded-full px-4 py-1.5 hover:border-[#e9b44c] hover:text-[#e9b44c] transition-colors bg-transparent cursor-pointer"
                >
                  Log in
                </button>
              )}
              <Link to="/download" className="btn-primary !py-2.5 !px-5 !text-[0.72rem] no-underline">
                Get APK
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5 bg-[#f0e6d0]" />
              <span className="block w-5 h-0.5 bg-[#f0e6d0]" />
              <span className="block w-5 h-0.5 bg-[#f0e6d0]" />
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[99] lg:hidden pt-24 px-6 pb-10 overflow-y-auto"
          style={{ background: 'rgba(5,8,7,0.96)' }}
        >
          <div className="flex flex-col gap-5 max-w-sm mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl uppercase tracking-wide text-[#f0e6d0] no-underline hover:text-[#e9b44c]"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="font-ui text-left text-[#e85d04] uppercase tracking-wider bg-transparent border-none cursor-pointer text-sm"
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
                className="font-ui text-left text-[#e9b44c] uppercase tracking-wider bg-transparent border-none cursor-pointer text-sm"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      )}

      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  )
}
