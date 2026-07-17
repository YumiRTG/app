import { Link } from 'react-router'
import { asset } from '@/lib/assets'
import { usePageMotion } from '@/hooks/useMotion'

const PILLARS = [
  {
    title: 'Build your base',
    text: 'The plaza is only the first layer. Offline production feeds a city that never fully sleeps…',
    hook: 'What you raise first decides how long you last.',
    img: asset('feature-base-hero.jpg'),
    pos: 'center 35%',
    to: '/features/base',
  },
  {
    title: 'Command heroes',
    text: 'Nyra is the face of the tribe — not the whole war. Other legends wait behind the first ranks.',
    hook: 'Open the roster. The real kits are deeper.',
    img: asset('feature-heroes-hero.jpg'),
    pos: 'center 18%',
    to: '/features/heroes',
  },
  {
    title: 'Tame dinosaurs',
    text: 'You see the apex names. You do not yet see how they break a formation together.',
    hook: 'Roles only make sense once you hunt.',
    img: asset('feature-dinos-hero.jpg'),
    pos: 'center 40%',
    to: '/features/dinos',
  },
  {
    title: 'Conquer campaigns',
    text: 'Jungle first. Then ice, fire, water — each realm changes the cost of a mistake.',
    hook: 'The map does not explain itself on page one.',
    img: asset('feature-campaign-hero.jpg'),
    pos: 'center 35%',
    to: '/features/campaign',
  },
]

const DINOS = [
  { name: 'Tyrannosaurus', img: asset('dino-tyranno.png'), role: 'Apex' },
  { name: 'Velociraptor', img: asset('dino-raptor.png'), role: 'Speed' },
  { name: 'Triceratops', img: asset('dino-triceratops.png'), role: 'Tank' },
  { name: 'Dilophosaurus', img: asset('dino-dilo.png'), role: 'Control' },
  { name: 'Stegosaurus', img: asset('dino-stego.png'), role: 'Defense' },
  { name: 'Allosaurus', img: asset('dino-allo.png'), role: 'Hunter' },
  { name: 'Pterodactyl', img: asset('dino-ptera.png'), role: 'Air' },
  { name: 'Fire Dragon', img: asset('dino-dragon.png'), role: 'Special' },
]

export default function HomePage() {
  const motionRef = usePageMotion()

  return (
    <div ref={motionRef} className="relative">
      {/* ═══ HERO: title centered higher ═══ */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <img
          data-hero-bg
          src={asset('hero-poster.png')}
          alt="Dino Dominion landscape with apex T-rex"
          className="absolute inset-0 w-full h-full object-cover will-change-transform hero-video-live"
          style={{ objectPosition: 'center center' }}
          draggable={false}
        />

        {/* Light top scrim for title only — bottom stays open for the T-rex */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(5,4,10,0.72) 0%, rgba(5,4,10,0.35) 28%, transparent 48%),
              linear-gradient(to top, rgba(5,4,10,0.88) 0%, transparent 32%)
            `,
          }}
        />

        {/* Title block — horizontal center, vertically higher (~22% from top) */}
        <div className="absolute z-10 left-0 right-0 top-[18%] sm:top-[16%] md:top-[15%] container-dd flex flex-col items-center text-center">
          <p data-hero data-hero-delay="0.05" className="eyebrow mb-3 sm:mb-4 justify-center">
            Friend beta · Prehistoric strategy
          </p>

          <h1
            data-hero
            data-hero-delay="0.12"
            className="display-xl text-white title-glow drop-shadow-[0_4px_40px_rgba(0,0,0,0.65)]"
          >
            DINO
            <br />
            <span className="text-gradient-magma">DOMINION</span>
          </h1>

          <div
            data-hero
            data-hero-delay="0.35"
            className="flex flex-wrap gap-3 mt-6 sm:mt-7 justify-center"
          >
            <Link
              to="/download"
              className="btn-primary no-underline !text-[0.9rem] !px-8 !py-4"
            >
              Play free
            </Link>
            <Link to="/features/dinos" className="btn-secondary no-underline">
              Meet the pack
            </Link>
            <Link to="/features" className="btn-secondary no-underline">
              Systems
            </Link>
          </div>
        </div>

        <div
          data-hero
          data-hero-delay="0.55"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-ui text-[9px] tracking-[0.35em] uppercase text-white/35">
            Scroll
          </span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      {/* ═══ STORY + APEX BEAST ═══ */}
      <section className="section-band relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,77,26,0.18), transparent 60%), radial-gradient(ellipse 50% 70% at 15% 40%, rgba(79,143,99,0.14), transparent 55%)',
          }}
        />
        <div className="container-dd relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-reveal="left">
            <div className="sec-ornament mb-4 max-w-[220px]">
              <span>The hunt</span>
            </div>
            <p className="eyebrow">Chapter fragment · I</p>
            <h2 className="display-lg text-white mt-4">
              Only the
              <br />
              <span className="text-gradient-magma">apex</span> survive
            </h2>
            <p className="body-lg mt-6 max-w-xl">
              Jungles hide riches. Volcanoes hide death. Rival clans move —
              and the pack that answers first claims the map.
            </p>
            <p className="body-lg mt-4 max-w-xl text-[var(--gold)]/90">
              Advance the story. Open the systems. Download the beta.
              The whole picture is earned — not handed out on the first screen.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link to="/story" className="btn-primary no-underline">
                Next fragment
              </Link>
              <Link to="/features/dinos" className="btn-secondary no-underline">
                Pack intel
              </Link>
            </div>
          </div>

          <div data-reveal="right" className="relative">
            <div className="relative mx-auto max-w-lg">
              <div
                className="absolute -inset-10 rounded-full opacity-70 blur-3xl animate-pulse-glow"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,77,26,0.45), rgba(79,143,99,0.2), transparent 70%)',
                }}
              />
              <div className="media-frame relative aspect-[4/5] overflow-hidden group dino-card-pulse bg-[#0a0810]">
                <div className="absolute inset-0 flex items-center justify-center p-4 pb-20">
                  <img
                    src={asset('dino-tyranno.png')}
                    alt="Tyrannosaurus"
                    className="dino-fit w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 left-4 font-ui text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] px-2 py-1 border border-[var(--gold)]/30 bg-black/40 z-10">
                  Apex · Live
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 bg-gradient-to-t from-[#0a0810] via-[#0a0810]/90 to-transparent pt-16">
                  <p className="font-ui text-[10px] tracking-[0.28em] uppercase text-[var(--gold)]">
                    Apex attacker
                  </p>
                  <p className="font-display text-3xl text-white mt-1 tracking-wide">
                    TYRANNOSAURUS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE PACK ═══ */}
      <div className="dino-marquee-wrap relative py-4 border-y border-[var(--gold)]/10 overflow-hidden" aria-hidden>
        <div className="dino-marquee">
          {[...DINOS, ...DINOS].map((d, i) => (
            <span key={d.name + i} className="dino-marquee-item">
              <img src={d.img} alt="" />
              <span>{d.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <section
        className="section-band relative"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,12,32,0.55) 0%, rgba(8,6,16,0.35) 100%)',
        }}
      >
        <div className="container-dd">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            data-reveal="up"
          >
            <div className="max-w-xl">
              <div className="sec-ornament mb-4 max-w-[220px]">
                <span>Systems</span>
              </div>
              <h2 className="display-lg text-white">
                Built for
                <br />
                <span className="text-gradient-gold">domination</span>
              </h2>
            </div>
            <p className="body-lg max-w-sm md:text-right">
              Four doors. Each opens a deeper layer. Tap a card — the homepage
              only shows the bait.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal-stagger>
            {PILLARS.map((f, i) => {
              const className = `dd-card group no-underline text-inherit ${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`
              const body = (
                <>
                  <div
                    className="relative overflow-hidden bg-[#0a0810]"
                    style={{ aspectRatio: i === 0 ? '16 / 9' : '16 / 11' }}
                  >
                    <img
                      src={f.img}
                      alt={f.title}
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ objectFit: 'cover', objectPosition: f.pos }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(5,4,10,0.9) 0%, transparent 55%)',
                      }}
                    />
                    <span className="absolute top-3 right-3 font-ui text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm bg-black/50 border border-[var(--gold)]/30 text-[var(--gold)]">
                      Open
                    </span>
                  </div>
                  <div className="px-5 py-5">
                    <h3 className="font-display text-xl text-white tracking-wide uppercase">
                      {f.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                      {f.text}
                    </p>
                    <p className="font-body text-xs text-[var(--gold)]/80 mt-2 italic leading-relaxed">
                      {f.hook}
                    </p>
                    <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-[var(--gold)] mt-3">
                      Open this layer →
                    </p>
                  </div>
                </>
              )
              return (
                <Link key={f.title} to={f.to} data-reveal-item className={className}>
                  {body}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DINO RAIL ═══ */}
      <section className="section-band">
        <div className="container-dd">
          <div className="flex items-end justify-between gap-4 mb-6" data-reveal="up">
            <div>
              <div className="sec-ornament mb-3 max-w-[200px]">
                <span>Bestiary</span>
              </div>
              <h2 className="display-md text-white">
                Apex <span className="text-gradient-magma">roster</span>
              </h2>
              <p className="body-lg mt-3 max-w-md">
                Surface names only. Full roles unlock when you advance.
              </p>
            </div>
            <Link
              to="/features/dinos"
              className="font-ui text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] no-underline hover:text-[var(--magma-glow)] shrink-0"
            >
              Unlock intel →
            </Link>
          </div>
          <div className="char-rail" data-reveal-stagger>
            {DINOS.map((d) => (
              <Link
                key={d.name}
                to="/features/dinos"
                className="char-rail-item dd-card group no-underline text-inherit"
                data-reveal-item
              >
                <div className="aspect-[3/4] relative bg-[#0a0810] flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-2 min-h-0">
                    <img
                      src={d.img}
                      alt={d.name}
                      className="dino-fit w-full h-full max-h-[75%] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative z-10 p-3 pt-0">
                    <p className="font-ui text-[9px] tracking-[0.2em] uppercase text-[var(--gold)]">
                      {d.role}
                    </p>
                    <p className="font-display text-sm text-white uppercase tracking-wide mt-0.5">
                      {d.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLAY / REWARDS ═══ */}
      <section className="section-band relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          data-parallax="0.08"
          style={{
            backgroundImage: `url(${asset('banner-bg.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.45) saturate(1.1)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,4,10,0.95) 0%, rgba(5,4,10,0.7) 50%, rgba(5,4,10,0.92) 100%)',
          }}
        />

        <div className="container-dd relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div data-reveal="left">
            <div className="sec-ornament mb-4 max-w-[200px]">
              <span>Rewards</span>
            </div>
            <h2 className="display-lg text-white mt-2">
              Daily login
              <br />
              <span className="text-gradient-gold">& roulette</span>
            </h2>
            <p className="body-lg mt-5 max-w-md">
              Streaks and spins — the first edge you can claim without the full
              campaign. Log in; the inventory feels it when you open the app.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/play" className="btn-primary no-underline">
                Claim the edge
              </Link>
              <Link to="/play?login=1" className="btn-secondary no-underline">
                Log in
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" data-reveal-stagger>
            {[
              { t: 'Daily streak', d: 'Better speed-ups the longer you claim' },
              { t: 'Free spin', d: '1 roulette spin every 24 hours' },
              { t: 'Account ID', d: 'No password — ID from game Settings' },
              { t: 'In-game sync', d: 'Open the app to collect rewards' },
            ].map((x) => (
              <div key={x.t} className="dd-panel p-5" data-reveal-item>
                <p className="font-display text-lg text-[var(--gold)] uppercase tracking-wide">
                  {x.t}
                </p>
                <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                  {x.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRESS ═══ */}
      <section className="section-band">
        <div className="container-dd">
          <div
            className="dd-panel p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden"
            data-reveal="up"
          >
            <div
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(123,92,255,0.4), transparent 70%)',
              }}
            />
            <div className="relative">
              <div className="sec-ornament mb-4 max-w-[200px]">
                <span>Studio</span>
              </div>
              <h2 className="display-md text-white mt-2">
                Progress
                <span className="text-gradient-magma"> log</span>
              </h2>
              <p className="body-lg mt-4">
                Screenshots and roadmap pieces land here first. Advance the log
                to see what is shipping next.
              </p>
              <Link to="/progress" className="btn-primary no-underline mt-8 inline-flex">
                See what is next
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 relative">
              {[
                { t: 'Screenshots', d: 'Real Unity printscreens' },
                { t: 'Shipped', d: 'What friends can use now' },
                { t: 'In progress', d: 'Active development work' },
                { t: 'Roadmap', d: 'Nyra story quests & more' },
              ].map((x) => (
                <div key={x.t} className="stat-chip">
                  <p className="font-display text-lg text-[var(--gold)] uppercase">{x.t}</p>
                  <p className="font-body text-xs text-[var(--bone-dim)] mt-1">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DOWNLOAD CTA ═══ */}
      <section className="section-band pb-28">
        <div className="container-dd">
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-sm border border-[var(--gold)]/25 px-6 py-14 md:px-16 md:py-20"
            style={{
              background:
                'linear-gradient(125deg, rgba(255,77,26,0.16) 0%, rgba(18,12,32,0.92) 35%, rgba(8,6,16,0.96) 100%)',
              boxShadow:
                '0 40px 120px rgba(0,0,0,0.5), 0 0 100px rgba(255,77,26,0.12), 0 0 80px rgba(123,92,255,0.1)',
            }}
          >
            <div
              className="absolute -right-16 -top-16 w-80 h-80 rounded-full opacity-50 blur-3xl pointer-events-none animate-pulse-glow"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,77,26,0.55), rgba(123,92,255,0.25), transparent 70%)',
              }}
            />
            <div className="relative z-10 max-w-2xl">
              <div className="sec-ornament mb-4 max-w-[240px]">
                <span>Enter the wild</span>
              </div>
              <h2 className="display-lg text-white mt-2">
                Download &
                <br />
                <span className="text-gradient-magma">command</span>
              </h2>
              <p className="body-lg mt-5">
                The website is the map sketch. The APK is the territory —
                base, battles, dinos, campaign. Friend beta · ~3.5 GB · Wi‑Fi recommended.
              </p>
              <div className="flex flex-wrap gap-3 mt-10">
                <Link to="/download" className="btn-primary no-underline !text-[0.9rem] !px-8 !py-4">
                  Download APK
                </Link>
                <Link to="/features" className="btn-secondary no-underline">
                  Still exploring?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
