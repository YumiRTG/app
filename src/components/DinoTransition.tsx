import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { asset } from '@/lib/assets'

const PACK = [
  { src: asset('runner-raptor.png'), name: 'Velociraptor' },
  { src: asset('runner-dilo.png'), name: 'Dilophosaurus' },
  { src: asset('dino-tyranno.png'), name: 'Tyrannosaurus' },
  { src: asset('dino-stego.png'), name: 'Stegosaurus' },
  { src: asset('dino-triceratops.png'), name: 'Triceratops' },
  { src: asset('dino-ptera.png'), name: 'Pterodactyl' },
  { src: asset('dino-dragon.png'), name: 'Fire Dragon' },
]

type Phase = 'idle' | 'enter' | 'hold' | 'exit'

/**
 * On route change: one random dino pops in with a short scene animation, then leaves.
 * No continuous “fly around” — only page / scene transitions.
 */
export default function DinoTransition() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState<Phase>('idle')
  const [dino, setDino] = useState(PACK[0])
  const [variant, setVariant] = useState(0)
  const [ready, setReady] = useState(false)

  // Skip first paint so home load is clean
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 600)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const pick = PACK[Math.floor(Math.random() * PACK.length)]
    setDino(pick)
    setVariant(Math.floor(Math.random() * 3)) // 0 slash, 1 rise, 2 stampede-side
    setPhase('enter')

    const t1 = window.setTimeout(() => setPhase('hold'), 450)
    const t2 = window.setTimeout(() => setPhase('exit'), 1400)
    const t3 = window.setTimeout(() => setPhase('idle'), 2000)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [pathname, ready])

  if (phase === 'idle') return null

  return (
    <div
      className={`dino-scene-fx dino-scene-fx--${phase} dino-scene-fx--v${variant}`}
      aria-hidden
    >
      <div className="dino-scene-fx__flash" />
      <div className="dino-scene-fx__claw" />
      <div className="dino-scene-fx__creature">
        <img src={dino.src} alt="" draggable={false} />
        <span className="dino-scene-fx__label">{dino.name}</span>
      </div>
    </div>
  )
}
