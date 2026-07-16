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
  isValidAccountId,
  loadSession,
  normalizeAccountId,
  saveSession,
  type AuthSession,
} from '@/lib/auth'

type AuthContextValue = {
  session: AuthSession | null
  ready: boolean
  login: (accountId: string, displayName?: string) => { ok: true } | { ok: false; error: string }
  createAccount: (displayName?: string) => { ok: true; accountId: string } | { ok: false; error: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setSession(loadSession())
    setReady(true)
  }, [])

  const login = useCallback((accountId: string, displayName?: string) => {
    const id = normalizeAccountId(accountId)
    if (!isValidAccountId(id)) {
      return {
        ok: false as const,
        error: 'Account ID must be 4–24 characters (A–Z, 0–9, - or _).',
      }
    }
    const next: AuthSession = {
      accountId: id,
      displayName: (displayName || 'Commander').trim().slice(0, 24) || 'Commander',
      loggedInAt: new Date().toISOString(),
    }
    saveSession(next)
    setSession(next)
    return { ok: true as const }
  }, [])

  const createAccount = useCallback((displayName?: string) => {
    const id = generateAccountId()
    const next: AuthSession = {
      accountId: id,
      displayName: (displayName || 'Commander').trim().slice(0, 24) || 'Commander',
      loggedInAt: new Date().toISOString(),
    }
    saveSession(next)
    setSession(next)
    return { ok: true as const, accountId: id }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ session, ready, login, createAccount, logout }),
    [session, ready, login, createAccount, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
