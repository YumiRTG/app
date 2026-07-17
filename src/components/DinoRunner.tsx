import { asset } from '@/lib/assets'

/**
 * One dino at a time: wanders the full viewport (not just the bottom edge),
 * sometimes pauses and “looks” at the screen, then continues. Slow loop.
 * Alternates Velociraptor ↔ Dilophosaurus.
 */
export default function DinoRunner() {
  return (
    <div className="dino-wander-layer" aria-hidden>
      {/* Velociraptor — first half of cycle */}
      <div className="dino-wander dino-wander-raptor">
        <div className="dino-wander-body">
          <img src={asset('runner-raptor.png')} alt="" draggable={false} />
        </div>
      </div>

      {/* Dilophosaurus — second half of cycle (only one visible) */}
      <div className="dino-wander dino-wander-dilo">
        <div className="dino-wander-body">
          <img src={asset('runner-dilo.png')} alt="" draggable={false} />
        </div>
      </div>
    </div>
  )
}
