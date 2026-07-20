/**
 * Android APK download settings for friend testing.
 *
 * HOW TO UPDATE:
 * 1) Host a new APK (Gofile, Drive, Dropbox, etc.)
 * 2) Paste the download URL into `apkUrl`
 * 3) Set `available` to true, update version/size, commit & push
 *
 * Current host: Gofile (Google Drive upload failed for ~2.6 GB)
 *   page: https://gofile.io/d/kDQEbW
 *   file: DinoDominion.apk · 2751982002 bytes · md5 43fc8794b880df065d19a18218aa2eeb
 *   guestToken (manage): MjsxwC1rQdNErimxjlpKAZ7Mz91YOTr8
 */
export const APK_DOWNLOAD = {
  /** Set to true when friends should be able to download */
  available: true,

  /**
   * Download page / direct link for the APK.
   * Local source: Desktop\Survival Game\DinoDominion\Dino Dominion.apk (~2.6 GB)
   */
  apkUrl: 'https://gofile.io/d/kDQEbW',

  fileName: 'DinoDominion.apk',
  version: '0.1.0-beta',
  sizeLabel: '~2.6 GB',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  notes:
    'Private friend beta. Opens a download page — tap Download there for DinoDominion.apk (~2.6 GB). Wi‑Fi recommended. On Android, allow install from this browser/source when prompted.',
} as const
