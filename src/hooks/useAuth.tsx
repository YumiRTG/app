import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  generateAccountId,
  loadSession,
  saveSession,
  type AuthSession,
} from '@/lib/auth'
import {
  createAccountWithId,
  ensureAnonymousAuth,
  loginWithAccountId,
} from '@/lib/firebaseAccounts'

type AuthResult = { ok: true; accountId?: string } | { ok: false; error: string }

type AuthContextValue = {
  session: AuthSession | null
  ready: boolean
  busy: boolean
  login: (accountId: string, displayName?: string) => Promise<AuthResult>
  createAccount: (displayName?: string, preferredId?: string) => Promise<AuthResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setSession(loadSession())
    setReady(true)
    // Warm up anonymous Firebase auth in the background
    ensureAnonymousAuth().catch(() => {
      // Console will surface real errors on login/create
    })
  }, [])

  const login = useCallback(async (accountId: string, displayName?: string) => {
    setBusy(true)
    try {
      const result = await loginWithAccountId(accountId, displayName)
      if (!result.ok) return result
      saveSession(result.session)
      setSession(result.session)
      return { ok: true as const, accountId: result.session.accountId }
    } finally {
      setBusy(false)
    }
  }, [])

  const createAccount = useCallback(async (displayName?: string, preferredId?: string) => {
    setBusy(true)
    try {
      const result = await createAccountWithId(preferredId || generateAccountId(), displayName)
      if (!result.ok) return result
      saveSession(result.session)
      setSession(result.session)
      return { ok: true as const, accountId: result.session.accountId }
    } finally {
      setBusy(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ session, ready, busy, login, createAccount, logout }),
    [session, ready, busy, login, createAccount, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
