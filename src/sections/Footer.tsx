import { Link } from 'react-router'

const GAME_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Heroes', to: '/heroes' },
  { label: 'Dinosaurs', to: '/dinos' },
  { label: 'World', to: '/world' },
  { label: 'Daily Rewards', to: '/daily' },
  { label: 'Roulette', to: '/roulette' },
  { label: 'Download APK', to: '/download' },
]

const COMMUNITY_LINKS = ['Discord', 'Forum', 'Wiki', 'Support']

export default function Footer() {
  return (
    <footer className="section-dark pt-16 pb-10 px-6 md:px-20 border-t border-cream/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <span className="font-display text-cream text-xl tracking-[0.1em]">
              DINO DOMINION
            </span>
            <p className="font-body text-cream/50 text-sm mt-3 leading-relaxed max-w-[280px]">
              Prehistoric strategy survival. Build your base, command heroes, tame dinosaurs,
              and conquer the campaign.
            </p>
            <p className="font-ui text-terracotta text-xs mt-4 tracking-[0.12em] uppercase">
              Tame. Fight. Survive.
            </p>
          </div>

          <div>
            <span className="label-text text-cream/50 mb-4 block">PAGES</span>
            <ul className="space-y-1">
              {GAME_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-cream/80 text-base no-underline hover:text-cream transition-colors duration-300 py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label-text text-cream/50 mb-4 block">COMMUNITY</span>
            <ul className="space-y-1">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link}>
                  <span className="font-body text-cream/50 text-base py-1 inline-block">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-cream/10 my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-cream/40 text-xs">
            © {new Date().getFullYear()} Dino Dominion. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Legal Notice', 'Terms of Use'].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <span className="font-body text-cream/40 text-xs">{item}</span>
                {i < 2 && <span className="text-cream/20">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
