/**
 * Android APK download settings for friend testing.
 *
 * HOW TO UPDATE:
 * 1) Host a new APK (Drive, Dropbox, GitHub Release, etc.)
 * 2) Paste the download URL into `apkUrl`
 * 3) Set `available` to true, update version/size, commit & push
 *
 * Google Drive tip:
 *   share link:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   download:    https://drive.google.com/uc?export=download&id=FILE_ID
 */
export const APK_DOWNLOAD = {
  /** Set to true when friends should be able to download */
  available: true,

  /**
   * Direct download URL (Google Drive export link).
   * Source share: https://drive.google.com/file/d/1vCOXB_CIomE0c1ybGzfo7FxK6Mfh-quM/view?usp=sharing
   */
  apkUrl:
    'https://drive.google.com/uc?export=download&id=1vCOXB_CIomE0c1ybGzfo7FxK6Mfh-quM',

  fileName: 'DinoDominion.apk',
  version: '0.1.0-beta',
  sizeLabel: '~3.5 GB',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  notes:
    'Private friend beta. Download may take a while (large file). On Android, allow install from this browser/source when prompted. Wi‑Fi recommended.',
} as const
