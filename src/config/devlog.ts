import { GAME_GUIDE } from '@/config/gameGuide'
import { GAME_SCREENSHOTS, LIVE_TOURNAMENT_SCREENSHOT, type GameScreenshot } from '@/config/showcase'

/**
 * DEV PROGRESS HUB — edit this file to update the website log.
 *
 * Media:
 * 1) Drop images or clips into  public/dev/
 * 2) Reference them as  asset('dev/base-v2.png')
 * 3) Commit and push; Vercel redeploys on its own.
 */

export type DevShot = GameScreenshot & { featured?: boolean }

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

/** Native gameplay and UI captures; preview data is identified in each caption. */
export const DEV_SCREENSHOTS: DevShot[] = [
  { ...LIVE_TOURNAMENT_SCREENSHOT, featured: true },
  ...GAME_SCREENSHOTS.filter(shot => shot.id !== LIVE_TOURNAMENT_SCREENSHOT.id),
]

/** Progression log, newest first. */
export const PROGRESS_LOG: ProgressEntry[] = [
  {
    id: 'live-tournaments-and-podium',
    date: '3 November 2026',
    title: 'Live Arena, tournament bracket and Hall of Fame',
    body: 'Live Arena supports manual turn-based 3v3 matches with three teams per commander. The top 64 weekly qualifiers advance to a knockout tournament, including a Sunday third-place match at 19:30 UTC and the final at 20:00 UTC. Spectators can follow matches, and the in-game Hall of Fame preserves the top three of completed seasons. The website now shows native Unity previews with sample participants. These client features are part of development; the public Android download is still pending.',
    tag: 'wip',
  },
  {
    id: 'android-release-target',
    date: '3 November 2026',
    title: 'Android release target: December 2026',
    body: `The planned Android release is ${GAME_GUIDE.releaseTarget}. The public download remains coming soon. Gameplay footage, tournament guides and alliance event previews are now available on the website; follow Discord for release news. Timing and features may change during development.`,
    tag: 'wip',
  },
  {
    id: 'current-roster-and-guides',
    date: '2 November 2026',
    title: 'Roster and game guides refreshed',
    body: `The current development roster contains eight named human heroes and thirteen creature heroes. Guides now explain turn-based Campaign, Horde, current unlock levels and the expanded defense arsenal. The game currently offers ${GAME_GUIDE.languages.length} selectable languages: ${GAME_GUIDE.languages.join(', ')}. Arabic remains in preparation. The next Android download is still pending.`,
    tag: 'wip',
  },
  {
    id: 'quiz-pool-v3',
    date: '2 November 2026',
    title: '1,100 quiz questions',
    body: 'The server quiz pool now contains 1,100 English questions across 22 topics. Each round still has ten questions. Scheduled rounds rotate through the pool without repeating a question within a full cycle, while quizzes already in progress keep their original questions and answers.',
    tag: 'shipped',
  },
  {
    id: 'alliance-boss-eisenruecken',
    date: 'October 2026',
    title: 'Eisenruecken alliance boss',
    body: 'The alliance boss server update is deployed. Coordinate rallies to break its shield, then use solo attacks during its exposed phase. The new model, event panel and reward views are integrated in the client project; distribution in a new Android build is still pending.',
    tag: 'wip',
  },
  {
    id: 'android-download-status',
    date: '2 November 2026',
    title: 'Android download coming soon',
    body: 'The previous APK link has been removed while the next Android build is prepared. Join the Discord community through the website for project news and release updates.',
    tag: 'wip',
  },
  {
    id: 'web-live-data',
    date: 'August 2026',
    title: 'The website went live',
    body: 'The site now reads the running server directly. Standings, alliance power and the arena ladders all come from the same documents the game writes, so what you see on the page is what is happening in the world right now.',
    tag: 'shipped',
  },
  {
    id: 'web-profiles',
    date: 'August 2026',
    title: 'Public commander and alliance pages',
    body: 'Every commander has a shareable profile: total power split across heroes, research and buildings, the army broken down by branch and tier, research completion and the city itself. Alliances get a page with their crest, standing and full roster.',
    tag: 'shipped',
  },
  {
    id: 'web-modes',
    date: 'August 2026',
    title: 'All four modes documented',
    body: 'Primeval Defense, both arena ladders, the world map and the campaign each got a page built from the real numbers in the build, including a live miniature of a defense run.',
    tag: 'shipped',
  },
  {
    id: 'mode-td',
    date: 'July 2026',
    title: 'Primeval Defense',
    body: 'A full real-time defense mode in its own 3D arena. The current mode has 13 fixed maps, 13 tower types, two upgrade branches up to level 6, three difficulties, tower mastery and a shared weekly ranked challenge.',
    tag: 'shipped',
  },
  {
    id: 'mode-team-arena',
    date: 'July 2026',
    title: 'Team Arena 3x3',
    body: 'A second competitive ladder on top of the tactical arena. Nine heroes across three teams, played best of three, with its own rating and weekly season.',
    tag: 'shipped',
  },
  {
    id: 'mode-worldmap',
    date: 'June 2026',
    title: 'Shared world map',
    body: 'One persistent world where every base belongs to a player. Marches, gathering, scouting, garrisons, alliance territory and the rally boss at the centre.',
    tag: 'shipped',
  },
  {
    id: 'alliances',
    date: 'June 2026',
    title: 'Alliances, territory and quests',
    body: 'Alliance levels, shared research, a resource pool, daily quests and a tile-based territory system claimed outward from an alliance centre.',
    tag: 'shipped',
  },
  {
    id: 'perf',
    date: 'July 2026',
    title: 'Performance and memory pass',
    body: 'Android crashes traced to oversized model textures. Textures resized, a cache cap added, shader stripping fixed and the loading path reworked. The build runs on far more phones now.',
    tag: 'shipped',
  },
  {
    id: 'loc',
    date: 'June 2026',
    title: 'Four languages',
    body: 'German, English, French and Spanish were the initial four selectable languages. The current development build supports additional languages, listed in the latest update above.',
    tag: 'shipped',
  },
  {
    id: 'apk-beta',
    date: 'May 2026',
    title: 'Android beta',
    body: 'An early private Android beta was shared with friends. That older APK is no longer offered on this website; the next public download is coming soon.',
    tag: 'shipped',
  },
  {
    id: 'core-loop',
    date: 'Ongoing',
    title: 'Balance and polish',
    body: 'Campaign difficulty, troop roles, hero kits and the economy keep moving with beta feedback.',
    tag: 'wip',
  },
  {
    id: 'vision',
    date: 'The start',
    title: 'Dino Warfront begins',
    body: 'Prehistoric strategy survival: raise a tribe under Nyra Vale, command apex predators, and take the map.',
    tag: 'milestone',
  },
]

/** Roadmap. Honest status only. */
export const FUTURE_UPDATES: FutureUpdate[] = [
  {
    id: 'nyra-story-quests',
    title: 'Nyra Vale story quests',
    body: 'Dedicated story quests for Nyra: her path, her choices, her command as the campaign deepens.',
    status: 'planned',
  },
  {
    id: 'world-bases',
    title: 'Player bases on the web map',
    body: 'Once bases sync to the shared world, the site can plot the real map with every base on it.',
    status: 'planned',
  },
  {
    id: 'gift-codes',
    title: 'Gift code campaigns',
    body: 'The website already has a redemption page. Active codes and reward campaigns will be announced through the community; a valid code and an existing game account are required.',
    status: 'planned',
  },
  {
    id: 'season-history',
    title: 'Season hall of fame',
    body: 'Season history is implemented on the Arena server and in the client project. A new Android release and a web history view are still pending.',
    status: 'in-progress',
  },
  {
    id: 'community-forum',
    title: 'Community forum',
    body: 'A dedicated forum for bug reports and squad talk. Discord is already available through the Community links on this site.',
    status: 'soon',
  },
  {
    id: 'apk-drops',
    title: 'Regular APK drops',
    body: 'New beta builds when major systems land, with version notes on this page.',
    status: 'in-progress',
  },
]
