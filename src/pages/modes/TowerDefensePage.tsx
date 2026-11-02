import { GAME_GUIDE } from '@/config/gameGuide'
import { usePageMotion } from '@/hooks/useMotion'
import { MODE_BY_KEY, TD_ENEMIES, TD_LOOP, TD_TOWERS, TD_OTHER_TOWERS } from '@/config/modes'
import {
  FactGrid,
  LoopSteps,
  ModeFooterCta,
  ModeHero,
  ModeSwitcher,
  SectionHead,
  SpecRail,
} from '@/components/ModeKit'
import TdSimulation from '@/components/TdSimulation'

const mode = MODE_BY_KEY['tower-defense']

const DIFFICULTY = [
  { title: 'Easy', text: 'Base enemy health is 45% of Normal, with 32 starting lives and 40% more starting gold. Mark rewards use a 60% multiplier. Later waves have their own health curve.' },
  { title: 'Normal', text: 'The reference setting: 20 starting lives and 260 gold on the first fixed map, before progression bonuses. Later maps add starting gold.' },
  { title: 'Hard', text: 'Base enemy health is 3× Normal and speed is 16% higher. Start with 11 lives and 70% of the normal gold; marks use a 185% multiplier. Enemy count and wave pacing also change.' },
]

const PROGRESSION = [
  {
    title: 'The weekly map',
    text: 'One map built from the ISO week, the same for everyone that week. It resets on Monday at 00:00 UTC. The weekly goal can be claimed once per week. Difficulty is fixed on it, because a chosen difficulty would make the scores worthless. It is the only run in the mode that costs a ticket, and it feeds a shared leaderboard.',
  },
  {
    title: 'Tickets',
    text: 'Five runs a day for free and up to fifteen more for amber. The thirteen fixed maps cost nothing at all, so the limit only ever applies to the ranked map.',
  },
  {
    title: 'Defense marks',
    text: 'You earn them for new star milestones, repeat map clears and weekly wave progress. There is a daily cap so nobody grinds their way up the board. They pay for the defense shop and tower mastery.',
  },
  {
    title: 'Tower mastery',
    text: 'Upgrade each tower type across ten mastery ranks. Rank 2 unlocks its level-6 capstone, rank 5 starts that tower at level 2 and rank 8 reduces its build cost. Choose one of two branches at tower level 3; at most two level-6 towers can stand at once.',
  },
  {
    title: 'Stars',
    text: 'Three stars if you finish without losing a life, two if you keep 60% of them, one for simply surviving. They are tracked per difficulty, so a fully starred map still has two more versions waiting.',
  },
  {
    title: 'Heroes on the field',
    text: 'On top of the slot bonuses you can put Nyra on the map as a real unit, a mobile archer you move around mid-wave. Her damage comes from her actual hero stats, scaled down a long way so the towers still matter.',
  },
]

export default function TowerDefensePage() {
  const motionRef = usePageMotion()

  return (
    <div
      ref={motionRef}
      className="mode-page mode-detail"
      style={{
        ['--mode-accent' as string]: mode.accent,
        ['--mode-accent-soft' as string]: mode.accentSoft,
      }}
    >
      <ModeSwitcher active={mode.key} />

      <ModeHero mode={mode}>
        <SpecRail specs={mode.specs} />
      </ModeHero>

      <div className="container-dd pb-24">
        <section className="mt-14 md:mt-20">
          <SectionHead
            ornament="How a run plays"
            title="Five decisions,"
            accentWord="repeated"
            text="Nothing here is hidden from you. The path is drawn before wave one, ranges show while you place, and the camera holds the whole field. The one thing you never have is enough gold to cover everything."
          />
          <LoopSteps steps={TD_LOOP} />
        </section>

        <section className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-8 items-center">
          <div data-reveal="left">
            <TdSimulation />
          </div>
          <div data-reveal="right">
            <div className="sec-ornament mb-4 max-w-[220px]">
              <span>The field</span>
            </div>
            <h2 className="display-md text-white">
              One path.
              <br />
              <span className="text-mode-accent">Plan every build.</span>
            </h2>
            <p className="body-lg mt-5">
              Every stage draws its own route and scatters build slots around it. A slot on
              a corner covers two stretches of path. A slot on a straight covers one for
              longer. Working out which one you need is most of the mode.
            </p>
            <p className="body-lg mt-4">
              Waves arrive every twelve seconds unless you call the next one in early, and
              you can run at 1×, 2× or 3× speed. Calling early is free gold, right up until
              the moment it isn’t.
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-20">
          <SectionHead
            ornament="Your arsenal"
            title={`${GAME_GUIDE.defense.towerTypes} tower types,`}
            accentWord={`up to level ${GAME_GUIDE.defense.maxTowerLevel}`}
            text="Choose damage, detection, control, support or economy. The illustrated examples below are part of the full 13-type arsenal; branch choices change how each tower handles special enemies."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal-stagger>
            {TD_TOWERS.map((t) => (
              <article key={t.name} className="unit-card" data-reveal-item>
                <div className="unit-card__media">
                  <span className="unit-card__role">{t.role}</span>
                  <img src={t.img} alt={t.name} loading="lazy" />
                </div>
                <div className="p-5 border-t border-white/8">
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">{t.name}</h3>
                  <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-mode-accent mt-1">
                    {t.stat}
                  </p>
                  <p className="font-body text-sm text-[var(--bone-dim)] mt-3 leading-relaxed">{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHead ornament="More tower types" title="Complete your" accentWord="loadout" />
          <FactGrid items={TD_OTHER_TOWERS} />
        </section>

        <section className="mt-16 md:mt-20">
          <SectionHead
            ornament="What comes down the path"
            title="Read enemy traits,"
            accentWord="then choose the counter"
            text="The wave preview shows what a map will send at you. Flying, armored, stealth and regenerating threats need different tools; boss phases and map events can force you to adapt."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-reveal-stagger>
            {TD_ENEMIES.map((e) => (
              <div key={e.name} className="fact-card" data-reveal-item>
                <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-mode-accent">{e.role}</p>
                <p className="font-display text-lg text-white uppercase tracking-wide mt-1">{e.name}</p>
                <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-20">
          <SectionHead
            ornament="Difficulty"
            title="Three grades,"
            accentWord="three payouts"
            text="Difficulty moves three things at once: the enemies, what you start with, and what you get paid. Changing only the lives would not make it harder, just more annoying."
          />
          <FactGrid items={DIFFICULTY} />
        </section>

        <section className="mt-16 md:mt-20">
          <SectionHead
            ornament="Progression"
            title="What carries"
            accentWord="between runs"
          />
          <FactGrid items={PROGRESSION} />
        </section>

        <ModeFooterCta mode={mode} line="Hold the line" />
      </div>
    </div>
  )
}
