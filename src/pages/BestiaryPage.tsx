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
    <div className="page-shell">
      <div className="container-dd">
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="eyebrow">Bestiary</p>
          <h1 className="display-lg text-white mt-4">
            Beasts &
            <br />
            <span className="text-gradient-magma">legends</span>
          </h1>
          <p className="body-lg mt-5">
            Creatures and commanders from Dino Dominion — the roster that shapes
            every victory.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-display text-2xl text-white tracking-wide">DINOSAURS</h2>
          <div className="hud-line flex-1 opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-16">
          {DINOS.map((d) => (
            <article key={d.name} className="dd-card group">
              <div className="aspect-[3/4] relative bg-[#0a0810]">
                <img
                  src={d.img}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(7,6,10,0.95), transparent)',
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 z-10 p-4">
                  <p className="font-display text-base md:text-lg text-white uppercase tracking-wide">
                    {d.name}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-display text-2xl text-white tracking-wide">HEROES</h2>
          <div className="hud-line flex-1 opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {HEROES.map((h) => (
            <article key={h.name} className="dd-card group">
              <div className="aspect-[3/4] relative bg-[#0a0810]">
                <img
                  src={h.img}
                  alt={h.name}
                  className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: 'cover', objectPosition: 'center 12%' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(7,6,10,0.95), transparent)',
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 z-10 p-3">
                  <p className="font-ui text-[10px] tracking-widest uppercase text-[var(--gold)]">
                    {h.role}
                  </p>
                  <p className="font-display text-base text-white uppercase mt-0.5">
                    {h.name}
                  </p>
                </div>
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
