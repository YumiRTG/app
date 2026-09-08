/** Android beta download metadata. Update against the hosted artifact before enabling. */
export const APK_DOWNLOAD = {
  // The shared Google Drive page provides the current Android beta APK.
  available: true,
  apkUrl: 'https://drive.google.com/file/d/14BG-JlwC9oBeifF3aOh3dacTsKPUAuHj/view?usp=sharing',
  fileName: 'DinoWarfront.apk',
  version: 'Beta',
  sizeLabel: 'See Google Drive',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  hostLabel: 'Google Drive',
  notes:
    'Download the Android beta from Google Drive. Open the link and select Download to save DinoWarfront.apk to your phone. Wi-Fi recommended.',
} as const
