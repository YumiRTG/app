const STORAGE_KEY = 'dino_dominion_auth'

export type AuthSession = {
  accountId: string
  displayName: string
  loggedInAt: string
  firebaseUid?: string
  source?: 'local' | 'firebase'
}

/** Normalize and validate account IDs (game-style codes). */
export function normalizeAccountId(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '')
}

export function isValidAccountId(id: string): boolean {
  // 4–24 chars: letters, numbers, hyphen, underscore
  return /^[A-Z0-9_-]{4,24}$/.test(id)
}

/** Generate a new web account ID, e.g. DD-A7K2M9QX */
export function generateAccountId(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < 8; i++) {
    code += alphabet[bytes[i]! % alphabet.length]
  }
  return `DD-${code}`
}

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as AuthSession
    if (!data?.accountId || !isValidAccountId(normalizeAccountId(data.accountId))) {
      return null
    }
    return {
      accountId: normalizeAccountId(data.accountId),
      displayName: (data.displayName || 'Commander').trim().slice(0, 24),
      loggedInAt: data.loggedInAt || new Date().toISOString(),
      firebaseUid: data.firebaseUid,
      source: data.source || 'local',
    }
  } catch {
    return null
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}
