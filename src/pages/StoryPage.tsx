import { Link } from 'react-router'
import { asset } from '@/lib/assets'

export default function StoryPage() {
  return (
    <div className="page-shell">
      <div className="container-dd grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="eyebrow">The age awakens</p>
          <h1 className="display-lg text-white mt-4">
            A world where
            <br />
            <span className="text-gradient-magma">only the adaptable</span>
            <br />
            survive
          </h1>
          <p className="body-lg mt-6">
            In Dino Dominion you raise a fractured tribe under Nyra Vale.
            Jungles hide riches. Volcanoes hide death. Every sunrise is a
            choice — expand, ally, or hunt.
          </p>
          <p className="body-lg mt-4">
            Tame prehistoric beasts. Train infantry, riders and shooters.
            Conquer the campaign map before rival clans claim the last wild
            frontiers.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-10">
            {[
              { k: 'Tribe', v: 'Rise from ash' },
              { k: 'Beasts', v: 'Tame the wild' },
              { k: 'Map', v: 'Claim realms' },
            ].map((s) => (
              <div key={s.k} className="stat-chip">
                <p className="font-display text-lg text-[var(--gold)]">{s.k}</p>
                <p className="font-ui text-[10px] uppercase tracking-wider text-[var(--bone-dim)] mt-1">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link to="/features" className="btn-primary no-underline">
              See features
            </Link>
            <Link to="/bestiary" className="btn-secondary no-underline">
              Meet the beasts
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 lg:ml-auto">
          <div
            className="media-frame relative w-full overflow-hidden group"
            style={{ aspectRatio: '3 / 4', minHeight: 420 }}
          >
            <img
              src={asset('hero-nyra.png')}
              alt="Nyra Vale"
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 12%',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-[1]"
              style={{
                background:
                  'linear-gradient(to top, rgba(7,6,10,0.95) 0%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
              <p className="font-ui text-xs tracking-[0.22em] uppercase text-[var(--gold)]">
                Chapter I · Nyra Vale
              </p>
              <p className="font-display text-3xl text-white mt-2">
                Dawn of the Dominion
              </p>
            </div>
          </div>

          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(255,77,26,0.3), transparent 65%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
