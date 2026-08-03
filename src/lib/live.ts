import {
  collection,
  count,
  getAggregateFromServer,
  getDocs,
  limit as fbLimit,
  orderBy,
  query,
  sum,
} from 'firebase/firestore'
import { getFirebase } from '@/lib/firebase'
import { ensureAnonymousAuth } from '@/lib/firebaseAccounts'
import { asset } from '@/lib/assets'

/**
 * Live reads of the running game server.
 *
 * Everything here comes out of collections the Unity client already writes and
 * that anonymous clients may read: `players`, `alliances`, `arena`, `teamarena`.
 * Nothing is computed on a server, so the site stays on the free Firebase tier.
 */

// ─── Season clock ───────────────────────────────────────────────────────────
// Mirrors ArenaService.SeasonEpoch: Monday 05.01.2026 00:00 UTC, one week each.

const SEASON_EPOCH = Date.UTC(2026, 0, 5, 0, 0, 0)
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function currentSeason(now = Date.now()): number {
  return Math.max(0, Math.floor((now - SEASON_EPOCH) / WEEK_MS))
}

export function seasonEndsAt(now = Date.now()): number {
  return SEASON_EPOCH + (currentSeason(now) + 1) * WEEK_MS
}

/** Days / hours / minutes / seconds left in the current arena season. */
export function seasonRemaining(now = Date.now()) {
  const ms = Math.max(0, seasonEndsAt(now) - now)
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

// ─── Hero portraits ─────────────────────────────────────────────────────────
// heroId as written by the game, mapped onto the art already in /public.

const HERO_ART: Record<string, string> = {
  tyranno: 'dino-tyranno.png',
  raptor: 'dino-raptor.png',
  dragon: 'dino-dragon.png',
  dilo: 'dino-dilo.png',
  mammoth: 'dino-mammoth.png',
  stegosaurus: 'dino-stego.png',
  smilodon: 'dino-smilodon.png',
  triceratops: 'dino-triceratops.png',
  pterodactyl: 'dino-ptera.png',
  allosaurus: 'dino-allo.png',
  paralophosaurus: 'dino-para.png',
  nyra_vale: 'hero-nyra.png',
  carina_vale: 'hero-carina.png',
  alissa_mey: 'hero-alyssa.png',
  elara_veyn: 'hero-elara.png',
  kailina: 'hero-kailina.png',
  ronan: 'hero-ronan.png',
}

export function heroArt(heroId: string | undefined): string {
  const key = (heroId || '').toLowerCase()
  return asset(HERO_ART[key] ?? 'hero-warrior.png')
}

function avatarPath(iconId: unknown, fallbackSeed: string): string {
  // The arena docs store "profil_icon4"; the player docs store a bare number.
  const raw = typeof iconId === 'string' ? iconId.replace(/\D+/g, '') : String(iconId ?? '')
  const n = Number(raw)
  if (Number.isFinite(n) && n >= 1 && n <= 10) return asset(`avatars/avatar${n}.jpg`)
  let hash = 0
  for (let i = 0; i < fallbackSeed.length; i++) hash = (hash * 31 + fallbackSeed.charCodeAt(i)) >>> 0
  return asset(`avatars/avatar${(hash % 10) + 1}.jpg`)
}

function num(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() && !Number.isNaN(Number(v))) return Number(v)
  return 0
}

function strArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)) : []
}

function numArray(v: unknown): number[] {
  return Array.isArray(v) ? v.map((x) => num(x)) : []
}

// ─── Server pulse ───────────────────────────────────────────────────────────

export type ServerPulse = {
  commanders: number
  alliances: number
  troopKills: number
  topPower: number
  season: number
  lastSeenMinutes: number | null
}

/**
 * Server pulse in a constant number of reads.
 *
 * The first version of this pulled every player and alliance document on every
 * page load. That is fine at thirteen players and ruinous at a thousand, where
 * each visitor would have cost ~1,000 reads. Firestore bills a count() or sum()
 * aggregation as one read per 1,000 index entries scanned, and a limit(1) query
 * as one read, so this is four reads whatever the player count.
 */
export async function getServerPulse(): Promise<ServerPulse> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()

  const players = collection(db, 'players')

  const [playerAgg, allianceAgg, topDoc, seenDoc] = await Promise.all([
    getAggregateFromServer(players, { n: count(), kills: sum('troopKills') }),
    getAggregateFromServer(collection(db, 'alliances'), { n: count() }),
    getDocs(query(players, orderBy('totalScore', 'desc'), fbLimit(1))),
    getDocs(query(players, orderBy('lastOnline', 'desc'), fbLimit(1))),
  ])

  const top = topDoc.docs[0]?.data() as Record<string, unknown> | undefined
  const seen = seenDoc.docs[0]?.data() as Record<string, unknown> | undefined
  const lastOnline = (seen?.lastOnline as { seconds?: number } | undefined)?.seconds

  return {
    commanders: playerAgg.data().n,
    alliances: allianceAgg.data().n,
    troopKills: num(playerAgg.data().kills),
    topPower: Math.max(num(top?.totalScore), num(top?.powerScore)),
    season: currentSeason(),
    lastSeenMinutes: lastOnline
      ? Math.max(0, Math.round((Date.now() - lastOnline * 1000) / 60000))
      : null,
  }
}

// ─── Arena ladders ──────────────────────────────────────────────────────────

export type ArenaHero = { id: string; name: string; power: number; art: string }

export type ArenaFighter = {
  uid: string
  name: string
  points: number
  wins: number
  losses: number
  defensePower: number
  isBot: boolean
  avatar: string
  heroes: ArenaHero[]
  /** Team Arena only: power of each of the three teams. */
  teamPower: number[]
}

async function readLadder(col: 'arena' | 'teamarena', count: number): Promise<ArenaFighter[]> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()

  const snap = await getDocs(
    query(collection(db, col), orderBy('points', 'desc'), fbLimit(count)),
  )

  return snap.docs.map((d) => {
    const x = d.data() as Record<string, unknown>
    const ids = strArray(x.heroIds)
    const names = strArray(x.heroNames)
    const powers = numArray(x.heroPower)

    return {
      uid: d.id,
      name: (typeof x.name === 'string' && x.name.trim()) || 'Commander',
      points: num(x.points),
      wins: num(x.wins),
      losses: num(x.losses),
      defensePower: num(x.defensePower) || num(x.totalPower),
      isBot: x.isBot === true,
      avatar: avatarPath(x.avatarIconId, d.id),
      heroes: ids.map((id, i) => ({
        id,
        name: names[i] ?? id,
        power: powers[i] ?? 0,
        art: heroArt(id),
      })),
      teamPower: numArray(x.teamPower),
    }
  })
}

export const getArenaLadder = (count = 5) => readLadder('arena', count)
export const getTeamArenaLadder = (count = 5) => readLadder('teamarena', count)

// ─── Alliances ──────────────────────────────────────────────────────────────

export type AllianceEntry = {
  id: string
  name: string
  tag: string
  power: number
  members: number
  level: number
  exp: number
  color: string
}

export async function getTopAlliances(count = 6): Promise<AllianceEntry[]> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()

  const snap = await getDocs(
    query(collection(db, 'alliances'), orderBy('totalPower', 'desc'), fbLimit(count)),
  )

  return snap.docs.map((d) => {
    const x = d.data() as Record<string, unknown>
    return {
      id: d.id,
      name: (typeof x.name === 'string' && x.name.trim()) || 'Unnamed',
      tag: (typeof x.tag === 'string' && x.tag.trim()) || '???',
      power: num(x.totalPower),
      members: num(x.memberCount),
      level: Math.max(1, num(x.level)),
      exp: num(x.allianceExp),
      color:
        typeof x.territoryColor === 'string' && /^#[0-9a-f]{6}$/i.test(x.territoryColor)
          ? x.territoryColor
          : '#f0c14d',
    }
  })
}

// ─── Formatting ─────────────────────────────────────────────────────────────

export function compact(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M`
  if (v >= 10_000) return `${Math.round(v / 1000)}K`
  return v.toLocaleString('en-US')
}
