import { Link } from 'react-router'
import { GAME_GUIDE } from '@/config/gameGuide'
import { GAME_SCREENSHOTS } from '@/config/showcase'
import { GameScreenshotImage } from '@/components/GameplayShowcase'
import './GameplayShowcase.css'

export default function LiveEventsShowcase() {
  return (
    <section id="live-events" className="section-band live-events-showcase" aria-labelledby="live-events-heading">
      <div className="container-dd">
        <div className="sec-ornament mb-4 max-w-[240px]"><span>Live competition</span></div>
        <h2 id="live-events-heading" className="display-lg text-white">Make your mark.<br /><span className="text-gradient-gold">Together or head to head.</span></h2>
        <p className="body-lg mt-5 mb-9 max-w-2xl">Play for your place in a live tournament, or bring your alliance together for the next shared challenge.</p>
        <div className="live-events-showcase__grid">
          <article className="live-events-showcase__card">
            <p className="eyebrow">Live Arena · Weekly tournaments</p>
            <h3 className="display-md text-white mt-4">From qualifier<br />to champion.</h3>
            <p className="body-lg mt-5">Face real opponents in live, turn-based 3v3 battles. Prepare three teams, choose your abilities and fight for a place among the top {GAME_GUIDE.liveArena.finalists}.</p>
            <ol className="competition-path" aria-label="Weekly tournament progression">
              <li><span>Mon–Fri</span><strong>Qualify</strong></li>
              <li><span>Top 64</span><strong>Knockouts</strong></li>
              <li><span>Sunday</span><strong>The final</strong></li>
            </ol>
            <p className="font-body text-sm text-[var(--bone-dim)] mb-7">Best of three. One weekly champion. Watch ongoing matches as a spectator and follow the bracket to the final.</p>
            <Link to="/events#live-tournaments" className="btn-secondary no-underline">Explore live tournaments</Link>
          </article>
          <article className="live-events-showcase__card">
            <p className="eyebrow">Alliance events · Shared goals</p>
            <h3 className="display-md text-white mt-4">One alliance.<br />More ways to win.</h3>
            <p className="body-lg mt-5">Prepare lane defenses, push your best tower-defense run and coordinate your forces for territory competition and boss hunts.</p>
            <GameScreenshotImage shot={GAME_SCREENSHOTS[5]} sizes="(min-width: 1024px) 45vw, 100vw" className="live-events-showcase__image" />
            <Link to="/events#alliance-events" className="btn-secondary no-underline">Explore alliance events</Link>
          </article>
        </div>
      </div>
    </section>
  )
}
