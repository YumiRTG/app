/**
 * Android APK download settings for friend testing.
 *
 * HOW TO ENABLE LATER:
 * 1) Host the APK somewhere public (GitHub Release, Drive, Dropbox, own server).
 *    Note: GitHub repo file limit is 100 MB — large APKs need Releases/external host.
 * 2) Paste the full download URL into `apkUrl` below.
 * 3) Set `available` to true, update version/size, commit & push.
 *
 * Optional local file (only if under ~100 MB):
 *   put the file at public/dino-dominion.apk
 *   and set: apkUrl: import.meta.env.BASE_URL + 'dino-dominion.apk'
 */
export const APK_DOWNLOAD = {
  /** Set to true when friends should be able to download */
  available: false,

  /**
   * Full URL to the APK file.
   * Examples:
   * - 'https://github.com/YumiRTG/app/releases/download/v0.1.0/DinoDominion.apk'
   * - 'https://your-cdn.com/DinoDominion.apk'
   * - import.meta.env.BASE_URL + 'dino-dominion.apk'  (only if file is in /public)
   */
  apkUrl: '',

  fileName: 'DinoDominion.apk',
  version: '0.1.0-beta',
  sizeLabel: '—',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  notes:
    'This is a private beta build for friends. Install from unknown sources must be allowed on your phone.',
} as const
