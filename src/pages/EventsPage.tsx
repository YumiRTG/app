import { Link } from 'react-router'
import { usePageMotion } from '@/hooks/useMotion'
import { COMMUNITY } from '@/config/community'
import { GAME_GUIDE } from '@/config/gameGuide'
import { GAME_SCREENSHOTS } from '@/config/showcase'
import { GameScreenshotImage } from '@/components/GameplayShowcase'
import LiveTournamentInfo from '@/components/LiveTournamentInfo'

const ALLIANCE_EVENTS = [
  { title: 'Alliance War · Three lanes', text: 'Choose a lane, prepare your hero defense and build an attack team. Earn stars against opposing defenses and contribute to your alliance result.' },
  { title: 'Alliance Defense', text: 'Take on a shared tower-defense map and improve your best wave count. The best runs from alliance members combine into one alliance score.' },
  { title: 'Territory competition', text: 'Coordinate marches, reinforce allies and rally together on the shared world map. Work toward objectives that need more than one commander.' },
  { title: 'World Boss hunts', text: 'Join scheduled hunts on the world map. Send marches, build your damage contribution and compare progress with your alliance.' },
]

export default function EventsPage() {
  const motionRef = usePageMotion()
  return (
    <div ref={motionRef} className="page-shell">
      <div className="container-dd pb-24">
        <header className="max-w-3xl">
          <p className="eyebrow">Competition & cooperation</p>
          <h1 className="display-lg text-white mt-4">Live tournaments.<br /><span className="text-gradient-magma">Alliance challenges.</span></h1>
          <p className="body-lg mt-5">Make every formation count. Compete against another commander in Live Arena, follow the weekly tournament or join forces with your alliance for shared challenges.</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="#live-tournaments" className="btn-primary no-underline">Live tournament guide</a>
            <a href="#alliance-events" className="btn-secondary no-underline">Alliance events</a>
          </div>
        </header>
        <LiveTournamentInfo />
        <section id="alliance-events" className="mt-16 md:mt-24 scroll-mt-28" aria-labelledby="alliance-events-heading">
          <div className="sec-ornament mb-4 max-w-[240px]"><span>Alliance events</span></div>
          <h2 id="alliance-events-heading" className="display-lg text-white">Win for<br /><span className="text-gradient-gold">your alliance.</span></h2>
          <p className="body-lg mt-5 mb-8 max-w-3xl">Plan your defense, support your teammates and turn individual results into a shared achievement. Check the in-game event calendar for registration, active phases and rewards.</p>
          <figure className="gameplay-showcase__featured">
            <GameScreenshotImage shot={GAME_SCREENSHOTS[5]} sizes="(min-width: 1280px) 1200px, 100vw" />
            <figcaption className="font-body text-sm text-[var(--bone-dim)]">Alliance War development UI. Sample teams and scores are shown.</figcaption>
          </figure>
          <div className="grid md:grid-cols-2 gap-4 mt-7">
            {ALLIANCE_EVENTS.map(event => (
              <article key={event.title} className="dd-panel p-6 md:p-8">
                <h3 className="font-display text-2xl text-white uppercase">{event.title}</h3>
                <p className="body-lg mt-4">{event.text}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link to="/modes/world-map" className="btn-secondary no-underline">Explore the world map</Link>
            <Link to="/features/world-boss" className="btn-secondary no-underline">World Boss guide</Link>
          </div>
        </section>
        <aside className="dd-panel p-6 md:p-9 mt-16">
          <p className="eyebrow">Follow the development</p>
          <h2 className="font-display text-3xl text-white uppercase mt-4">Android · Planned for {GAME_GUIDE.releaseTarget}</h2>
          <p className="body-lg mt-4 max-w-3xl">The public download is coming soon. These features are part of the current development preview; release timing, UI and balance may change. Follow the community for release news.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={COMMUNITY.discordUrl} target="_blank" rel="noopener noreferrer" className="btn-primary no-underline">Join Discord</a>
            <Link to="/progress" className="btn-secondary no-underline">Development updates</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
