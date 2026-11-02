export const GAMEPLAY_TRAILER_URL = 'https://youtu.be/awej6Zk-oO0'

export const GAME_SCREENSHOTS = [
  {
    id: 'campaign', title: '3D campaign battles', category: 'Heroes & creatures',
    alt: 'A fire dragon attacks Infernohorn while human heroes hold their formation in a volcanic 3D battlefield',
    caption: 'Build a squad of human and creature heroes for turn-based campaign battles.',
    to: '/modes/campaign',
  },
  {
    id: 'tower-defense', title: 'Primeval Defense', category: 'Tower defense',
    alt: 'Bone towers, an ice tower and a dragon defend a lagoon route against a wave of enemies',
    caption: 'Build your defenses, choose upgrade branches and answer each incoming wave.',
    to: '/modes/tower-defense',
  },
  {
    id: 'hero-ultimate', title: 'Hero ultimates', category: 'Skills & formations',
    alt: 'Carina Vale, Ronan Vale and Alissa Mey face creature opponents in a 3D battle arena',
    caption: 'Develop hero skills and combine different roles in a three-hero formation.',
    to: '/features/heroes',
  },
  {
    id: 'partner', title: 'Your dinosaur partner', category: 'Raise a companion',
    alt: 'A young Velociraptor partner stands in its jungle habitat between ancient ruins',
    caption: 'Choose a T-Rex, Velociraptor or Parasaurolophus and grow your bond through daily care.',
    to: '/features/partner-system',
  },
  {
    id: 'world-map', title: 'Command your marches', category: 'Shared world map',
    alt: 'Dinosaur formations follow cyan marching routes past a settlement on the shared world map',
    caption: 'Send formations beyond your settlement and coordinate your next move with allies.',
    to: '/modes/world-map',
  },
  {
    id: 'alliance-events', title: 'Alliance lane battles', category: 'Event UI preview',
    alt: 'The alliance war screen shows three lanes, defense heroes, sample scores and an attack target',
    caption: 'Prepare your defense and attack team for alliance competition. Development UI with sample scores.',
    to: '/events#alliance-events',
  },
] as const

export type GameScreenshot = (typeof GAME_SCREENSHOTS)[number]
