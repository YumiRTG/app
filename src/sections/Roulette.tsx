import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import {
  ROULETTE_PRIZES,
  pickWeightedPrize,
  prizeIndex,
  type RoulettePrize,
} from '@/lib/roulette'
import {
  formatCountdown,
  getSpinStatus,
  grantRouletteReward,
} from '@/lib/firebaseRewards'

const SEGMENT = 360 / ROULETTE_PRIZES.length

function buildConicGradient(): string {
  const parts = ROULETTE_PRIZES.map((p, i) => {
    const start = i * SEGMENT
    const end = (i + 1) * SEGMENT
    return `${p.color} ${start}deg ${end}deg`
  })
  return `conic-gradient(from -${SEGMENT / 2}deg, ${parts.join(', ')})`
}

export default function Roulette() {
  const { session, ready } = useAuth()
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [lastPrize, setLastPrize] = useState<RoulettePrize | null>(null)
  const [error, setError] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [canSpin, setCanSpin] = useState(false)
  const [msRemaining, setMsRemaining] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const spinLock = useRef(false)

  const gradient = useMemo(() => buildConicGradient(), [])

  const refreshStatus = useCallback(async () => {
    if (!session?.accountId) return
    setLoadingStatus(true)
    try {
      const s = await getSpinStatus(session.accountId)
      setCanSpin(s.canSpin)
      setMsRemaining(s.msRemaining)
    } catch {
      setCanSpin(true)
    } finally {
      setLoadingStatus(false)
    }
  }, [session?.accountId])

  useEffect(() => {
    if (session?.accountId) refreshStatus()
  }, [session?.accountId, refreshStatus])

  useEffect(() => {
    if (canSpin || msRemaining <= 0) return
    const t = window.setInterval(() => {
      setMsRemaining((prev) => {
        const next = Math.max(0, prev - 1000)
        if (next <= 0) setCanSpin(true)
        return next
      })
    }, 1000)
    return () => clearInterval(t)
  }, [canSpin, msRemaining])

  const spin = async () => {
    if (!session?.accountId || spinning || spinLock.current || !canSpin) return
    spinLock.current = true
    setSpinning(true)
    setError('')
    setStatusMsg('')
    setLastPrize(null)

    const prize = pickWeightedPrize()
    const index = prizeIndex(prize)
    // Pointer is at top; wheel rotates so winning segment centers under pointer
    const segmentCenter = index * SEGMENT
    const extraTurns = 5 * 360
    const target = extraTurns + (360 - segmentCenter)
    const nextRotation = rotation + target
    setRotation(nextRotation)

    // Wait for CSS animation
    await new Promise((r) => setTimeout(r, 5200))

    const result = await grantRouletteReward(session.accountId, prize)
    if (!result.ok) {
      setError(result.error)
      setSpinning(false)
      spinLock.current = false
      await refreshStatus()
      return
    }

    setLastPrize(prize)
    setStatusMsg('Reward sent to your game account. Open the game to collect it.')
    setCanSpin(false)
    setMsRemaining(24 * 60 * 60 * 1000)
    setSpinning(false)
    spinLock.current = false
  }

  if (!ready || !session) {
    return (
      <section id="roulette" className="section-dark py-[100px] md:py-[140px] px-6 md:px-20">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="label-text text-sage">DAILY REWARDS</span>
          <h2
            className="font-display text-cream uppercase mt-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}
          >
            SPEED UP ROULETTE
          </h2>
          <p className="font-body text-cream/65 mt-5 text-base leading-relaxed">
            Log in with your Account ID to spin for free speed ups that go straight into your game.
          </p>
          <a
            href="#login"
            className="btn-primary mt-8 inline-flex no-underline"
          >
            Log in to spin
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="roulette" className="section-dark py-[100px] md:py-[140px] px-6 md:px-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="label-text text-sage">DAILY REWARDS</span>
          <h2
            className="font-display text-cream uppercase mt-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.92 }}
          >
            SPEED UP ROULETTE
          </h2>
          <p className="font-body text-cream/65 mt-4 max-w-[520px] mx-auto leading-relaxed">
            Welcome, <span className="text-cream font-ui tracking-wide">{session.displayName}</span>.
            Spin once per day for free speed ups. Rewards are delivered to your game inventory.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Wheel */}
          <div className="relative w-[min(92vw,360px)] h-[min(92vw,360px)]">
            {/* Pointer */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-1 z-20"
              style={{
                width: 0,
                height: 0,
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderTop: '28px solid #E76F51',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
              }}
            />

            <div
              className="absolute inset-0 rounded-full border-[6px] border-cream/30 shadow-2xl overflow-hidden"
              style={{
                background: gradient,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? 'transform 5s cubic-bezier(0.12, 0.75, 0.12, 1)'
                  : 'none',
              }}
            >
              {ROULETTE_PRIZES.map((p, i) => {
                const angle = i * SEGMENT
                return (
                  <div
                    key={p.id}
                    className="absolute inset-0 flex items-start justify-center pt-6"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <span
                      className="font-ui text-[10px] md:text-[11px] uppercase tracking-wide text-center leading-tight px-1"
                      style={{
                        color: p.color === '#FEFAE0' ? '#084C61' : '#FEFAE0',
                        textShadow: p.color === '#FEFAE0' ? 'none' : '0 1px 2px rgba(0,0,0,0.45)',
                        maxWidth: 72,
                      }}
                    >
                      {p.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Hub */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-teal border-4 border-cream/40 flex items-center justify-center shadow-lg">
                <span className="font-display text-cream text-xs tracking-wider">SPIN</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full max-w-[360px] text-center lg:text-left">
            <button
              type="button"
              onClick={spin}
              disabled={spinning || !canSpin || loadingStatus}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning
                ? 'Spinning…'
                : loadingStatus
                  ? 'Loading…'
                  : canSpin
                    ? 'Spin free'
                    : `Next spin in ${formatCountdown(msRemaining)}`}
            </button>

            <p className="font-body text-cream/45 text-xs mt-4 leading-relaxed">
              1 free spin every 24 hours. Speed ups are added to your account and claimed when you open the game.
            </p>

            {lastPrize && (
              <div className="mt-6 rounded-xl border border-terracotta/40 bg-terracotta/15 p-5">
                <p className="label-text text-terracotta text-[10px]">You won</p>
                <p className="font-display text-cream text-2xl mt-1 tracking-wide">
                  {lastPrize.label}
                </p>
                <p className="font-body text-cream/70 text-sm mt-1">
                  {lastPrize.sublabel} · ×{lastPrize.amount}
                </p>
              </div>
            )}

            {statusMsg && (
              <p className="font-body text-sage text-sm mt-4 leading-relaxed">{statusMsg}</p>
            )}
            {error && (
              <p className="font-body text-[#E76F51] text-sm mt-4 leading-relaxed">{error}</p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-2">
              {ROULETTE_PRIZES.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-cream/10 bg-cream/[0.04] px-3 py-2 text-left"
                >
                  <p className="font-ui text-cream text-[11px] tracking-wide">{p.label}</p>
                  <p className="font-body text-cream/45 text-[10px]">{p.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
