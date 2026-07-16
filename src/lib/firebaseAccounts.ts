import {
  signInAnonymously,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ACCOUNTS_COLLECTION, getFirebase } from '@/lib/firebase'
import {
  generateAccountId,
  isValidAccountId,
  normalizeAccountId,
  type AuthSession,
} from '@/lib/auth'

export type AccountDoc = {
  accountId: string
  displayName: string
  firebaseUid: string
  createdAt?: unknown
  lastLoginAt?: unknown
  source?: string
}

let authReady: Promise<User> | null = null

/** Ensure we have an anonymous Firebase session (same pattern as the Unity game). */
export function ensureAnonymousAuth(): Promise<User> {
  if (authReady) return authReady

  const { auth } = getFirebase()

  authReady = new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub()
      try {
        if (user) {
          resolve(user)
          return
        }
        const cred = await signInAnonymously(auth)
        resolve(cred.user)
      } catch (err) {
        authReady = null
        reject(err)
      }
    })
  })

  return authReady
}

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code || ''
  const msg = (err as { message?: string })?.message || String(err)

  if (code.includes('permission-denied') || msg.includes('permission')) {
    return 'Firebase permission denied. Enable Anonymous Auth and allow read/write on collection "accounts" in Firestore rules.'
  }
  if (code.includes('unavailable') || msg.includes('network')) {
    return 'Network error — check your connection and try again.'
  }
  if (code.includes('admin-restricted-operation') || code.includes('operation-not-allowed')) {
    return 'Anonymous sign-in is disabled. Enable it in Firebase Console → Authentication → Sign-in method.'
  }
  return msg || 'Something went wrong talking to Firebase.'
}

/** Log in with Account ID only (no password). Looks up accounts/{accountId} in Firestore. */
export async function loginWithAccountId(
  rawAccountId: string,
  displayName?: string
): Promise<{ ok: true; session: AuthSession } | { ok: false; error: string }> {
  const accountId = normalizeAccountId(rawAccountId)
  if (!isValidAccountId(accountId)) {
    return {
      ok: false,
      error: 'Account ID must be 4–24 characters (A–Z, 0–9, - or _).',
    }
  }

  try {
    const user = await ensureAnonymousAuth()
    const { db } = getFirebase()
    const ref = doc(db, ACCOUNTS_COLLECTION, accountId)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      return {
        ok: false,
        error: 'Account ID not found. Create an account first, or check the ID.',
      }
    }

    const data = snap.data() as AccountDoc
    const name =
      (displayName || data.displayName || 'Commander').trim().slice(0, 24) || 'Commander'

    // Touch last login (best-effort)
    try {
      await updateDoc(ref, {
        lastLoginAt: serverTimestamp(),
        displayName: name,
        lastWebUid: user.uid,
      })
    } catch {
      // ignore if rules block updates
    }

    const session: AuthSession = {
      accountId,
      displayName: name,
      loggedInAt: new Date().toISOString(),
      firebaseUid: user.uid,
      source: 'firebase',
    }
    return { ok: true, session }
  } catch (err) {
    return { ok: false, error: friendlyError(err) }
  }
}

/** Create a new Account ID document in Firestore (no password). */
export async function createAccountWithId(
  preferredId?: string,
  displayName?: string
): Promise<{ ok: true; session: AuthSession } | { ok: false; error: string }> {
  let accountId = preferredId ? normalizeAccountId(preferredId) : generateAccountId()
  if (!isValidAccountId(accountId)) {
    return { ok: false, error: 'Invalid Account ID format.' }
  }

  try {
    const user = await ensureAnonymousAuth()
    const { db } = getFirebase()

    // Retry a few times if ID already taken
    for (let attempt = 0; attempt < 5; attempt++) {
      const ref = doc(db, ACCOUNTS_COLLECTION, accountId)
      const existing = await getDoc(ref)
      if (existing.exists()) {
        accountId = generateAccountId()
        continue
      }

      const name = (displayName || 'Commander').trim().slice(0, 24) || 'Commander'
      const payload: Record<string, unknown> = {
        accountId,
        displayName: name,
        firebaseUid: user.uid,
        source: 'web',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      }

      await setDoc(ref, payload)

      const session: AuthSession = {
        accountId,
        displayName: name,
        loggedInAt: new Date().toISOString(),
        firebaseUid: user.uid,
        source: 'firebase',
      }
      return { ok: true, session }
    }

    return { ok: false, error: 'Could not allocate a free Account ID. Try again.' }
  } catch (err) {
    return { ok: false, error: friendlyError(err) }
  }
}
