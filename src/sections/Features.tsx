import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asset } from '@/lib/assets'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    icon: asset('pill-build.png'),
    image: asset('env-base.png'),
    title: 'BUILD YOUR BASE',
    text: 'Raise town halls, camps, hospitals, and production buildings. Grow from a fragile outpost into a fortified dominion.',
  },
  {
    icon: asset('feat-hero.png'),
    image: asset('ui-hero-screen.png'),
    title: 'RECRUIT HEROES',
    text: 'Command Nyra Vale and legendary allies. Unlock skills, exclusive art, and battle power that turns the tide of war.',
  },
  {
    icon: asset('icon-raptor.png'),
    image: asset('dino-tyranno.png'),
    title: 'TAME DINOSAURS',
    text: 'Collect Tyrannosaurus, Dilophosaurus, Velociraptor, and more. Every beast brings unique skills to your army.',
  },
  {
    icon: asset('pill-combat.png'),
    image: asset('campaign-6.png'),
    title: 'CONQUER CAMPAIGNS',
    text: 'Push through story stages across jungle, ice, volcano, and water realms. Win battles. Claim rewards. Advance the map.',
  },
  {
    icon: asset('pill-tech.png'),
    image: asset('feat-techtree.png'),
    title: 'RESEARCH & POWER',
    text: 'Climb the tech tree, boost troops, and stack battle power. Idle production keeps your empire growing offline.',
  },
  {
    icon: asset('pill-alliance.png'),
    image: asset('feat-alliance.png'),
    title: 'FORGE ALLIANCES',
    text: 'Join forces, trade gifts, defend together, and dominate the prehistoric world as a united tribe.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    gsap.fromTo(
      grid.querySelectorAll('.feature-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === grid) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-light py-[100px] md:py-[160px] px-6 md:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-14 md:mb-20">
          <span className="label-text text-sage">CORE SYSTEMS</span>
          <h2
            className="font-display text-teal uppercase mt-4"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            EVERYTHING YOU NEED TO RULE
          </h2>
          <p
            className="font-body text-teal/70 mt-5"
            style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.6 }}
          >
            Dino Dominion is a prehistoric strategy survival game: build, recruit, train, and conquer —
            with dinosaurs at the heart of every battle.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="feature-card group relative overflow-hidden rounded-[6px] bg-teal opacity-0"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={pillar.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 30%, rgba(8, 76, 97, 0.95) 100%)',
                  }}
                />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-cream/95 flex items-center justify-center overflow-hidden p-1.5">
                  <img src={pillar.icon} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-cream text-xl md:text-2xl tracking-wide">
                  {pillar.title}
                </h3>
                <p
                  className="font-body text-cream/70 mt-3"
                  style={{ fontSize: '15px', lineHeight: 1.6 }}
                >
                  {pillar.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Resources strip */}
        <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { src: asset('res-food.png'), label: 'Food' },
            { src: asset('res-wood.png'), label: 'Wood' },
            { src: asset('res-iron.png'), label: 'Iron' },
            { src: asset('res-oil.png'), label: 'Oil' },
            { src: asset('res-amber.png'), label: 'Amber' },
          ].map((res) => (
            <div key={res.label} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-teal/10 border border-teal/15">
                <img src={res.src} alt={res.label} className="w-full h-full object-cover" />
              </div>
              <span className="font-ui text-teal/80 text-sm uppercase tracking-wider">
                {res.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
