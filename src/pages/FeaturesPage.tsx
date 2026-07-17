import { Link } from 'react-router'
import { asset } from '@/lib/assets'
import { usePageMotion } from '@/hooks/useMotion'

const features = [
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
    img: asset('feature-campaign-hero.jpg'),
    pos: 'center 35%',
    to: '/features/campaign',
  },
  {
    title: 'Train your army',
    text: 'Infantry, riders and shooters upgrade through tiers for total battlefield control.',
    img: asset('troop-infantry.png'),
    pos: 'center 15%',
  },
  {
    title: 'Forge alliances',
    text: 'Team up, trade gifts and defend territory against rival tribes.',
    img: asset('campaign-2.png'),
    pos: 'center 35%',
  },
]

export default function FeaturesPage() {
  const motionRef = usePageMotion()

  return (
    <div ref={motionRef} className="page-shell">
      <div className="container-dd">
        <div className="max-w-2xl mb-12 md:mb-16" data-reveal="up">
          <p className="eyebrow">Systems</p>
          <h1 className="display-lg text-white mt-4">
            Built for
            <br />
            <span className="text-gradient-magma">domination</span>
          </h1>
          <p className="body-lg mt-5">
            Everything you need to rise from outpost to apex power — designed
            around dinosaurs, heroes and strategic growth. Tap a card for more detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" data-reveal-stagger>
          {features.map((f) => {
            const inner = (
              <>
                <div
                  className="relative w-full overflow-hidden bg-[#0a0810]"
                  style={{ aspectRatio: '16 / 11' }}
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{
                      objectFit: 'cover',
                      objectPosition: f.pos,
                    }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7,6,10,0.7), transparent 50%)',
                    }}
                  />
                  {f.to && (
                    <span className="absolute top-3 right-3 font-ui text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-black/45 border border-[var(--gold)]/30 text-[var(--gold)]">
                      More info
                    </span>
                  )}
                </div>

                <div className="px-5 py-5 border-t border-[var(--gold)]/10">
                  <h2 className="font-display text-xl md:text-2xl text-white tracking-wide uppercase">
                    {f.title}
                  </h2>
                  <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                    {f.text}
                  </p>
                  {f.to && (
                    <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-[var(--gold)] mt-3 group-hover:text-[var(--magma-glow)] transition-colors">
                      Learn more →
                    </p>
                  )}
                </div>
              </>
            )

            if (f.to) {
              return (
                <Link
                  key={f.title}
                  to={f.to}
                  className="dd-card group no-underline text-inherit"
                  data-reveal-item
                >
                  {inner}
                </Link>
              )
            }

            return (
              <article key={f.title} className="dd-card group" data-reveal-item>
                {inner}
              </article>
            )
          })}
        </div>

        <div className="mt-14 flex flex-wrap gap-3" data-reveal="up">
          <Link to="/play" className="btn-primary no-underline">
            Claim rewards
          </Link>
          <Link to="/download" className="btn-secondary no-underline">
            Download the game
          </Link>
        </div>
      </div>
    </div>
  )
}
