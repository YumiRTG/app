import { Link } from 'react-router'
import { asset } from '@/lib/assets'

const DINOS = [
  { name: 'Tyrannosaurus', img: asset('dino-tyranno.png') },
  { name: 'Velociraptor', img: asset('dino-raptor.png') },
  { name: 'Triceratops', img: asset('dino-triceratops.png') },
  { name: 'Dilophosaurus', img: asset('dino-dilo.png') },
  { name: 'Stegosaurus', img: asset('dino-stego.png') },
  { name: 'Allosaurus', img: asset('dino-allo.png') },
  { name: 'Pterodactyl', img: asset('dino-ptera.png') },
  { name: 'Mammoth', img: asset('dino-mammoth.png') },
  { name: 'Smilodon', img: asset('dino-smilodon.png') },
  { name: 'Fire Dragon', img: asset('dino-dragon.png') },
]

const HEROES = [
  { name: 'Nyra Vale', img: asset('hero-nyra.png'), role: 'Commander' },
  { name: 'Alyssa Mey', img: asset('hero-alyssa.png'), role: 'Hero' },
  { name: 'Carina Vale', img: asset('hero-carina.png'), role: 'Hero' },
  { name: 'Elara Veyn', img: asset('hero-elara.png'), role: 'Hero' },
  { name: 'Ronan', img: asset('hero-ronan.png'), role: 'Hero' },
  { name: 'Kailina', img: asset('hero-kailina.png'), role: 'Hero' },
]

export default function BestiaryPage() {
  return (
    <div className="page-shell px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow">Bestiary</p>
          <h1 className="display-lg text-white mt-4">
            Beasts &
            <br />
            <span className="text-[#e9b44c]">legends</span>
          </h1>
          <p className="body-lg mt-5">
            Creatures and commanders from Dino Dominion — the roster that shapes
            every victory.
          </p>
        </div>

        <h2 className="font-display text-2xl text-white tracking-wide mb-6">
          DINOSAURS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {DINOS.map((d) => (
            <article key={d.name} className="media-frame group">
              <div className="aspect-[3/4] relative">
                <img
                  src={d.img}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 z-10 p-4">
                <p className="font-display text-lg text-white uppercase tracking-wide">
                  {d.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="font-display text-2xl text-white tracking-wide mb-6">
          HEROES
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HEROES.map((h) => (
            <article key={h.name} className="media-frame group">
              <div className="aspect-[3/4] relative">
                <img
                  src={h.img}
                  alt={h.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 z-10 p-3">
                <p className="font-ui text-[10px] tracking-widest uppercase text-[#e9b44c]">
                  {h.role}
                </p>
                <p className="font-display text-base text-white uppercase mt-0.5">
                  {h.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <Link to="/download" className="btn-primary no-underline">
            Play free
          </Link>
        </div>
      </div>
    </div>
  )
}
