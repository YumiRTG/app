import { Link } from 'react-router'
import { asset } from '@/lib/assets'

export default function StoryPage() {
  return (
    <div className="page-shell px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="eyebrow">The age awakens</p>
          <h1 className="display-lg text-white mt-4">
            A world where
            <br />
            <span className="text-[#f0c14d]">only the adaptable</span>
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
          <div className="flex flex-wrap gap-3 mt-10">
            <Link to="/features" className="btn-primary no-underline">
              See features
            </Link>
            <Link to="/bestiary" className="btn-secondary no-underline">
              Meet the beasts
            </Link>
          </div>
        </div>

        {/* Full character portrait — object-position keeps head/body in frame */}
        <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 lg:ml-auto">
          <div
            className="media-frame relative w-full"
            style={{ aspectRatio: '3 / 4', minHeight: 420 }}
          >
            <img
              src={asset('hero-nyra.png')}
              alt="Nyra Vale"
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 12%',
              }}
            />
            {/* Soft vignette only at bottom — does not crop the face */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-[1]"
              style={{
                background:
                  'linear-gradient(to top, rgba(12,26,18,0.92) 0%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-[#f0c14d]">
                Chapter I · Nyra Vale
              </p>
              <p className="font-display text-3xl text-white mt-2">
                Dawn of the Dominion
              </p>
            </div>
          </div>

          {/* Decorative glow */}
          <div
            className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(232,93,4,0.25), transparent 65%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
