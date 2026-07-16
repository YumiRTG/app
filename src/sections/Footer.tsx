import { Link } from 'react-router'
import DinoMark from '@/components/DinoMark'
import { COMMUNITY } from '@/config/community'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Story', to: '/story' },
  { label: 'Features', to: '/features' },
  { label: 'Play', to: '/play' },
  { label: 'Bestiary', to: '/bestiary' },
  { label: 'Download', to: '/download' },
]

function openSupport() {
  window.dispatchEvent(new Event('dd-open-support'))
  if (window.location.hash !== '#support') {
    window.location.hash = 'support'
  }
}

export default function Footer() {
  return (
    <footer className="border-t border-[#f0c14d]/15 bg-[#0c1a12]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex items-start gap-3">
          <span className="text-[#e9b44c] mt-0.5">
            <DinoMark className="w-6 h-6" />
          </span>
          <div>
            <p className="font-display tracking-[0.14em] text-[#f0e6d0]">DINO DOMINION</p>
            <p className="font-body text-xs text-[#c4b89a]/70 mt-1 leading-relaxed">
              Tame. Hunt. Conquer.
            </p>
          </div>
        </div>

        <div>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-[#f0c14d] mb-3">
            Pages
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#c4b89a]/80 no-underline hover:text-[#e9b44c]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-[#f0c14d] mb-3">
            Community
          </p>
          <div className="flex flex-col gap-2 items-start">
            <button
              type="button"
              onClick={openSupport}
              className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#c4b89a]/90 bg-transparent border-none cursor-pointer p-0 hover:text-[#e9b44c] text-left"
            >
              Support chat
            </button>

            {COMMUNITY.discordUrl ? (
              <a
                href={COMMUNITY.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#c4b89a]/90 no-underline hover:text-[#e9b44c]"
              >
                Discord
              </a>
            ) : (
              <span className="font-ui text-[11px] uppercase tracking-[0.14em] text-white/35">
                Discord · coming soon
              </span>
            )}

            {COMMUNITY.forumUrl ? (
              <a
                href={COMMUNITY.forumUrl}
                target="_blank"
                rel="noreferrer"
                className="font-ui text-[11px] uppercase tracking-[0.14em] text-[#c4b89a]/90 no-underline hover:text-[#e9b44c]"
              >
                Forum
              </a>
            ) : (
              <span className="font-ui text-[11px] uppercase tracking-[0.14em] text-white/35">
                Forum · coming soon
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04] py-4 text-center font-body text-[11px] text-white/30">
        © {new Date().getFullYear()} Dino Dominion
      </div>
    </footer>
  )
}
