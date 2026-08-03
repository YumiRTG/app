import { collection, getDocs, limit as fbLimit, orderBy, query } from 'firebase/firestore'
import { getFirebase } from '@/lib/firebase'
import { ensureAnonymousAuth, PLAYERS_COLLECTION } from '@/lib/firebaseAccounts'

/**
 * Live leaderboard, read straight from the same `players` documents the Unity
 * client writes (SaveSystem.MirrorToCloud + RankingService.AppendCloudFields).
 * Read-only and anonymous, so it needs nothing beyond the existing rules.
 */

export type RankCategory = {
  id: string
  label: string
  /** Field on players/{uid} to sort by. */
  field: string
  /** Optional second field shown next to the value. */
  detailField?: string
  /** Short unit shown under the number on the champion card. */
  unit: string
  blurb: string
}

export const RANK_CATEGORIES: RankCategory[] = [
  {
    id: 'power',
    label: 'Power',
    field: 'totalScore',
    unit: 'Total power',
    blurb: 'Everything counted at once: buildings, research, troops and heroes.',
  },
  {
    id: 'hero',
    label: 'Strongest hero',
    field: 'heroPowerBest',
    detailField: 'heroBestName',
    unit: 'Hero power',
    blurb: 'The single best hero on the account, not the whole roster.',
  },
  {
    id: 'townhall',
    label: 'Town Hall',
    field: 'townHallLevel',
    unit: 'Town Hall level',
    blurb: 'How far the city itself has been pushed.',
  },
  {
    id: 'kills',
    label: 'Troop kills',
    field: 'troopKills',
    unit: 'Enemy troops killed',
    blurb: 'Lifetime kills across the campaign, the arena and the world map.',
  },
]

export type RankEntry = {
  uid: string
  name: string
  value: number
  detail?: string
  /** Player's chosen profile icon, already resolved to a web path. */
  avatar: string
}

const AVATAR_COUNT = 10

/**
 * The game stores a numbered profile icon (avatarIconId). Custom uploads
 * (avatarImageUrl) are ignored on the web board: they are unmoderated and this
 * runs on the front page. Anyone without an icon gets a stable one from their uid.
 */
function resolveAvatar(uid: string, data: Record<string, unknown>): string {
  const raw = data.avatarIconId
  const id = typeof raw === 'number' ? raw : Number(raw)
  if (Number.isFinite(id) && id >= 1 && id <= AVATAR_COUNT) {
    return `avatars/avatar${Math.trunc(id)}.jpg`
  }
  let hash = 0
  for (let i = 0; i < uid.length; i++) hash = (hash * 31 + uid.charCodeAt(i)) >>> 0
  return `avatars/avatar${(hash % AVATAR_COUNT) + 1}.jpg`
}

function toNumber(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v)
  return 0
}

export async function getTopPlayers(cat: RankCategory, count = 10): Promise<RankEntry[]> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()

  const snap = await getDocs(
    query(collection(db, PLAYERS_COLLECTION), orderBy(cat.field, 'desc'), fbLimit(count)),
  )

  return snap.docs
    .map((d) => {
      const data = d.data() as Record<string, unknown>
      const name = typeof data.displayName === 'string' ? data.displayName.trim() : ''
      const detail =
        cat.detailField && typeof data[cat.detailField] === 'string'
          ? (data[cat.detailField] as string).trim()
          : undefined
      return {
        uid: d.id,
        name: name || 'Unnamed commander',
        value: toNumber(data[cat.field]),
        detail: detail || undefined,
        avatar: resolveAvatar(d.id, data),
      }
    })
    .filter((e) => e.value > 0)
}

export function formatRankValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M`
  if (v >= 10_000) return `${Math.round(v / 1000)}K`
  return v.toLocaleString('en-US')
}
