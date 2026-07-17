import { Link } from 'react-router'
import { asset } from '@/lib/assets'
import { usePageMotion } from '@/hooks/useMotion'

const PILLARS = [
  {
    title: 'Build your base',
    text: 'Town halls, camps, hospitals and production chains that grow your empire while offline.',
    img: asset('feature-base-hero.jpg'),
    pos: 'center 35%',
    to: '/features/base',
  },
  {
    title: 'Command heroes',
    text: 'Nyra Vale and elite allies with unique skill kits that rewrite every battle.',
    img: asset('feature-heroes-hero.jpg'),
    pos: 'center 18%',
    to: '/features/heroes',
  },
  {
    title: 'Tame dinosaurs',
    text: 'Tyrannosaurus, Dilophosaurus, Raptors and more — each with distinct combat roles.',
    img: asset('feature-dinos-hero.jpg'),
    pos: 'center 40%',
    to: '/features/dinos',
  },
  {
    title: 'Conquer campaigns',
    text: 'Push through jungle, ice, volcano and water stages for legendary loot.',
    img: asset('campaign-6.png'),
    pos: 'center 30%',
  },
]

const DINOS = [
  { name: 'Tyrannosaurus', img: asset('dino-tyranno.png') },
  { name: 'Velociraptor', img: asset('dino-raptor.png') },
  { name: 'Triceratops', img: asset('dino-triceratops.png') },
  { name: 'Dilophosaurus', img: asset('dino-dilo.png') },
  { name: 'Stegosaurus', img: asset('dino-stego.png') },
  { name: 'Fire Dragon', img: asset('dino-dragon.png') },
]

export default function HomePage() {
  const motionRef = usePageMotion()

  return (
    <div ref={motionRef} className="relative">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end">
        <video
          data-hero-video
          autoPlay
          muted
          loop
          playsInline
          poster={asset('hero-poster.png')}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        >
          <source src={asset('hero-intro.mp4')} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg, rgba(7,6,10,0.92) 0%, rgba(7,6,10,0.55) 42%, rgba(7,6,10,0.25) 70%),
              linear-gradient(to top, rgba(7,6,10,0.95) 0%, rgba(7,6,10,0.4) 42%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 75% 30%, rgba(255,77,26,0.22), transparent 60%)
            `,
          }}
        />

        <div
          data-hero
          data-hero-delay="0"
          className="absolute top-24 left-0 right-0 z-10 container-dd flex items-center justify-between opacity-70"
        >
          <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]">
            Friend beta · Android
          </p>
          <p className="hidden sm:block font-ui text-[10px] tracking-[0.28em] uppercase text-[var(--bone)]/50">
            Tame · Hunt · Conquer
          </p>
        </div>

        <div className="relative z-10 container-dd pb-16 md:pb-24 pt-32">
          <p data-hero data-hero-delay="0.05" className="eyebrow mb-6">
            Prehistoric strategy survival
          </p>

          <h1
            data-hero
            data-hero-delay="0.12"
            className="display-xl text-white max-w-5xl"
          >
            DINO
            <br />
            <span className="text-gradient-magma">DOMINION</span>
          </h1>

          <p data-hero data-hero-delay="0.28" className="body-lg mt-7 max-w-xl">
            Build your base. Recruit legends. Command apex predators.
            A living age of dinosaurs awaits your tribe.
          </p>

          <div
            data-hero
            data-hero-delay="0.4"
            className="flex flex-wrap gap-3 mt-10"
          >
            <Link to="/download" className="btn-primary no-underline">
              Download APK
            </Link>
            <Link to="/play" className="btn-secondary no-underline">
              Daily rewards
            </Link>
            <Link to="/story" className="btn-secondary no-underline">
              Enter the story
            </Link>
          </div>

          <div
            data-hero
            data-hero-delay="0.52"
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
          >
            {[
              { k: '50+', v: 'Creatures' },
              { k: 'Heroes', v: 'Nyra & allies' },
              { k: 'Campaign', v: 'Live realms' },
              { k: 'Free', v: 'Beta access' },
            ].map((s) => (
              <div key={s.k} className="stat-chip">
                <p className="font-display text-2xl md:text-3xl text-gradient-gold">{s.k}</p>
                <p className="font-ui text-[10px] text-[var(--bone-dim)] mt-1.5 uppercase tracking-[0.18em]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-24 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, var(--void), transparent)',
          }}
        />

        {/* Scroll cue */}
        <div
          data-hero
          data-hero-delay="0.7"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-ui text-[9px] tracking-[0.3em] uppercase text-[var(--bone)]/40">
            Scroll
          </span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      {/* ═══ STORY STRIP ═══ */}
      <section className="section-band relative">
        <div className="container-dd grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1" data-reveal="left">
            <div className="media-frame relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden group">
              <img
                data-parallax="0.12"
                src={asset('hero-nyra.png')}
                alt="Nyra Vale"
                className="absolute inset-0 w-full h-[115%] object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                style={{ objectPosition: 'center 12%' }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(7,6,10,0.95), transparent)',
                }}
              />
              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <p className="font-ui text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]">
                  Chapter I · Commander
                </p>
                <p className="font-display text-3xl text-white mt-1">Nyra Vale</p>
              </div>
              <div
                className="absolute -inset-8 -z-10 opacity-50 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(255,77,26,0.35), transparent 65%)',
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2" data-reveal="right">
            <p className="eyebrow">The age awakens</p>
            <h2 className="display-lg text-white mt-4">
              Only the
              <br />
              <span className="text-gradient-magma">adaptable</span> survive
            </h2>
            <p className="body-lg mt-6 max-w-xl">
              Raise a fractured tribe under Nyra Vale. Jungles hide riches.
              Volcanoes hide death. Every sunrise is a choice — expand, ally, or hunt.
            </p>
            <p className="body-lg mt-4 max-w-xl">
              Tame prehistoric beasts. Train infantry, riders and shooters.
              Conquer the campaign map before rival clans claim the last wild frontiers.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link to="/story" className="btn-primary no-underline">
                Full story
              </Link>
              <Link to="/bestiary" className="btn-secondary no-underline">
                Meet the beasts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES BENTO ═══ */}
      <section
        className="section-band section-band-cut relative"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,12,16,0.65) 0%, rgba(12,10,18,0.4) 100%)',
        }}
      >
        <div className="container-dd">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            data-reveal="up"
          >
            <div className="max-w-xl">
              <p className="eyebrow">Systems</p>
              <h2 className="display-lg text-white mt-4">
                Built for
                <br />
                <span className="text-gradient-gold">domination</span>
              </h2>
            </div>
            <p className="body-lg max-w-sm md:text-right">
              Dinosaurs, heroes and strategic growth — designed for the long hunt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal-stagger>
            {PILLARS.map((f, i) => {
              const className = `dd-card group no-underline text-inherit ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}`
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
                          'linear-gradient(to top, rgba(7,6,10,0.85) 0%, transparent 55%)',
                      }}
                    />
                    {'to' in f && f.to && (
                      <span className="absolute top-3 right-3 font-ui text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/45 border border-[var(--gold)]/30 text-[var(--gold)]">
                        More info
                      </span>
                    )}
                  </div>
                  <div className="px-5 py-5">
                    <h3 className="font-display text-xl text-white tracking-wide uppercase">
                      {f.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                      {f.text}
                    </p>
                    {'to' in f && f.to && (
                      <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-[var(--gold)] mt-3">
                        Learn more →
                      </p>
                    )}
                  </div>
                </>
              )
              if ('to' in f && f.to) {
                return (
                  <Link key={f.title} to={f.to} data-reveal-item className={className}>
                    {body}
                  </Link>
                )
              }
              return (
                <article key={f.title} data-reveal-item className={className}>
                  {body}
                </article>
              )
            })}
          </div>

          <div className="mt-10" data-reveal="up">
            <Link to="/features" className="btn-secondary no-underline">
              All features
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BESTIARY STRIP ═══ */}
      <section className="section-band">
        <div className="container-dd">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
            data-reveal="up"
          >
            <div>
              <p className="eyebrow">Bestiary</p>
              <h2 className="display-lg text-white mt-4">
                Apex
                <span className="text-gradient-magma"> roster</span>
              </h2>
            </div>
            <Link
              to="/features/dinos"
              className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--gold)] no-underline hover:text-[var(--magma-glow)]"
            >
              View dino details →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" data-reveal-stagger>
            {DINOS.map((d) => (
              <article key={d.name} className="dd-card group" data-reveal-item>
                <div className="aspect-[3/4] relative bg-[#0a0810]">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                    style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7,6,10,0.95) 0%, transparent 70%)',
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 z-10">
                    <p className="font-display text-sm sm:text-base text-white uppercase tracking-wide">
                      {d.name}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLAY / REWARDS ═══ */}
      <section className="section-band relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          data-parallax="0.08"
          style={{
            backgroundImage: `url(${asset('banner-bg.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,6,10,0.95) 0%, rgba(7,6,10,0.7) 50%, rgba(7,6,10,0.9) 100%)',
          }}
        />

        <div className="container-dd relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div data-reveal="left">
            <p className="eyebrow">Web rewards</p>
            <h2 className="display-lg text-white mt-4">
              Daily login
              <br />
              <span className="text-gradient-gold">& roulette</span>
            </h2>
            <p className="body-lg mt-5 max-w-md">
              Log in with your Account ID. Claim free speed-ups every day and spin
              the roulette — rewards sync into your game inventory.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/play" className="btn-primary no-underline">
                Open play hub
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

      {/* ═══ DOWNLOAD CTA ═══ */}
      <section className="section-band pb-24">
        <div className="container-dd">
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-xl border border-[var(--gold)]/20 px-6 py-12 md:px-14 md:py-16"
            style={{
              background:
                'linear-gradient(125deg, rgba(255,77,26,0.12) 0%, rgba(20,12,16,0.9) 40%, rgba(12,10,18,0.95) 100%)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 80px rgba(255,77,26,0.08)',
            }}
          >
            <div
              className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none animate-pulse-glow"
              style={{ background: 'radial-gradient(circle, rgba(255,77,26,0.5), transparent 70%)' }}
            />
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow">Android beta</p>
              <h2 className="display-lg text-white mt-4">
                Download &
                <br />
                <span className="text-gradient-magma">command</span>
              </h2>
              <p className="body-lg mt-5">
                Private friend beta via APK (~3.5 GB). Wi‑Fi recommended.
                Free to play — build, tame, conquer.
              </p>
              <div className="flex flex-wrap gap-3 mt-9">
                <Link to="/download" className="btn-primary no-underline">
                  Download APK
                </Link>
                <Link to="/features" className="btn-secondary no-underline">
                  Explore systems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
