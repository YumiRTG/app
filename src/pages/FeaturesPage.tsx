import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { asset } from '@/lib/assets'
import { usePageMotion } from '@/hooks/useMotion'

const features = [
  {
    title: 'Build your base', category: 'City & economy',
    text: 'Upgrade your Town Hall, expand resource production and research improvements for your economy and army. Your city supplies every expedition beyond its walls.',
    tags: ['Buildings', 'Production', 'Research'], image: 'base',
    alt: 'A fortified settlement surrounded by jungle and mountains',
    to: '/features/base', link: 'Explore base building',
  },
  {
    title: 'Command your heroes', category: 'Roster & progression',
    text: 'Recruit heroes, raise their levels and develop their skills. Build squads for campaign battles and the Arena, then strengthen your commanders with equipment.',
    tags: ['Hero roster', 'Skills', 'Equipment'], image: 'heroes',
    alt: 'Nyra Vale standing among the jungle ruins',
    to: '/features/heroes', link: 'Meet the heroes',
  },
  {
    title: 'Discover the dinosaurs', category: 'Prehistoric roster',
    text: 'Explore the dinosaur roster, from Velociraptor and Triceratops to Tyrannosaurus. Get to know the creatures and their combat roles as you build your prehistoric force.',
    tags: ['Raptors', 'Armored beasts', 'Apex predators'], image: 'dinosaurs-scene',
    alt: 'Tyrannosaurus, Triceratops and Velociraptors in a lush prehistoric valley',
    to: '/features/dinos', link: 'Explore the dinosaur roster',
  },
  {
    title: 'Train your army', category: 'Troops & formations',
    text: 'Train Infantry, Shooters and Riders in their camps. Unlock stronger troop tiers and plan around the counter cycle: Infantry beat Shooters, Shooters beat Riders, and Riders beat Infantry.',
    tags: ['Three troop types', 'Training', 'Counters'], image: 'army-scene',
    alt: 'Infantry, archers and dinosaur riders training in a fortified settlement',
    to: '/features/base', link: 'Explore camps & buildings',
  },
  {
    title: 'Conquer the campaign', category: 'Solo PvE',
    text: 'Fight through nine regions and 78 stages, from jungle to ice and volcanic lands. Clear bosses, collect stage rewards and return on higher difficulties to earn stars again.',
    tags: ['9 regions', '78 stages', 'Boss battles'], image: 'campaign',
    alt: 'Campaign map with jungle, volcanic, icy and coastal regions',
    to: '/modes/campaign', link: 'Explore the campaign',
  },
  {
    title: 'Grow an alliance', category: 'Cooperative play',
    text: 'Join other commanders, help with upgrades and contribute to alliance research and quests. Coordinate rallies and build a shared presence on the world map.',
    tags: ['Member help', 'Alliance research', 'Rallies'], image: 'alliance-scene',
    alt: 'Allied commanders planning together around a stone campaign table',
    to: '/modes/world-map', link: 'Explore shared-world play',
  },
  {
    title: 'Explore the world map', category: 'Multiplayer strategy',
    text: 'Send marches to gather resources, hunt monsters and scout other player bases. Choose when to attack, reinforce an ally or protect your city as you move into more dangerous territory.',
    tags: ['Gathering', 'Monster hunts', 'Player battles'], image: 'world',
    alt: 'World map artwork showing islands and volcanic territory',
    to: '/modes/world-map', link: 'Explore the world map',
  },
  {
    title: 'Hold the line', category: 'Primeval Defense',
    text: 'Place and upgrade towers to stop incoming enemy waves. Work through the defense stages, then take on the Weekly Skill Test with a shared map and one weekly reward claim.',
    tags: ['Tower defense', 'Enemy waves', 'Weekly challenge'], image: 'defense',
    alt: 'Defensive towers overlooking a prehistoric valley at sunset',
    to: '/modes/tower-defense', link: 'Explore Primeval Defense',
  },
  {
    title: 'Rise through the Arena', category: 'Competitive hero battles',
    text: 'Choose a three-hero squad for the Tactical Arena or field nine heroes across three teams in Team Arena. Challenge player defenses and climb the weekly rankings.',
    tags: ['Tactical Arena', 'Team Arena', 'Weekly seasons'], image: 'arena',
    alt: 'A stone arena surrounded by jungle, ready for battle',
    to: '/modes/arena', link: 'Explore the Arena',
  },
]

function FeatureImage({ name, alt, eager = false }: {
  name: string
  alt: string
  eager?: boolean
}) {
  return (
    <img
      src={asset(`features/${name}-960.webp`)}
      srcSet={`${asset(`features/${name}-480.webp`)} 480w, ${asset(`features/${name}-960.webp`)} 960w`}
      sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
      alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover:scale-[1.035]"
    />
  )
}

export default function FeaturesPage() {
  const motionRef = usePageMotion()

  return (
    <div ref={motionRef} className="page-shell">
      <div className="container-dd">
        <header className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center mb-14 md:mb-20">
          <div data-reveal="up">
            <p className="eyebrow">Inside Dino Warfront</p>
            <h1 className="display-lg text-white mt-4">
              Build your<br /><span className="text-gradient-magma">dominion.</span>
            </h1>
            <p className="body-lg mt-5 max-w-xl">
              Grow a city, recruit heroes and lead your army into a prehistoric world.
              From solo campaigns to alliance rallies, each system gives you a new way to progress.
            </p>
            <a href="#game-features" className="btn-secondary no-underline mt-6 inline-flex">
              Explore the features <span aria-hidden="true">↓</span>
            </a>
          </div>
          <Link to="/features/partner-system" className="dd-card group block overflow-hidden no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]" aria-label="Explore the partner dinosaur system">
            <div className="relative aspect-[3/2] bg-[#14121b]">
              <FeatureImage name="partner" alt="A commander bonding with a young dinosaur" eager />
            </div>
            <div className="p-5 flex items-center justify-between gap-4 border-t border-[var(--gold)]/15">
              <div>
                <p className="eyebrow text-[9px]">Partner dinosaurs</p>
                <p className="font-display text-xl text-white uppercase mt-2">Raise a companion of your own</p>
              </div>
              <ArrowUpRight className="text-[var(--gold)] shrink-0" aria-hidden="true" />
            </div>
          </Link>
        </header>

        <section id="game-features" aria-labelledby="features-heading" className="scroll-mt-36">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
            <div>
              <p className="eyebrow">Build · Command · Compete</p>
              <h2 id="features-heading" className="font-display text-3xl md:text-4xl text-white uppercase mt-3">Find your next objective</h2>
            </div>
            <p className="font-body text-sm text-[var(--bone-dim)] max-w-sm">
              Features open as your Town Hall and account progress. Explore each system below.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.to} className="dd-card group flex flex-col overflow-hidden no-underline text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">
                <div className="relative aspect-[3/2] overflow-hidden bg-[radial-gradient(ellipse_at_center,#292434_0%,#0d0b13_75%)]">
                  <FeatureImage name={feature.image} alt={feature.alt} />
                  <span className="absolute top-3 left-3 rounded-sm border border-white/20 bg-black/65 px-2 py-1 font-ui text-[10px] tracking-widest text-white" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6 border-t border-[var(--gold)]/15">
                  <p className="font-ui text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">{feature.category}</p>
                  <h3 className="font-display text-2xl text-white uppercase mt-2">{feature.title}</h3>
                  <p className="font-body text-sm text-[var(--bone-dim)] mt-3 leading-relaxed">{feature.text}</p>
                  <ul className="flex flex-wrap gap-2 mt-5 mb-6" aria-label={`${feature.title} highlights`}>
                    {feature.tags.map((tag) => (
                      <li key={tag} className="text-[11px] font-body text-[var(--bone)] border border-white/10 rounded-sm px-2 py-1">{tag}</li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center justify-between gap-3 font-ui text-[10px] uppercase tracking-[0.12em] text-[var(--gold)] group-hover:text-white transition-colors">
                    {feature.link}<ArrowUpRight size={17} className="shrink-0" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 md:mt-16 border-t border-[var(--gold)]/20 pt-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl text-white uppercase">Your next move starts in the city.</h2>
            <p className="font-body text-sm text-[var(--bone-dim)] mt-2">Download the Android beta and build your first dominion.</p>
          </div>
          <Link to="/download" className="btn-primary no-underline">Download the game <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  )
}
