import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asset } from '@/lib/assets'
import { APK_DOWNLOAD } from '@/config/download'
import { useAuth } from '@/hooks/useAuth'

gsap.registerPlugin(ScrollTrigger)

export default function ApkDownload() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isReady = APK_DOWNLOAD.available && Boolean(APK_DOWNLOAD.apkUrl)
  const { session } = useAuth()

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return

    gsap.fromTo(
      card,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="apk"
      ref={sectionRef}
      className="section-light py-[100px] md:py-[140px] px-6 md:px-20"
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="label-text text-sage">FRIEND ACCESS</span>
          <h2
            className="font-display text-teal uppercase mt-4"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            DOWNLOAD THE APK
          </h2>
          <p
            className="font-body text-teal/70 mt-4 max-w-[540px] mx-auto"
            style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', lineHeight: 1.65 }}
          >
            Share this page with friends. They can install the Android beta directly from here —
            no store required.
          </p>
        </div>

        <div
          ref={cardRef}
          className="opacity-0 rounded-[10px] overflow-hidden border border-teal/12 shadow-[0_24px_80px_rgba(8,76,97,0.12)]"
          style={{ background: '#FEFAE0' }}
        >
          {/* Top banner */}
          <div className="relative h-36 md:h-44 overflow-hidden">
            <img
              src={asset('hero-poster.png')}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,76,97,0.35) 0%, rgba(8,76,97,0.92) 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-cream/30 bg-teal shadow-lg">
                  <img
                    src={asset('dino-tyranno.png')}
                    alt="Dino Dominion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-cream text-2xl md:text-3xl tracking-wide">
                    DINO DOMINION
                  </p>
                  <p className="font-ui text-cream/70 text-xs uppercase tracking-[0.14em] mt-1">
                    Android APK · Beta
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {[
                { label: 'Platform', value: APK_DOWNLOAD.platform },
                { label: 'Version', value: APK_DOWNLOAD.version },
                { label: 'Size', value: APK_DOWNLOAD.sizeLabel },
                { label: 'Requires', value: APK_DOWNLOAD.minAndroid },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-teal/[0.06] border border-teal/10 px-3 py-3 text-center"
                >
                  <p className="label-text text-teal/45 text-[10px]">{item.label}</p>
                  <p className="font-ui text-teal text-sm mt-1 tracking-wide">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="font-body text-teal/65 text-sm leading-relaxed mb-7 max-w-[640px]">
              {APK_DOWNLOAD.notes}
            </p>

            {session && (
              <div className="mb-5 rounded-lg border border-sage/30 bg-sage/10 px-4 py-3">
                <p className="label-text text-sage text-[10px]">Logged in as</p>
                <p className="font-ui text-teal text-sm mt-1 tracking-wide">
                  {session.displayName}
                </p>
              </div>
            )}

            {isReady ? (
              <a
                href={APK_DOWNLOAD.apkUrl}
                download={APK_DOWNLOAD.fileName}
                className="btn-primary inline-flex items-center justify-center gap-3 w-full md:w-auto min-w-[280px] py-[18px] px-10 no-underline"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download APK
              </a>
            ) : (
              <div className="space-y-4">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-3 w-full md:w-auto min-w-[280px] py-[18px] px-10 rounded-full font-ui uppercase tracking-[0.06em] text-base border-none cursor-not-allowed opacity-70"
                  style={{ background: 'rgba(8,76,97,0.25)', color: '#FEFAE0' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  APK coming soon
                </button>
                <p className="font-body text-teal/50 text-xs leading-relaxed">
                  The download button will go live as soon as the beta APK link is added.
                  Share this page now — friends can already browse the game.
                </p>
              </div>
            )}

            {/* Install help */}
            <div className="mt-8 pt-7 border-t border-teal/10">
              <p className="label-text text-teal/50 mb-3">How to install</p>
              <ol className="space-y-2 font-body text-teal/70 text-sm leading-relaxed list-decimal list-inside">
                <li>Open this page on your Android phone.</li>
                <li>Tap <strong className="text-teal">Download APK</strong> and wait for the file.</li>
                <li>Open the downloaded file and allow install from this source if asked.</li>
                <li>Launch <strong className="text-teal">Dino Dominion</strong> and start playing.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Share tip */}
        <p className="text-center font-body text-teal/45 text-xs mt-8 tracking-wide">
          Share link:{' '}
          <span className="text-teal/70 font-ui tracking-wider">
            yumirtg.github.io/app/#apk
          </span>
        </p>
      </div>
    </section>
  )
}
