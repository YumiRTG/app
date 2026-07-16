import { Link } from 'react-router'
import { asset } from '@/lib/assets'

const features = [
  {
    title: 'Build your base',
    text: 'Town halls, camps, hospitals and production chains that grow your empire while offline.',
    img: asset('env-base.png'),
  },
  {
    title: 'Command heroes',
    text: 'Nyra Vale and elite allies with unique skill kits that rewrite every battle.',
    img: asset('hero-nyra.png'),
  },
  {
    title: 'Tame dinosaurs',
    text: 'Tyrannosaurus, Dilophosaurus, Raptors and more — each with distinct combat roles.',
    img: asset('dino-tyranno.png'),
  },
  {
    title: 'Conquer campaigns',
    text: 'Push through jungle, ice, volcano and water stages for legendary loot.',
    img: asset('campaign-6.png'),
  },
  {
    title: 'Train your army',
    text: 'Infantry, riders and shooters upgrade through tiers for total battlefield control.',
    img: asset('troop-infantry.png'),
  },
  {
    title: 'Forge alliances',
    text: 'Team up, trade gifts and defend territory against rival tribes.',
    img: asset('campaign-2.png'),
  },
]

export default function FeaturesPage() {
  return (
    <div className="page-shell px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow">Systems</p>
          <h1 className="display-lg text-white mt-4">
            Built for
            <br />
            <span className="text-[#e9b44c]">domination</span>
          </h1>
          <p className="body-lg mt-5">
            Everything you need to rise from outpost to apex power — designed
            around dinosaurs, heroes and strategic growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <article key={f.title} className="media-frame group">
              <div className="aspect-[4/3] relative">
                <img
                  src={f.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-10 -mt-16 px-5 pb-6">
                <h2 className="font-display text-2xl text-white tracking-wide uppercase">
                  {f.title}
                </h2>
                <p className="font-body text-sm text-[#c4b89a]/85 mt-2 leading-relaxed">
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
