import { asset } from '@/lib/assets'

/**
 * DEV PROGRESS HUB — edit this file to update the website log.
 *
 * Screenshots:
 * 1) Save images into  public/dev/  (create the folder)
 *    e.g.  public/dev/base-v2.png
 * 2) Reference them as  asset('dev/base-v2.png')
 * 3) Commit & push — Vercel updates automatically.
 */

export type DevScreenshot = {
  src: string
  caption: string
  date?: string
}

export type ProgressEntry = {
  id: string
  date: string
  title: string
  body: string
  tag?: 'shipped' | 'wip' | 'milestone'
}

export type FutureUpdate = {
  id: string
  title: string
  body: string
  status: 'planned' | 'in-progress' | 'soon'
}

/** Development / in-game screenshots (replace with your own printscreens) */
export const DEV_SCREENSHOTS: DevScreenshot[] = [
  {
    src: asset('ui-buildings.png'),
    caption: 'Base & buildings UI',
    date: 'Dev build',
  },
  {
    src: asset('ui-hero-screen.png'),
    caption: 'Hero screen',
    date: 'Dev build',
  },
  {
    src: asset('ui-combat.png'),
    caption: 'Combat view',
    date: 'Dev build',
  },
  {
    src: asset('ui-tech.png'),
    caption: 'Tech / research',
    date: 'Dev build',
  },
  {
    src: asset('ui-alliance.png'),
    caption: 'Alliance UI',
    date: 'Dev build',
  },
  {
    src: asset('campaign-map.png'),
    caption: 'Campaign map',
    date: 'Dev build',
  },
]

/** Progression log — newest first */
export const PROGRESS_LOG: ProgressEntry[] = [
  {
    id: 'web-2026-07',
    date: '2026-07',
    title: 'Official friend-beta website live',
    body: 'Landing site on Vercel: features, bestiary, campaign info, APK download, Account ID login, daily rewards, roulette and free support chat.',
    tag: 'shipped',
  },
  {
    id: 'apk-beta',
    date: '2026-07',
    title: 'Android APK friend beta',
    body: 'Private beta APK hosted for friends (~3.5 GB). Install from the Download page; Wi‑Fi recommended.',
    tag: 'shipped',
  },
  {
    id: 'web-rewards',
    date: '2026-07',
    title: 'Web daily login & roulette',
    body: 'Logged-in players claim daily speed-ups and free roulette spins. Rewards sync to the game inventory when the app is open.',
    tag: 'shipped',
  },
  {
    id: 'core-loop',
    date: 'In development',
    title: 'Core game loop',
    body: 'Build base, train troops, recruit heroes, tame dinos, push campaign stages across jungle, ice, volcano and water realms.',
    tag: 'wip',
  },
  {
    id: 'systems',
    date: 'In development',
    title: 'Systems polish',
    body: 'Production chains, hospital recovery, research tree, army tiers and alliance foundations continue to expand in the Unity client.',
    tag: 'wip',
  },
  {
    id: 'vision',
    date: 'Milestone',
    title: 'Dino Dominion vision locked',
    body: 'Prehistoric strategy survival: raise a tribe under Nyra Vale, command apex predators, and conquer the campaign map.',
    tag: 'milestone',
  },
]

/** Future updates / roadmap (keep honest and short) */
export const FUTURE_UPDATES: FutureUpdate[] = [
  {
    id: 'more-screens',
    title: 'Fresh development screenshots',
    body: 'Regular printscreens from the Unity build so friends see real progress, not only marketing art.',
    status: 'in-progress',
  },
  {
    id: 'apk-drops',
    title: 'Regular APK drops',
    body: 'New beta builds on Google Drive when major systems land — version notes on this page.',
    status: 'planned',
  },
  {
    id: 'discord-forum',
    title: 'Discord & forum',
    body: 'Community channels for bug reports, squad talk and update announcements.',
    status: 'soon',
  },
  {
    id: 'balance',
    title: 'Campaign & combat balance',
    body: 'Stage difficulty, troop roles and hero/dino kits tuned from friend-beta feedback.',
    status: 'planned',
  },
  {
    id: 'content',
    title: 'More content packs',
    body: 'Extra campaign nodes, creatures and events as the base loop is stable.',
    status: 'planned',
  },
  {
    id: 'nyra-story-quests',
    title: 'Nyra Vale Story Quests',
    body: 'Dedicated story quests for Nyra Vale — full control over her path, choices and command as the campaign deepens.',
    status: 'planned',
  },
]
