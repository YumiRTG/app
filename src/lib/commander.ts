import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { getFirebase } from '@/lib/firebase'
import { ensureAnonymousAuth } from '@/lib/firebaseAccounts'
import { asset } from '@/lib/assets'

/**
 * Everything a public commander or alliance page needs, parsed out of the
 * documents the Unity client already syncs. The game stores several of these
 * as JSON or CSV strings inside the document, so the parsing lives here rather
 * than in the components.
 */

function num(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() && !Number.isNaN(Number(v))) return Number(v)
  return 0
}

export function avatarFor(iconId: unknown, seed: string): string {
  const raw = typeof iconId === 'string' ? iconId.replace(/\D+/g, '') : String(iconId ?? '')
  const n = Number(raw)
  if (Number.isFinite(n) && n >= 1 && n <= 10) return asset(`avatars/avatar${n}.jpg`)
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return asset(`avatars/avatar${(hash % 10) + 1}.jpg`)
}

// ─── Troops ─────────────────────────────────────────────────────────────────
// Stored as {"inf":[t1..t10],"sht":[...],"rid":[...]}.

export type TroopBranch = {
  key: 'inf' | 'sht' | 'rid'
  label: string
  total: number
  tiers: number[]
  icon: string
}

const BRANCHES: { key: 'inf' | 'sht' | 'rid'; label: string; icon: string }[] = [
  { key: 'inf', label: 'Infantry', icon: 'icon-infantry.png' },
  { key: 'sht', label: 'Shooters', icon: 'icon-shooter.png' },
  { key: 'rid', label: 'Riders', icon: 'icon-rider.png' },
]

function parseTroops(raw: unknown): TroopBranch[] {
  let obj: Record<string, unknown> = {}
  if (typeof raw === 'string' && raw.trim()) {
    try {
      obj = JSON.parse(raw) as Record<string, unknown>
    } catch {
      obj = {}
    }
  }
  return BRANCHES.map((b) => {
    const tiers = Array.isArray(obj[b.key]) ? (obj[b.key] as unknown[]).map(num) : []
    return {
      key: b.key,
      label: b.label,
      icon: asset(b.icon),
      tiers,
      total: tiers.reduce((a, c) => a + c, 0),
    }
  })
}

// ─── Research ───────────────────────────────────────────────────────────────
// 22–23 comma separated node levels, each capped at 10.

function parseResearch(raw: unknown): { levels: number[]; done: number; max: number } {
  const levels =
    typeof raw === 'string' && raw.trim()
      ? raw.split(',').map((s) => Math.max(0, Math.min(10, num(s))))
      : []
  return {
    levels,
    done: levels.reduce((a, c) => a + c, 0),
    max: levels.length * 10,
  }
}

// ─── City ───────────────────────────────────────────────────────────────────

export type CityBuilding = { name: string; level: number; count: number }

/** The save is written by the German client; show English where it is known. */
const BUILDING_EN: Record<string, string> = {
  'Allianz-Gebäude': 'Alliance Hall',
  Aussenzaun: 'Outer Fence',
  Eisenmine: 'Iron Mine',
  Farm: 'Farm',
  Forschung: 'Research Lab',
  Heldenaltar: 'Hero Altar',
  Holzfäller: 'Lumber Camp',
  Hospital: 'Hospital',
  Rathaus: 'Town Hall',
  Kaserne: 'Barracks',
  Lager: 'Storage',
  Ölquelle: 'Oil Well',
  Bohrturm: 'Oil Derrick',
  Wachturm: 'Watchtower',
  Marktplatz: 'Market',
  Arena: 'Arena',
  Schmiede: 'Forge',
  Übungsplatz: 'Training Ground',
  Bernsteinmine: 'Amber Mine',
}

function parseCity(raw: unknown): { buildings: CityBuilding[]; total: number } {
  let list: { name?: string; lvl?: number }[] = []
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw) as { baseBuildings?: { name?: string; lvl?: number }[] }
      list = Array.isArray(parsed.baseBuildings) ? parsed.baseBuildings : []
    } catch {
      list = []
    }
  }

  const byName = new Map<string, CityBuilding>()
  list.forEach((b) => {
    const rawName = (b.name || '').trim()
    if (!rawName) return
    const name = BUILDING_EN[rawName] ?? rawName
    const level = num(b.lvl)
    const hit = byName.get(name)
    if (hit) {
      hit.count += 1
      hit.level = Math.max(hit.level, level)
    } else {
      byName.set(name, { name, level, count: 1 })
    }
  })

  return {
    buildings: [...byName.values()].sort((a, b) => b.level - a.level || a.name.localeCompare(b.name)),
    total: list.length,
  }
}

// ─── Commander ──────────────────────────────────────────────────────────────

export type Commander = {
  uid: string
  name: string
  avatar: string
  totalScore: number
  townHallLevel: number
  heroPowerBest: number
  heroBestName: string
  heroPowerTotal: number
  researchPower: number
  buildingPower: number
  troopKills: number
  vipPoints: number
  allianceId: string | null
  lastOnline: number | null
  /** Pre-formatted at fetch time; components must stay pure. */
  seenLabel: string | null
  troops: TroopBranch[]
  research: { levels: number[]; done: number; max: number }
  city: { buildings: CityBuilding[]; total: number }
}

export async function getCommander(uid: string): Promise<Commander | null> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()
  const snap = await getDoc(doc(db, 'players', uid))
  if (!snap.exists()) return null

  const x = snap.data() as Record<string, unknown>
  const online = x.lastOnline as { seconds?: number } | undefined
  const lastOnline = online?.seconds ? online.seconds * 1000 : null

  let seenLabel: string | null = null
  if (lastOnline) {
    const hours = Math.round((Date.now() - lastOnline) / 3600000)
    seenLabel =
      hours < 1 ? 'Seen just now' : hours < 48 ? `Seen ${hours} h ago` : `Seen ${Math.round(hours / 24)} d ago`
  }

  return {
    uid: snap.id,
    name: (typeof x.displayName === 'string' && x.displayName.trim()) || 'Unnamed commander',
    avatar: avatarFor(x.avatarIconId, snap.id),
    totalScore: num(x.totalScore) || num(x.powerScore),
    townHallLevel: num(x.townHallLevel),
    heroPowerBest: num(x.heroPowerBest),
    heroBestName: typeof x.heroBestName === 'string' ? x.heroBestName : '',
    heroPowerTotal: num(x.heroPowerTotal),
    researchPower: num(x.researchPower),
    buildingPower: num(x.buildingPower),
    troopKills: num(x.troopKills),
    vipPoints: num(x.vipPoints),
    allianceId: typeof x.allianceId === 'string' && x.allianceId ? x.allianceId : null,
    lastOnline,
    seenLabel,
    troops: parseTroops(x.troops),
    research: parseResearch(x.research),
    city: parseCity(x.buildings),
  }
}

// ─── Alliance ───────────────────────────────────────────────────────────────

export type AllianceMember = {
  uid: string
  name: string
  avatar: string
  role: string
  power: number
  techContributed: number
}

export type Alliance = {
  id: string
  name: string
  tag: string
  color: string
  level: number
  exp: number
  power: number
  memberCount: number
  description: string
  members: AllianceMember[]
}

const ROLE_LABEL: Record<string, string> = {
  leader: 'Leader',
  r5: 'Leader',
  r4: 'Officer',
  officer: 'Officer',
  r3: 'Veteran',
  r2: 'Member',
  r1: 'Recruit',
  member: 'Member',
}

export async function getAlliance(id: string): Promise<Alliance | null> {
  await ensureAnonymousAuth()
  const { db } = getFirebase()

  const snap = await getDoc(doc(db, 'alliances', id))
  if (!snap.exists()) return null
  const x = snap.data() as Record<string, unknown>

  let members: AllianceMember[] = []
  try {
    const ms = await getDocs(collection(db, 'alliances', id, 'members'))
    members = ms.docs
      .map((m) => {
        const d = m.data() as Record<string, unknown>
        const role = String(d.role ?? '').toLowerCase()
        return {
          uid: m.id,
          name: (typeof d.displayName === 'string' && d.displayName.trim()) || 'Commander',
          avatar: avatarFor(d.avatarIconId, m.id),
          role: ROLE_LABEL[role] ?? 'Member',
          power: num(d.powerScore),
          techContributed: num(d.techContributed),
        }
      })
      .sort((a, b) => b.power - a.power)
  } catch {
    members = []
  }

  return {
    id: snap.id,
    name: (typeof x.name === 'string' && x.name.trim()) || 'Unnamed alliance',
    tag: (typeof x.tag === 'string' && x.tag.trim()) || '???',
    color:
      typeof x.territoryColor === 'string' && /^#[0-9a-f]{6}$/i.test(x.territoryColor)
        ? x.territoryColor
        : '#f0c14d',
    level: Math.max(1, num(x.level)),
    exp: num(x.allianceExp),
    power: num(x.totalPower),
    memberCount: num(x.memberCount) || members.length,
    description: typeof x.description === 'string' ? x.description.trim() : '',
    members,
  }
}
