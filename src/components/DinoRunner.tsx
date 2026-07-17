import { asset } from '@/lib/assets'

/**
 * Real Velociraptor + Dilophosaurus run across the site (full creatures, not icons).
 */
export default function DinoRunner() {
  return (
    <div className="dino-runner-layer" aria-hidden>
      <div className="dino-runner-track">
        <div className="dino-runner">
          <img
            src={asset('runner-raptor.png')}
            alt=""
            draggable={false}
          />
          <span className="dino-runner-dust" />
          <span className="dino-runner-dust dino-runner-dust-2" />
        </div>
      </div>
      <div className="dino-runner-track dino-runner-track-b">
        <div className="dino-runner dino-runner-b">
          <img
            src={asset('runner-dilo.png')}
            alt=""
            draggable={false}
          />
          <span className="dino-runner-dust" />
        </div>
      </div>
    </div>
  )
}
