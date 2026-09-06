import { useState } from 'react'
import { asset } from '@/lib/assets'

/** Same artwork; portrait crops avoid transferring the full desktop landscape. */
export default function ResponsiveHero() {
  const [fallback, setFallback] = useState(false)
  return (
    <picture>
      {!fallback && <>
        <source
          media="(max-width: 767px) and (orientation: portrait)"
          type="image/webp"
          srcSet={`${asset('optimized/hero-mobile-480.webp')} 480w, ${asset('optimized/hero-mobile-768.webp')} 768w, ${asset('optimized/hero-mobile-1080.webp')} 1080w`}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={`${asset('optimized/hero-wide-1280.webp')} 1280w, ${asset('optimized/hero-wide-1920.webp')} 1920w, ${asset('optimized/hero-wide-2560.webp')} 2560w`}
          sizes="100vw"
        />
      </>}
      <img
        data-hero-bg
        src={asset('hero-poster.png')}
        alt="Dino Warfront landscape with apex T-rex"
        className="absolute inset-0 w-full h-full object-cover will-change-transform hero-video-live"
        style={{ objectPosition: 'center center' }}
        draggable={false}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        onError={() => setFallback(true)}
      />
    </picture>
  )
}
