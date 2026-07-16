import { useEffect, useId, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

type LoginModalProps = {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { login, session, busy } = useAuth()
  const [accountId, setAccountId] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    setError('')
    setSuccess('')
    setAccountId(session?.accountId || '')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, session, busy])

  if (!open) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const result = await login(accountId)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setAccountId(result.accountId)
    setSuccess(`Welcome, ${result.displayName}`)
    setTimeout(onClose, 700)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#042833]/75 backdrop-blur-sm border-none cursor-pointer"
        aria-label="Close login"
        onClick={() => !busy && onClose()}
      />

      <div
        className="relative w-full max-w-[420px] rounded-[12px] overflow-hidden shadow-2xl"
        style={{ background: '#FEFAE0' }}
      >
        <div
          className="px-6 pt-6 pb-5"
          style={{
            background:
              'linear-gradient(135deg, #084C61 0%, #0A5E78 55%, #2A9D8F 100%)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={titleId} className="font-display text-cream text-3xl tracking-wide">
                LOG IN
              </h2>
              <p className="font-body text-cream/70 text-sm mt-2 leading-relaxed">
                Enter your Account ID from the game.
              </p>
            </div>
            <button
              type="button"
              onClick={() => !busy && onClose()}
              className="text-cream/70 hover:text-cream bg-transparent border-none cursor-pointer text-2xl leading-none p-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="label-text text-teal/55 text-[11px] block mb-2" htmlFor="account-id">
              Account ID
            </label>
            <input
              id="account-id"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value.trim())}
              placeholder="Account ID"
              maxLength={128}
              required
              disabled={busy}
              className="w-full rounded-lg border border-teal/15 bg-white/60 px-4 py-3 font-ui text-teal tracking-[0.06em] outline-none focus:border-terracotta transition-colors disabled:opacity-60"
              autoComplete="username"
              spellCheck={false}
            />
          </div>

          {error && (
            <p className="font-body text-sm text-[#C0563A] bg-[#E76F51]/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="font-body text-sm text-sage bg-sage/10 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full justify-center mt-2 disabled:opacity-70"
          >
            {busy ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
