/** Android beta download metadata. Update against the hosted artifact before enabling. */
export const APK_DOWNLOAD = {
  // Enable only when a new public Android build is ready.
  available: false,
  apkUrl: '',
  fileName: 'DinoWarfront.apk',
  version: 'Beta',
  sizeLabel: 'Coming soon',
  platform: 'Android',
  minAndroid: 'Android 8.0+',
  hostLabel: '',
  notes:
    'The Android download is coming soon. Join our Discord for updates on the next build.',
} as const
