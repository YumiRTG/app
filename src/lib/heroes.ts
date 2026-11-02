import { asset } from '@/lib/assets'

/** Shared hero roster for the hero details and Bestiary. */
export type HeroInfo = {
  id: string
  name: string
  role: string
  img: string
  focus: string
  blurb: string
  tips: string[]
}

export const BASIC_HEROES: HeroInfo[] = [
  {
    id: 'nyra-vale',
    name: 'Nyra Vale',
    role: 'Legendary Shooter',
    img: asset('hero-nyra.png'),
    focus: 'Ranged damage · Energy pressure',
    blurb:
      'Main commander of the Dominion. Nyra holds the tribe together when the wild closes in — the face of your campaign and the heart of every early push.',
    tips: [
      'Keep frontline defenders between Nyra and heavy attackers.',
      'Use her energy pressure and armor penetration to threaten priority targets.',
      'Develop her levels, skills and equipment together.',
    ],
  },
  {
    id: 'tweak-vale',
    name: 'Tweak Vale',
    role: 'Legendary Infantry',
    img: asset('hero-tweak-vale.webp'),
    focus: 'Area damage · Bleed · Last stand',
    blurb:
      'A legendary infantry damage dealer who pressures enemy squads with sweeping attacks and bleeding damage. His once-per-battle last stand keeps him fighting at exactly 1 HP after a lethal hit.',
    tips: [
      'Use his sweeping bleed attack to pressure multiple enemies.',
      'Save his stronger area attack for dangerous enemy groups.',
      'His last stand triggers once per battle, leaves exactly 1 HP and grants no shield.',
    ],
  },
  {
    id: 'alyssa-mey',
    name: 'Alissa Mey',
    role: 'Legendary Rider',
    img: asset('hero-alyssa.png'),
    focus: 'Strike · Mobility',
    blurb:
      'A sharp frontline ally who thrives when the battle opens up. Alissa turns clean openings into decisive kills for your pack.',
    tips: [
      'Great for aggressive campaign stages.',
      'Synergizes with fast troops and raptor-style beasts.',
      'Level her skills when you need more burst on tough nodes.',
    ],
  },
  {
    id: 'carina-vale',
    name: 'Carina Vale',
    role: 'Legendary Rider',
    img: asset('hero-carina.png'),
    focus: 'Area damage · Shield breaking',
    blurb:
      'A sword-wielding damage dealer whose sweeping attacks pressure groups and break enemy shields.',
    tips: [
      'Use her area attacks against clustered enemies.',
      'Bring her against opponents that rely on shields.',
      'Support her with frontline defense so she can keep dealing damage.',
    ],
  },
  {
    id: 'elara-veyn',
    name: 'Elara Veyn',
    role: 'Epic Shooter',
    img: asset('hero-elara.png'),
    focus: 'Ranged damage · Energy generation',
    blurb:
      'A calculated fighter who tips close fights. Elara rewards careful positioning and timed skill use.',
    tips: [
      'Excellent on stages that punish reckless pushes.',
      'Combine with shooters for layered damage.',
      'Upgrade when campaign difficulty spikes.',
    ],
  },
  {
    id: 'ronan',
    name: 'Ronan Vale',
    role: 'Epic Defender',
    img: asset('hero-ronan.png'),
    focus: 'Power · Frontline',
    blurb:
      'A heavy presence in the line. Ronan uses shields, defensive buffs and recovery to hold the front line.',
    tips: [
      'Anchor for infantry-heavy formations.',
      'Good when you need durability over pure speed.',
      'Invest when rival tribes hit harder mid-campaign.',
    ],
  },
  {
    id: 'kael-stormfeather',
    name: 'Kael Stormfeather',
    role: 'Epic Infantry',
    img: asset('game-roster/kael-stormfeather.webp'),
    focus: 'Infantry damage · Team buffs',
    blurb: 'An infantry swordsman with a leaping strike and buffs that help the squad push through dangerous fights.',
    tips: ['Build his levels and skill ranks together.', 'Use his team buffs before a dangerous exchange.', 'Pair his offense with a durable front line.'],
  },
  {
    id: 'mira-thorn',
    name: 'Mira Thorn',
    role: 'Rare Infantry',
    img: asset('game-roster/mira-thorn.webp'),
    focus: 'Spear damage · Armor pressure',
    blurb: 'A spear fighter whose attacks weaken enemy defense and help the squad focus down armored targets.',
    tips: ['Use her defense debuffs before stronger attacks.', 'Combine her with damage dealers that exploit weakened targets.', 'Her economy skills support progression outside battle.'],
  },
]

export function heroById(id: string) {
  return BASIC_HEROES.find((h) => h.id === id)
}
