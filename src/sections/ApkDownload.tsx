import { asset } from '@/lib/assets'
import { APK_DOWNLOAD } from '@/config/download'
import { useAuth } from '@/hooks/useAuth'

export default function ApkDownload() {
  const isReady = APK_DOWNLOAD.available && Boolean(APK_DOWNLOAD.apkUrl)
  const { session } = useAuth()

  return (
    <section id="apk" className="max-w-[920px] mx-auto px-2">
      <div className="text-center mb-10">
        <p className="eyebrow">Friend beta</p>
        <h1 className="display-lg text-white mt-4">Download</h1>
        <p className="body-lg mt-4 max-w-lg mx-auto">
          Install the Android beta directly — share the link with friends.
        </p>
      </div>

      <div className="glass-panel overflow-hidden">
        {/* Tall banner — shows full scene, not a cropped strip */}
        <div className="relative w-full overflow-hidden" style={{ height: 'min(42vw, 280px)', minHeight: 200 }}>
          <img
            src={asset('campaign-1.png')}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,26,18,0.15) 0%, rgba(12,26,18,0.55) 55%, rgba(12,26,18,0.95) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex items-end gap-4">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-[#f0c14d]/40 shrink-0 shadow-xl bg-[#143524]"
            >
              <img
                src={asset('dino-tyranno.png')}
                alt="Dino Dominion"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
            <div className="min-w-0 pb-0.5">
              <p className="font-display text-2xl md:text-3xl text-white tracking-wide">
                DINO DOMINION
              </p>
              <p className="font-ui text-[11px] tracking-[0.18em] uppercase text-[#f0c14d] mt-1">
                Android APK · Beta
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Platform', value: APK_DOWNLOAD.platform },
              { label: 'Version', value: APK_DOWNLOAD.version },
              { label: 'Size', value: APK_DOWNLOAD.sizeLabel },
              { label: 'Requires', value: APK_DOWNLOAD.minAndroid },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#f0c14d]/15 bg-black/15 px-3 py-3 text-center"
              >
                <p className="eyebrow !text-[0.58rem] !tracking-[0.14em]">{item.label}</p>
                <p className="font-ui text-sm text-white mt-1.5 tracking-wide">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-[#d2c4a0]/90 leading-relaxed mb-6">
            {APK_DOWNLOAD.notes}
          </p>

          {session && (
            <div className="mb-5 rounded-xl border border-[#f0c14d]/25 bg-[#f0c14d]/10 px-4 py-3">
              <p className="eyebrow !text-[0.58rem]">Logged in as</p>
              <p className="font-ui text-white text-sm mt-1">{session.displayName}</p>
            </div>
          )}

          {isReady ? (
            <a
              href={APK_DOWNLOAD.apkUrl}
              download={APK_DOWNLOAD.fileName}
              className="btn-primary w-full no-underline"
            >
              Download APK
            </a>
          ) : (
            <button type="button" disabled className="btn-primary w-full">
              APK coming soon
            </button>
          )}

          <ol className="mt-8 space-y-2 font-body text-sm text-[#d2c4a0]/75 list-decimal list-inside leading-relaxed">
            <li>Open this page on your Android phone.</li>
            <li>Tap Download APK and wait for the file.</li>
            <li>Allow install from this source if asked.</li>
            <li>Launch Dino Dominion and play.</li>
          </ol>
        </div>
      </div>
    </section>
  )
}
