/**
 * Lightweight on-site support assistant (no API key on GitHub Pages).
 * Answers from a Dino Dominion knowledge base + page guidance.
 */

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  at: number
}

type KbEntry = {
  keys: string[]
  answer: string
}

const KB: KbEntry[] = [
  {
    keys: ['download', 'apk', 'install', 'android', 'herunterladen', 'installation'],
    answer:
      'You can download the Android beta on the Download page. Open this site on your phone → Download APK → allow install from browser if asked. The file is large (~3.5 GB), so Wi‑Fi is recommended.',
  },
  {
    keys: ['login', 'account', 'account id', 'anmelden', 'accountid', 'player id', 'settings'],
    answer:
      'Use Log in with your Account player ID from the game (Settings). No password. Your commander name loads automatically from the game cloud. You cannot create a new account on the website.',
  },
  {
    keys: ['daily', 'login reward', 'streak', 'täglich', 'belohnung'],
    answer:
      'On the Play page, open Daily login. Claim once per day (resets 00:00 UTC). Keep your streak for better speed ups. Rewards go to your game inventory when you open the app.',
  },
  {
    keys: ['roulette', 'spin', 'wheel', 'glücksrad'],
    answer:
      'On Play → Roulette you get 1 free spin every 24 hours. Wins are speed ups that are sent to your game account and claimed when the game is online.',
  },
  {
    keys: ['reward', 'speed up', 'speedup', 'inventory', 'inventar', 'item'],
    answer:
      'Website rewards (daily + roulette) are written to your Account ID and claimed in-game by WebRewardService into your inventory. Open the game after claiming so items can sync.',
  },
  {
    keys: ['discord', 'community', 'chat server'],
    answer:
      'Discord is listed under Community. If the invite is not live yet, use this Support chat for help in the meantime. Ask your admin to add the Discord link when ready.',
  },
  {
    keys: ['forum', 'board'],
    answer:
      'The Forum is coming soon under Community. For now I can help with install, login, rewards and game basics right here.',
  },
  {
    keys: ['support', 'help', 'hilfe', 'problem', 'bug', 'error', 'fehler'],
    answer:
      'I am the on-site Support assistant. I can help with APK install, Account ID login, daily rewards, roulette, and game basics. Describe your issue in a short sentence.',
  },
  {
    keys: ['dino', 'dinosaur', 'tyranno', 'raptor', 'creature', 'bestiary'],
    answer:
      'Check Bestiary for dinosaurs and heroes (Nyra Vale and more). In-game you tame creatures, train them and use unique skills in campaign battles.',
  },
  {
    keys: ['hero', 'nyra', 'commander', 'ally'],
    answer:
      'Nyra Vale is the featured commander. Other heroes appear in Bestiary. Recruit and level them in-game for skill kits and battle power.',
  },
  {
    keys: ['feature', 'gameplay', 'build', 'base', 'campaign', 'how to play'],
    answer:
      'Core loop: build your base → train troops → recruit heroes → tame dinos → clear campaign stages → grow offline production. See Features and Story for the full overview.',
  },
  {
    keys: ['permission', 'firebase', 'cloud', 'login failed'],
    answer:
      'If login fails, check that your Account ID is correct (from game Settings) and that you have internet. Cloud permissions must allow reading player data. Try again in a minute.',
  },
  {
    keys: ['hello', 'hi', 'hey', 'hallo', 'moin', 'servus'],
    answer:
      'Hey commander! I am Dominion Support. Ask me about download, login, daily rewards, roulette, dinos or anything else on the site.',
  },
  {
    keys: ['thank', 'danke', 'thx'],
    answer: 'Glad to help. Good hunting out there — Tame. Hunt. Conquer.',
  },
]

function score(entry: KbEntry, q: string): number {
  let s = 0
  for (const k of entry.keys) {
    if (q.includes(k)) s += k.length > 4 ? 3 : 2
  }
  return s
}

export function supportReply(userText: string): string {
  const q = userText.trim().toLowerCase()
  if (!q) {
    return 'Type a short question — e.g. “How do I download?” or “Where is my Account ID?”'
  }

  let best: KbEntry | null = null
  let bestScore = 0
  for (const entry of KB) {
    const s = score(entry, q)
    if (s > bestScore) {
      bestScore = s
      best = entry
    }
  }

  if (best && bestScore > 0) return best.answer

  return (
    'I am not sure yet. Try asking about: download / APK, Account ID login, daily rewards, roulette, dinosaurs, heroes, or Discord. ' +
    'You can also open Download, Play, or Bestiary from the menu.'
  )
}

export function welcomeMessage(): string {
  return (
    'Welcome to Dino Dominion Support. Ask me anything about the game or site — download, Account ID login, daily rewards, roulette, dinos, and more.'
  )
}
