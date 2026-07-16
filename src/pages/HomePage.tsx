import Hero from '@/sections/Hero'
import Manifesto from '@/sections/Manifesto'
import { Link } from 'react-router'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <section className="section-dark py-16 md:py-24 px-6 md:px-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/features', label: 'Features', desc: 'Build, train, conquer' },
            { to: '/heroes', label: 'Heroes', desc: 'Nyra and allies' },
            { to: '/dinos', label: 'Dinos', desc: 'Your prehistoric army' },
            { to: '/world', label: 'World', desc: 'Campaign & gallery' },
            { to: '/daily', label: 'Daily', desc: 'Login rewards' },
            { to: '/roulette', label: 'Roulette', desc: 'Spin for speed ups' },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-xl border border-cream/15 bg-cream/[0.04] p-6 no-underline hover:border-terracotta/50 transition-colors"
            >
              <p className="font-display text-cream text-xl tracking-wide uppercase">{card.label}</p>
              <p className="font-body text-cream/55 text-sm mt-2">{card.desc}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/download" className="btn-primary inline-flex no-underline">
            Get APK
          </Link>
        </div>
      </section>
    </>
  )
}
