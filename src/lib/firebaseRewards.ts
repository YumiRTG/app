import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { ensureAnonymousAuth } from '@/lib/firebaseAccounts'
import { getFirebase } from '@/lib/firebase'
import { SPIN_COOLDOWN_MS, type RoulettePrize } from '@/lib/roulette'

/** Pending rewards claimed by the Unity game via WebRewardService */
export const WEB_REWARDS_ROOT = 'webRewards'
export const WEB_SPINS_ROOT = 'webRouletteSpins'

export type SpinStatus = {
  canSpin: boolean
  lastSpinAt: number | null
  nextSpinAt: number | null
  msRemaining: number
}

export async function getSpinStatus(accountId: string): Promise<SpinStatus> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()
  const ref = doc(db, WEB_SPINS_ROOT, accountId)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return { canSpin: true, lastSpinAt: null, nextSpinAt: null, msRemaining: 0 }
  }

  const data = snap.data()
  const last = data.lastSpinAt
  let lastMs = 0
  if (last instanceof Timestamp) lastMs = last.toMillis()
  else if (typeof last === 'number') lastMs = last
  else if (last && typeof (last as { seconds?: number }).seconds === 'number') {
    lastMs = (last as { seconds: number }).seconds * 1000
  }

  if (!lastMs) {
    return { canSpin: true, lastSpinAt: null, nextSpinAt: null, msRemaining: 0 }
  }

  const next = lastMs + SPIN_COOLDOWN_MS
  const now = Date.now()
  const msRemaining = Math.max(0, next - now)
  return {
    canSpin: msRemaining <= 0,
    lastSpinAt: lastMs,
    nextSpinAt: next,
    msRemaining,
  }
}

/**
 * Records a roulette win:
 * 1) writes pending reward for the game to claim
 * 2) updates last spin timestamp (1 spin / 24h)
 */
export async function grantRouletteReward(
  accountId: string,
  prize: RoulettePrize
): Promise<{ ok: true; rewardId: string } | { ok: false; error: string }> {
  try {
    await ensureAnonymousAuth()
    const { db } = getFirebase()

    // Enforce cooldown server-side (best effort)
    const status = await getSpinStatus(accountId)
    if (!status.canSpin) {
      return { ok: false, error: 'Next free spin is not ready yet.' }
    }

    const itemsCol = collection(db, WEB_REWARDS_ROOT, accountId, 'items')
    const rewardRef = await addDoc(itemsCol, {
      itemType: prize.itemType,
      amount: prize.amount,
      label: prize.label,
      sublabel: prize.sublabel,
      source: 'roulette',
      claimed: false,
      createdAt: serverTimestamp(),
    })

    const spinRef = doc(db, WEB_SPINS_ROOT, accountId)
    const spinSnap = await getDoc(spinRef)
    const prevTotal =
      typeof spinSnap.data()?.totalSpins === 'number' ? (spinSnap.data()!.totalSpins as number) : 0

    await setDoc(
      spinRef,
      {
        lastSpinAt: serverTimestamp(),
        lastPrizeId: prize.id,
        lastRewardId: rewardRef.id,
        totalSpins: prevTotal + 1,
      },
      { merge: true }
    )

    return { ok: true, rewardId: rewardRef.id }
  } catch (err) {
    const msg = (err as { message?: string })?.message || 'Could not save reward.'
    if (msg.includes('permission')) {
      return {
        ok: false,
        error: 'Could not save reward (permission denied). Check Firestore rules for webRewards.',
      }
    }
    return { ok: false, error: msg }
  }
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Ready'
  const s = Math.ceil(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${sec}s`
  return `${sec}s`
}
