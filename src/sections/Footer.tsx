import { Link } from 'react-router'
import DinoMark from '@/components/DinoMark'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Story', to: '/story' },
  { label: 'Features', to: '/features' },
  { label: 'Play', to: '/play' },
  { label: 'Bestiary', to: '/bestiary' },
  { label: 'Download', to: '/download' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#f0c14d]/15 bg-[#0c1a12]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="text-[#e9b44c]">
            <DinoMark className="w-6 h-6" />
          </span>
          <div>
            <p className="font-display tracking-[0.14em] text-[#f0e6d0]">DINO DOMINION</p>
            <p className="font-body text-xs text-[#c4b89a]/70 mt-1">
              Tame. Hunt. Conquer.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-ui text-[11px] uppercase tracking-[0.16em] text-[#c4b89a]/80 no-underline hover:text-[#e9b44c]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-4 text-center font-body text-[11px] text-white/30">
        © {new Date().getFullYear()} Dino Dominion
      </div>
    </footer>
  )
}
