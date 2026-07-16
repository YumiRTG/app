import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DailyLogin from '@/sections/DailyLogin'
import Roulette from '@/sections/Roulette'
import { useAuth } from '@/hooks/useAuth'

export default function PlayPage() {
  const { session } = useAuth()
  const [tab, setTab] = useState<'daily' | 'roulette'>('daily')

  useEffect(() => {
    // Prefer daily when logged in for first visit
    if (session) setTab('daily')
  }, [session?.accountId])

  return (
    <div className="page-shell px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="eyebrow">Free player rewards</p>
          <h1 className="display-lg text-white mt-4">
            Play hub
          </h1>
          <p className="body-lg mt-4">
            Log in with your Account ID, then claim daily speed ups or spin the
            roulette. Rewards transfer into your game inventory.
          </p>
          {!session && (
            <Link
              to="/play?login=1"
              className="btn-primary no-underline mt-6 inline-flex"
            >
              Log in to unlock
            </Link>
          )}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {(
            [
              { id: 'daily' as const, label: 'Daily login' },
              { id: 'roulette' as const, label: 'Roulette' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="font-ui text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-full border cursor-pointer transition-colors"
              style={{
                background: tab === t.id ? 'rgba(232,93,4,0.2)' : 'transparent',
                borderColor: tab === t.id ? '#e85d04' : 'rgba(255,255,255,0.12)',
                color: tab === t.id ? '#e9b44c' : '#c4b89a',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-[1.5rem] overflow-hidden border border-white/[0.06]">
          {tab === 'daily' ? <DailyLogin /> : <Roulette />}
        </div>
      </div>
    </div>
  )
}
