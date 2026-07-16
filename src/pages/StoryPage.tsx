import { Link } from 'react-router'
import { asset } from '@/lib/assets'

export default function StoryPage() {
  return (
    <div className="page-shell px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="eyebrow">The age awakens</p>
          <h1 className="display-lg text-white mt-4">
            A world where
            <br />
            <span className="text-[#e9b44c]">only the adaptable</span>
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

        <div className="media-frame aspect-[4/5] max-h-[70vh]">
          <img
            src={asset('env-loading-scene-3.png')}
            alt="Prehistoric world"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
            <p className="font-ui text-xs tracking-[0.2em] uppercase text-[#e9b44c]">
              Chapter I
            </p>
            <p className="font-display text-3xl text-white mt-2">
              Dawn of the Dominion
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
