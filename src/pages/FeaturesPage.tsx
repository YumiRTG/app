import { Link } from 'react-router'
import { asset } from '@/lib/assets'

const features = [
  {
    title: 'Build your base',
    text: 'Town halls, camps, hospitals and production chains that grow your empire while offline.',
    img: asset('env-base.png'),
    pos: 'center 40%',
  },
  {
    title: 'Command heroes',
    text: 'Nyra Vale and elite allies with unique skill kits that rewrite every battle.',
    img: asset('hero-nyra.png'),
    pos: 'center 12%',
  },
  {
    title: 'Tame dinosaurs',
    text: 'Tyrannosaurus, Dilophosaurus, Raptors and more — each with distinct combat roles.',
    img: asset('dino-tyranno.png'),
    pos: 'center 18%',
  },
  {
    title: 'Conquer campaigns',
    text: 'Push through jungle, ice, volcano and water stages for legendary loot.',
    img: asset('campaign-6.png'),
    pos: 'center 30%',
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
  return (
    <div className="page-shell">
      <div className="container-dd">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow">Systems</p>
          <h1 className="display-lg text-white mt-4">
            Built for
            <br />
            <span className="text-gradient-magma">domination</span>
          </h1>
          <p className="body-lg mt-5">
            Everything you need to rise from outpost to apex power — designed
            around dinosaurs, heroes and strategic growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f) => (
            <article key={f.title} className="dd-card group">
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
              </div>

              <div className="px-5 py-5 border-t border-[var(--gold)]/10">
                <h2 className="font-display text-xl md:text-2xl text-white tracking-wide uppercase">
                  {f.title}
                </h2>
                <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                  {f.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
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
