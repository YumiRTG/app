import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { APK_DOWNLOAD } from '@/config/download'

/** Keep every download entry point consistent with the release status. */
export default function DownloadLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, 'to'>) {
  const ready = APK_DOWNLOAD.available && Boolean(APK_DOWNLOAD.apkUrl)

  return (
    <Link {...props} to="/download">
      {ready ? children : 'Coming soon'}
    </Link>
  )
}
