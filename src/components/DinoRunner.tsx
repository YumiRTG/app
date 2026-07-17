import { asset } from '@/lib/assets'

/**
 * A raptor that runs across the bottom of the site on a loop.
 * Pure CSS — always visible, no scroll dependency.
 */
export default function DinoRunner() {
  return (
    <div className="dino-runner-layer" aria-hidden>
      <div className="dino-runner-track">
        <div className="dino-runner">
          <img src={asset('dino-raptor.png')} alt="" draggable={false} />
          <span className="dino-runner-dust" />
          <span className="dino-runner-dust dino-runner-dust-2" />
        </div>
      </div>
      {/* Second pack member, delayed / opposite height */}
      <div className="dino-runner-track dino-runner-track-b">
        <div className="dino-runner dino-runner-b">
          <img src={asset('dino-dilo.png')} alt="" draggable={false} />
        </div>
      </div>
    </div>
  )
}
