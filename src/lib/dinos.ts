import { asset } from '@/lib/assets'

/** Basic dino roster — simple facts only */
export type DinoInfo = {
  id: string
  name: string
  role: string
  img: string
  blurb: string
}

export const BASIC_DINOS: DinoInfo[] = [
  {
    id: 'tyrannosaurus',
    name: 'Tyrannosaurus',
    role: 'Apex attacker',
    img: asset('dino-tyranno.png'),
    blurb: 'Heavy hitter. High damage frontline beast for breaking tough stages.',
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    role: 'Fast striker',
    img: asset('dino-raptor.png'),
    blurb: 'Quick and sharp. Good for speed and flanking with agile squads.',
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    role: 'Epic Defender',
    img: asset('dino-triceratops.png'),
    blurb: 'Tough shield. Holds the line while your army deals damage.',
  },
  {
    id: 'dilophosaurus',
    name: 'Dilophosaurus',
    role: 'Control',
    img: asset('dino-dilo.png'),
    blurb: 'Disruptive fighter. Useful when you need pressure and control in a fight.',
  },
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    role: 'Defense',
    img: asset('dino-stego.png'),
    blurb: 'Sturdy defender. Helps absorb hits and protect weaker units.',
  },
  {
    id: 'allosaurus',
    name: 'Allosaurus',
    role: 'Epic Shooter',
    img: asset('dino-allo.png'),
    blurb: 'A ranged-class creature hero with offensive skills; its game class is Shooter.',
  },
  {
    id: 'pterodactyl',
    name: 'Pterodactyl',
    role: 'Epic Rider',
    img: asset('dino-ptera.png'),
    blurb: 'Aerial threat. Brings mobility and pressure from above.',
  },
  {
    id: 'mammoth',
    name: 'Mammoth',
    role: 'Epic Infantry',
    img: asset('dino-mammoth.png'),
    blurb: 'Big and durable. Strong presence in long, grinding battles.',
  },
  {
    id: 'smilodon',
    name: 'Smilodon',
    role: 'Ambush',
    img: asset('dino-smilodon.png'),
    blurb: 'Fierce ambusher. Hits hard when you need a burst of raw power.',
  },
  {
    id: 'fire-dragon',
    name: 'Fire Dragon',
    role: 'Legendary Infantry',
    img: asset('dino-dragon.png'),
    blurb: 'Rare apex creature. High-impact pick for late power spikes.',
  },
  {
    id: 'parasaurolophus',
    name: 'Parasaurolophus',
    role: 'Epic Rider',
    img: asset('dino-para.png'),
    blurb: 'A rider-class creature with sonic calls and supportive abilities. This hero is separate from the partner dinosaur you raise.',
  },
  {
    id: 'raccoon',
    name: 'Raccoon',
    role: 'Rare Shooter',
    img: asset('game-roster/raccoon.webp'),
    blurb: 'A small creature hero in the Shooter class, with its own combat and progression skills.',
  },
  {
    id: 'featherclaw',
    name: 'Featherclaw',
    role: 'Rare Rider',
    img: asset('game-roster/featherclaw.webp'),
    blurb: 'A feathered raptor built for fast attacks and evasive movement. Its economy track supports gathering, food production and training.',
  },
]
