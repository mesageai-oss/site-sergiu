'use client'

import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

type BeforeAfterProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
}

export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState(50)
  const draggingRef = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, next)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    setFromClientX(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
    if (e.key === 'Home') setPos(0)
    if (e.key === 'End') setPos(100)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-line"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Base: after */}
      <img
        src={afterSrc || '/placeholder.svg'}
        alt={afterAlt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Overlay: before, clipped to the left of the handle */}
      <img
        src={beforeSrc || '/placeholder.svg'}
        alt={beforeAlt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-cream">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-bronze px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-ink">
        Nachher
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-cream"
        style={{ left: `${pos}%` }}
      >
        <div
          role="slider"
          aria-label="Vergleich Vorher und Nachher"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center bg-cream text-ink"
        >
          <MoveHorizontal className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
