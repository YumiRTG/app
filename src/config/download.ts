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
   * Local source: Desktop\Survival Game\DinoDominion\Dino Dominion.apk (~2.6 GB)
   *
   * HOW TO REFRESH:
   * 1) Upload the APK to Google Drive
   * 2) Share → Anyone with the link → Viewer
   * 3) Copy the share link (…/file/d/FILE_ID/view…)
   * 4) Put FILE_ID below in both the comment and apkUrl
   */
  apkUrl:
    'https://drive.google.com/uc?export=download&id=1yCiQka3mMLRNC2pQuleHi0rwuX6yW4Ez',

  fileName: 'DinoDominion.apk',
  version: '0.1.0-beta',
  sizeLabel: '~2.6 GB',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  notes:
    'Private friend beta from the latest local build. Download may take a while (~2.6 GB). On Android, allow install from this browser/source when prompted. Wi‑Fi recommended.',
} as const
