import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Play } from 'lucide-react'
import { GAME_SCREENSHOTS, GAMEPLAY_TRAILER_URL, type GameScreenshot } from '@/config/showcase'
import { asset } from '@/lib/assets'
import './GameplayShowcase.css'

export function GameScreenshotImage({ shot, className = '', sizes = '100vw' }: {
  shot: GameScreenshot
  className?: string
  sizes?: string
}) {
  return <img
    src={asset(`gameplay/${shot.id}-1600.webp`)}
    srcSet={`${asset(`gameplay/${shot.id}-480.webp`)} 480w, ${asset(`gameplay/${shot.id}-1600.webp`)} 1600w`}
    sizes={sizes} width={1600} height={900} alt={shot.alt}
    loading="lazy" decoding="async" className={className}
  />
}

export default function GameplayShowcase() {
  const [selected, setSelected] = useState(0)
  const shot = GAME_SCREENSHOTS[selected]

  return (
    <section id="gameplay-screenshots" className="section-band gameplay-showcase" aria-labelledby="gameplay-heading">
      <div className="container-dd">
        <div className="gameplay-showcase__lead">
          <div>
            <div className="sec-ornament mb-4 max-w-[240px]"><span>Inside the game</span></div>
            <h2 id="gameplay-heading" className="display-lg text-white">Your next<br /><span className="text-gradient-magma">battle awaits.</span></h2>
            <p className="body-lg mt-5 max-w-lg">Command human and dinosaur heroes in tactical 3D battles. Build your defenses, raise a partner and explore a shared prehistoric world.</p>
            <a href={GAMEPLAY_TRAILER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary no-underline mt-7 inline-flex">
              <Play size={16} aria-hidden="true" /> Watch gameplay · 30 seconds
            </a>
            <p className="gameplay-showcase__note mt-4">In-game screenshots. Game in development; visuals and features may change before release.</p>
          </div>
          <figure id="gameplay-active-shot" className="gameplay-showcase__featured">
            <GameScreenshotImage shot={shot} sizes="(min-width: 1024px) 60vw, 100vw" />
            <figcaption aria-live="polite">
              <p className="eyebrow">{shot.category}</p>
              <h3 className="font-display text-xl text-white uppercase mt-2">{shot.title}</h3>
              <p className="font-body text-sm text-[var(--bone-dim)] mt-2">{shot.caption}</p>
              <div className="gameplay-showcase__links">
                <Link to={shot.to}>Explore this feature <ArrowUpRight size={14} aria-hidden="true" /></Link>
                <a href={asset(`gameplay/${shot.id}-1600.webp`)} target="_blank" rel="noopener noreferrer">Open full screenshot <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="gameplay-showcase__thumbs" role="group" aria-label="Choose a game screenshot">
          {GAME_SCREENSHOTS.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={index === selected} aria-controls="gameplay-active-shot" onClick={() => setSelected(index)}>
              <img src={asset(`gameplay/${item.id}-480.webp`)} width={480} height={270} alt="" loading="lazy" decoding="async" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
