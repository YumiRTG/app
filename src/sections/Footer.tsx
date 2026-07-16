import { Link } from 'react-router'

const GAME_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Story', to: '/story' },
  { label: 'Features', to: '/features' },
  { label: 'Gameplay', to: '/gameplay' },
  { label: 'Heroes', to: '/heroes' },
  { label: 'Army', to: '/army' },
  { label: 'Dinosaurs', to: '/dinos' },
  { label: 'World', to: '/world' },
  { label: 'Realms', to: '/realms' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Daily Rewards', to: '/daily' },
  { label: 'Roulette', to: '/roulette' },
  { label: 'Download APK', to: '/download' },
]

export default function Footer() {
  return (
    <footer className="section-dark pt-12 pb-8 px-6 md:px-20 border-t border-cream/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <span className="font-display text-cream text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
            <p className="font-body text-cream/50 text-sm mt-3 max-w-[260px] leading-relaxed">
              Prehistoric strategy survival.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 max-w-[640px]">
            {GAME_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-cream/70 text-sm no-underline hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-[1px] bg-cream/10 my-8" />
        <p className="font-body text-cream/40 text-xs">
          © {new Date().getFullYear()} Dino Dominion. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
