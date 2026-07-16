import { useEffect, useId, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { generateAccountId } from '@/lib/auth'

type Mode = 'login' | 'create'

type LoginModalProps = {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { login, createAccount, session, busy } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [accountId, setAccountId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [previewId, setPreviewId] = useState(() => generateAccountId())
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    setError('')
    setSuccess('')
    if (session) {
      setAccountId(session.accountId)
      setDisplayName(session.displayName)
    }
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
    const result = await login(accountId, displayName)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setSuccess('Logged in with Firebase Account ID.')
    setTimeout(onClose, 450)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const result = await createAccount(displayName, previewId)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setAccountId(result.accountId || previewId)
    setSuccess(`Account created on Firebase: ${result.accountId}`)
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
        className="relative w-full max-w-[440px] rounded-[12px] overflow-hidden shadow-2xl"
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
              <p className="label-text text-cream/60 text-[11px]">FIREBASE · NO PASSWORD</p>
              <h2 id={titleId} className="font-display text-cream text-3xl mt-1 tracking-wide">
                {mode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'}
              </h2>
              <p className="font-body text-cream/70 text-sm mt-2 leading-relaxed">
                {mode === 'login'
                  ? 'Enter your Account ID only — no password required.'
                  : 'Generate an Account ID. It is saved in Firebase so you can log in later.'}
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

          <div className="flex gap-2 mt-5">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMode('login')
                setError('')
                setSuccess('')
              }}
              className="flex-1 py-2 rounded-full font-ui text-xs uppercase tracking-wider border-none cursor-pointer transition-colors disabled:opacity-60"
              style={{
                background: mode === 'login' ? '#E76F51' : 'rgba(254,250,224,0.15)',
                color: '#FEFAE0',
              }}
            >
              Log in
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMode('create')
                setError('')
                setSuccess('')
                setPreviewId(generateAccountId())
              }}
              className="flex-1 py-2 rounded-full font-ui text-xs uppercase tracking-wider border-none cursor-pointer transition-colors disabled:opacity-60"
              style={{
                background: mode === 'create' ? '#E76F51' : 'rgba(254,250,224,0.15)',
                color: '#FEFAE0',
              }}
            >
              Create
            </button>
          </div>
        </div>

        <form
          onSubmit={mode === 'login' ? handleLogin : handleCreate}
          className="p-6 space-y-4"
        >
          <div>
            <label className="label-text text-teal/55 text-[11px] block mb-2" htmlFor="display-name">
              Commander name (optional)
            </label>
            <input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Nyra"
              maxLength={24}
              disabled={busy}
              className="w-full rounded-lg border border-teal/15 bg-white/60 px-4 py-3 font-body text-teal outline-none focus:border-terracotta transition-colors disabled:opacity-60"
              autoComplete="nickname"
            />
          </div>

          {mode === 'login' ? (
            <div>
              <label className="label-text text-teal/55 text-[11px] block mb-2" htmlFor="account-id">
                Account ID
              </label>
              <input
                id="account-id"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value.toUpperCase())}
                placeholder="DD-XXXXXXXX"
                maxLength={24}
                required
                disabled={busy}
                className="w-full rounded-lg border border-teal/15 bg-white/60 px-4 py-3 font-ui text-teal tracking-[0.12em] outline-none focus:border-terracotta transition-colors uppercase disabled:opacity-60"
                autoComplete="username"
                spellCheck={false}
              />
              <p className="font-body text-teal/45 text-xs mt-2">
                Passwordless. Your Account ID is enough to log in.
              </p>
            </div>
          ) : (
            <div>
              <p className="label-text text-teal/55 text-[11px] block mb-2">Your new Account ID</p>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg border border-teal/15 bg-teal/[0.04] px-4 py-3 font-ui text-teal tracking-[0.14em] text-lg">
                  {previewId}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setPreviewId(generateAccountId())}
                  className="px-4 rounded-lg border border-teal/20 bg-transparent font-ui text-teal text-xs uppercase tracking-wider cursor-pointer hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-60"
                >
                  New
                </button>
              </div>
              <p className="font-body text-teal/45 text-xs mt-2">
                Save this ID — there is no password. You need it to log in again.
              </p>
            </div>
          )}

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
            {busy
              ? 'Connecting to Firebase…'
              : mode === 'login'
                ? 'Log in with Account ID'
                : 'Create & log in'}
          </button>

          <p className="font-body text-teal/40 text-[11px] text-center leading-relaxed">
            Connected to Firebase project <span className="font-ui">dinodominion-289b0</span>
          </p>
        </form>
      </div>
    </div>
  )
}
