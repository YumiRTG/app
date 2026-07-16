import { Link } from 'react-router'
import { asset } from '@/lib/assets'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={asset('hero-poster.png')}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={asset('hero-intro.mp4')} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(12,26,18,0.88) 0%, rgba(20,53,36,0.45) 50%, rgba(12,26,18,0.25) 100%), linear-gradient(to top, rgba(12,26,18,0.92) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,93,4,0.2), transparent 55%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-28">
        <p className="eyebrow mb-5 animate-[float-soft_6s_ease-in-out_infinite]">
          Prehistoric strategy survival
        </p>
        <h1 className="display-xl text-white max-w-4xl">
          DINO
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #e9b44c, #e85d04)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DOMINION
          </span>
        </h1>
        <p className="body-lg mt-6 max-w-xl">
          Build your base. Recruit legends. Command apex predators.
          A living age of dinosaurs awaits your tribe.
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
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

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {[
            { k: '50+', v: 'Creatures' },
            { k: 'Heroes', v: 'Nyra & allies' },
            { k: 'Campaign', v: 'Live realms' },
            { k: 'Free', v: 'Beta access' },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-xl px-4 py-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(233,180,76,0.12)',
              }}
            >
              <p className="font-display text-2xl text-[#e9b44c]">{s.k}</p>
              <p className="font-body text-xs text-[#c4b89a]/80 mt-1 uppercase tracking-wider">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
