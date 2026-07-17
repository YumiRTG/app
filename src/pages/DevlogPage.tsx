import { Link } from 'react-router'
import {
  DEV_SCREENSHOTS,
  FUTURE_UPDATES,
  PROGRESS_LOG,
} from '@/config/devlog'
import { usePageMotion } from '@/hooks/useMotion'

const TAG_STYLE: Record<string, { label: string; color: string; border: string }> = {
  shipped: {
    label: 'Shipped',
    color: '#3dffb5',
    border: 'rgba(61,255,181,0.35)',
  },
  wip: {
    label: 'In progress',
    color: '#f5c15d',
    border: 'rgba(245,193,93,0.35)',
  },
  milestone: {
    label: 'Milestone',
    color: '#ff7a3d',
    border: 'rgba(255,122,61,0.35)',
  },
}

const STATUS_STYLE: Record<string, { label: string; color: string }> = {
  planned: { label: 'Planned', color: '#b8aea0' },
  'in-progress': { label: 'In progress', color: '#f5c15d' },
  soon: { label: 'Soon', color: '#3dffb5' },
}

export default function DevlogPage() {
  const motionRef = usePageMotion()

  return (
    <div ref={motionRef} className="page-shell">
      <div className="container-dd">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-14" data-reveal="up">
          <p className="eyebrow">Studio · drops over time</p>
          <h1 className="display-lg text-white mt-4">
            Progress
            <br />
            <span className="text-gradient-magma">log</span>
          </h1>
          <p className="body-lg mt-5">
            You do not get the whole roadmap in one glance. Screenshots, shipped
            work and future drops are layered here — check back as the beta moves.
            The full game is still earned in the APK.
          </p>
        </div>

        {/* How this page works */}
        <div
          className="dd-panel p-5 md:p-6 mb-14 grid sm:grid-cols-3 gap-4"
          data-reveal="up"
        >
          {[
            {
              t: '1 · Screenshots',
              d: 'Printscreens from the Unity client so you see the real game, not only art.',
            },
            {
              t: '2 · Progression log',
              d: 'Dated notes of what landed — website, APK, systems, milestones.',
            },
            {
              t: '3 · Future updates',
              d: 'Honest roadmap: planned, in progress, or coming soon.',
            },
          ].map((x) => (
            <div key={x.t}>
              <p className="font-display text-lg text-[var(--gold)] uppercase tracking-wide">
                {x.t}
              </p>
              <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                {x.d}
              </p>
            </div>
          ))}
        </div>

        {/* Screenshots */}
        <div className="flex items-center gap-4 mb-6" data-reveal="up">
          <h2 className="font-display text-2xl text-white tracking-wide">
            DEV SCREENSHOTS
          </h2>
          <div className="hud-line flex-1 opacity-50" />
        </div>
        <p className="body-lg max-w-xl mb-6" data-reveal="up">
          Current captures from development. Newer printscreens replace these as builds move.
        </p>

        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-16"
          data-reveal-stagger
        >
          {DEV_SCREENSHOTS.map((shot) => (
            <figure key={shot.caption + shot.src} className="dd-card group" data-reveal-item>
              <div className="relative aspect-[16/11] overflow-hidden bg-[#0a0810]">
                <img
                  src={shot.src}
                  alt={shot.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: 'center top' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(7,6,10,0.85), transparent 50%)',
                  }}
                />
              </div>
              <figcaption className="px-4 py-3 border-t border-[var(--gold)]/10">
                <p className="font-display text-sm text-white uppercase tracking-wide">
                  {shot.caption}
                </p>
                {shot.date && (
                  <p className="font-ui text-[10px] tracking-[0.16em] uppercase text-[var(--bone-dim)] mt-1">
                    {shot.date}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Progression log */}
        <div className="flex items-center gap-4 mb-6" data-reveal="up">
          <h2 className="font-display text-2xl text-white tracking-wide">
            PROGRESSION LOG
          </h2>
          <div className="hud-line flex-1 opacity-50" />
        </div>

        <div className="relative mb-16 pl-0 md:pl-2">
          <div
            className="hidden md:block absolute left-[11px] top-2 bottom-2 w-px"
            style={{
              background:
                'linear-gradient(180deg, var(--magma), rgba(245,193,93,0.2))',
            }}
            aria-hidden
          />
          <div className="space-y-4">
            {PROGRESS_LOG.map((entry) => {
              const tag = entry.tag ? TAG_STYLE[entry.tag] : null
              return (
                <article
                  key={entry.id}
                  className="dd-panel relative md:ml-8 p-5 md:p-6"
                  data-reveal="up"
                >
                  <div
                    className="hidden md:block absolute -left-[29px] top-7 w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: tag?.color || 'var(--gold)',
                      background: 'var(--void)',
                      boxShadow: `0 0 12px ${tag?.color || 'var(--gold)'}`,
                    }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-[var(--gold)]">
                      {entry.date}
                    </span>
                    {tag && (
                      <span
                        className="font-ui text-[9px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: tag.color,
                          border: `1px solid ${tag.border}`,
                          background: 'rgba(0,0,0,0.25)',
                        }}
                      >
                        {tag.label}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">
                    {entry.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                    {entry.body}
                  </p>
                </article>
              )
            })}
          </div>
        </div>

        {/* Future updates */}
        <div className="flex items-center gap-4 mb-6" data-reveal="up">
          <h2 className="font-display text-2xl text-white tracking-wide">
            FUTURE UPDATES
          </h2>
          <div className="hud-line flex-1 opacity-50" />
        </div>
        <p className="body-lg max-w-xl mb-6" data-reveal="up">
          Roadmap for the beta. Status stays honest — planned means not built yet.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14" data-reveal-stagger>
          {FUTURE_UPDATES.map((u) => {
            const st = STATUS_STYLE[u.status]
            return (
              <article key={u.id} className="dd-card p-5" data-reveal-item>
                <p
                  className="font-ui text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: st.color }}
                >
                  {st.label}
                </p>
                <h3 className="font-display text-lg text-white uppercase tracking-wide mt-2">
                  {u.title}
                </h3>
                <p className="font-body text-sm text-[var(--bone-dim)] mt-2 leading-relaxed">
                  {u.body}
                </p>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className="dd-panel p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          data-reveal="scale"
        >
          <div>
            <p className="eyebrow">Friend beta</p>
            <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mt-2">
              Play the current build
            </h2>
            <p className="font-body text-sm text-[var(--bone-dim)] mt-2 max-w-md leading-relaxed">
              Download the APK, log in with your Account ID, and tell us what breaks —
              that feedback steers the next log entries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/download" className="btn-primary no-underline">
              Download APK
            </Link>
            <Link to="/play" className="btn-secondary no-underline">
              Web rewards
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
