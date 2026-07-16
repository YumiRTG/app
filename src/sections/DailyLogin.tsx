import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import {
  claimDailyLoginReward,
  formatCountdown,
  getDailyLoginStatus,
  type DailyLoginStatus,
} from '@/lib/firebaseRewards'

export default function DailyLogin() {
  const { session, ready } = useAuth()
  const [status, setStatus] = useState<DailyLoginStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [msReset, setMsReset] = useState(0)

  const refresh = useCallback(async () => {
    if (!session?.accountId) return
    setLoading(true)
    setError('')
    try {
      const s = await getDailyLoginStatus(session.accountId)
      setStatus(s)
      setMsReset(s.msUntilReset)
    } catch {
      setError('Could not load daily login status.')
    } finally {
      setLoading(false)
    }
  }, [session?.accountId])

  useEffect(() => {
    if (session?.accountId) refresh()
  }, [session?.accountId, refresh])

  useEffect(() => {
    if (!status || status.canClaim) return
    const t = window.setInterval(() => {
      setMsReset((prev) => Math.max(0, prev - 1000))
    }, 1000)
    return () => clearInterval(t)
  }, [status?.canClaim, status])

  const claim = async () => {
    if (!session?.accountId || claiming || !status?.canClaim) return
    setClaiming(true)
    setError('')
    setSuccess('')
    const result = await claimDailyLoginReward(session.accountId)
    if (!result.ok) {
      setError(result.error)
      setClaiming(false)
      await refresh()
      return
    }
    setSuccess(
      `Day ${result.reward.day}: ${result.reward.label} — sent to your game. Streak: ${result.streak} day${result.streak === 1 ? '' : 's'}.`
    )
    setClaiming(false)
    await refresh()
  }

  if (!ready || !session) {
    return (
      <section id="daily" className="section-light py-[100px] md:py-[140px] px-6 md:px-20">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="label-text text-sage">LOGIN BONUS</span>
          <h2
            className="font-display text-teal uppercase mt-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}
          >
            DAILY LOGIN REWARD
          </h2>
          <p className="font-body text-teal/65 mt-5 text-base leading-relaxed">
            Log in with your Account ID every day to claim free speed ups for your game.
          </p>
          <Link to="/daily?login=1" className="btn-primary mt-8 inline-flex no-underline">
            Log in to claim
          </Link>
        </div>
      </section>
    )
  }

  const streak = status?.streak ?? 0
  const nextDay = status?.nextDay ?? 1
  const canClaim = status?.canClaim ?? false

  return (
    <section id="daily" className="section-light py-[100px] md:py-[140px] px-6 md:px-20">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <span className="label-text text-sage">LOGIN BONUS</span>
          <h2
            className="font-display text-teal uppercase mt-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.92 }}
          >
            DAILY LOGIN REWARD
          </h2>
          <p className="font-body text-teal/65 mt-4 max-w-[520px] mx-auto leading-relaxed">
            Claim once per day as{' '}
            <span className="font-ui text-teal tracking-wide">{session.displayName}</span>.
            Keep your streak for better speed ups.
          </p>
        </div>

        {/* Streak banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-10">
          <div className="rounded-2xl bg-teal px-8 py-5 text-center min-w-[140px]">
            <p className="label-text text-cream/50 text-[10px]">Current streak</p>
            <p className="font-display text-cream text-4xl mt-1">
              {loading ? '…' : streak}
            </p>
            <p className="font-body text-cream/50 text-xs mt-1">days</p>
          </div>
          <div className="rounded-2xl border border-teal/15 bg-white/40 px-8 py-5 text-center min-w-[180px]">
            <p className="label-text text-teal/45 text-[10px]">
              {canClaim ? 'Today’s reward' : 'Next reward'}
            </p>
            <p className="font-display text-teal text-2xl mt-1 tracking-wide">
              {status?.todaysReward.label ?? '—'}
            </p>
            <p className="font-body text-teal/50 text-xs mt-1">
              {status?.todaysReward.sublabel ?? ''}
            </p>
          </div>
        </div>

        {/* 7-day track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {(status?.rewards ?? []).map((reward) => {
            const cycleProgress = streak > 0 ? ((streak - 1) % 7) + 1 : 0
            const completed = reward.day <= cycleProgress
            const isToday = canClaim && reward.day === nextDay

            return (
              <div
                key={reward.day}
                className="relative rounded-xl border px-3 py-4 text-center transition-colors"
                style={{
                  borderColor: isToday
                    ? '#E76F51'
                    : completed
                      ? 'rgba(42,157,143,0.45)'
                      : 'rgba(8,76,97,0.12)',
                  background: isToday
                    ? 'rgba(231,111,81,0.12)'
                    : completed
                      ? 'rgba(42,157,143,0.1)'
                      : 'rgba(255,255,255,0.5)',
                }}
              >
                <p
                  className="label-text text-[10px]"
                  style={{ color: isToday ? '#E76F51' : '#084C61' }}
                >
                  Day {reward.day}
                </p>
                <p className="font-ui text-teal text-sm mt-2 tracking-wide leading-tight">
                  {reward.label}
                </p>
                <p className="font-body text-teal/45 text-[10px] mt-1">{reward.sublabel}</p>
                {completed && (
                  <p className="font-ui text-sage text-[10px] mt-2 tracking-wider">CLAIMED</p>
                )}
                {isToday && (
                  <p className="font-ui text-terracotta text-[10px] mt-2 tracking-wider">TODAY</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={claim}
            disabled={!canClaim || claiming || loading}
            className="btn-primary min-w-[240px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {claiming
              ? 'Claiming…'
              : loading
                ? 'Loading…'
                : canClaim
                  ? 'Claim daily reward'
                  : `Next claim in ${formatCountdown(msReset)}`}
          </button>

          {success && (
            <p className="font-body text-sage text-sm text-center max-w-md leading-relaxed">
              {success}
            </p>
          )}
          {error && (
            <p className="font-body text-[#C0563A] text-sm text-center max-w-md leading-relaxed">
              {error}
            </p>
          )}

          <p className="font-body text-teal/40 text-xs text-center max-w-md leading-relaxed">
            Rewards are sent to your game account. Open the game to collect them in your inventory.
            Resets at 00:00 UTC.
          </p>
        </div>
      </div>
    </section>
  )
}
