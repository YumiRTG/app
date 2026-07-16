import { asset } from '@/lib/assets'
import { APK_DOWNLOAD } from '@/config/download'
import { useAuth } from '@/hooks/useAuth'

export default function ApkDownload() {
  const isReady = APK_DOWNLOAD.available && Boolean(APK_DOWNLOAD.apkUrl)
  const { session } = useAuth()

  return (
    <section id="apk" className="max-w-[880px] mx-auto px-2">
      <div className="text-center mb-10">
        <p className="eyebrow">Friend beta</p>
        <h1 className="display-lg text-white mt-4">Download</h1>
        <p className="body-lg mt-4 max-w-lg mx-auto">
          Install the Android beta directly — share the link with friends.
        </p>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img
            src={asset('hero-poster.png')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,8,7,0.2) 0%, rgba(5,8,7,0.92) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#e9b44c]/30 shrink-0">
              <img
                src={asset('dino-tyranno.png')}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-2xl text-white tracking-wide">DINO DOMINION</p>
              <p className="font-ui text-[11px] tracking-[0.18em] uppercase text-[#e9b44c] mt-1">
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
                className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-center"
              >
                <p className="eyebrow !text-[0.58rem] !tracking-[0.14em]">{item.label}</p>
                <p className="font-ui text-sm text-white mt-1.5 tracking-wide">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-[#c4b89a]/80 leading-relaxed mb-6">
            {APK_DOWNLOAD.notes}
          </p>

          {session && (
            <div className="mb-5 rounded-xl border border-[#e9b44c]/20 bg-[#e9b44c]/8 px-4 py-3">
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

          <ol className="mt-8 space-y-2 font-body text-sm text-[#c4b89a]/70 list-decimal list-inside leading-relaxed">
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
