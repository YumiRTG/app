/**
 * Roulette prizes — itemType matches Unity InventoryManager.ItemType
 * Speed ups first (as requested).
 */
export type RoulettePrize = {
  id: string
  /** InventoryManager.ItemType index in the game */
  itemType: number
  amount: number
  label: string
  sublabel: string
  /** Relative weight for random selection */
  weight: number
  color: string
}

export const ROULETTE_PRIZES: RoulettePrize[] = [
  {
    id: 'gen-5m',
    itemType: 15, // General5Min
    amount: 2,
    label: '5 MIN',
    sublabel: 'Speed Up ×2',
    weight: 22,
    color: '#2A9D8F',
  },
  {
    id: 'gen-15m',
    itemType: 0, // SpeedupSmall
    amount: 1,
    label: '15 MIN',
    sublabel: 'Speed Up ×1',
    weight: 20,
    color: '#084C61',
  },
  {
    id: 'gen-1h',
    itemType: 16, // General1Hour
    amount: 1,
    label: '1 HOUR',
    sublabel: 'Speed Up ×1',
    weight: 16,
    color: '#E76F51',
  },
  {
    id: 'gen-3h',
    itemType: 1, // SpeedupMedium
    amount: 1,
    label: '3 HOURS',
    sublabel: 'Speed Up ×1',
    weight: 12,
    color: '#F4A261',
  },
  {
    id: 'train-15m',
    itemType: 18, // Train15Min
    amount: 2,
    label: 'TRAIN 15M',
    sublabel: 'Speed Up ×2',
    weight: 10,
    color: '#0A5E78',
  },
  {
    id: 'research-15m',
    itemType: 23, // Research15Min
    amount: 2,
    label: 'RESEARCH 15M',
    sublabel: 'Speed Up ×2',
    weight: 10,
    color: '#C0563A',
  },
  {
    id: 'build-15m',
    itemType: 28, // Build15Min
    amount: 2,
    label: 'BUILD 15M',
    sublabel: 'Speed Up ×2',
    weight: 8,
    color: '#2A9D8F',
  },
  {
    id: 'gen-8h',
    itemType: 2, // SpeedupLarge
    amount: 1,
    label: '8 HOURS',
    sublabel: 'Speed Up ×1',
    weight: 2,
    color: '#FEFAE0',
  },
]

export const SPIN_COOLDOWN_MS = 24 * 60 * 60 * 1000 // 1 free spin per day

export function pickWeightedPrize(prizes: RoulettePrize[] = ROULETTE_PRIZES): RoulettePrize {
  const total = prizes.reduce((s, p) => s + p.weight, 0)
  let r = Math.random() * total
  for (const p of prizes) {
    r -= p.weight
    if (r <= 0) return p
  }
  return prizes[prizes.length - 1]!
}

export function prizeIndex(prize: RoulettePrize, prizes: RoulettePrize[] = ROULETTE_PRIZES): number {
  return prizes.findIndex((p) => p.id === prize.id)
}
