'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const imageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = imageRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const offset = Math.min(window.scrollY, 900) * 0.28
      el.style.transform = `translateY(${offset}px)`
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="start"
      className="relative w-full overflow-hidden bg-ink"
      style={{ height: 'min(92vh, 840px)' }}
    >
      {/* Full-bleed photograph with parallax */}
      <div ref={imageRef} className="absolute inset-0 -bottom-24 will-change-transform">
        <img
          src="/images/hero-renovated-living-room-dusk.png"
          alt="Sanierter Wohnraum bei Abendlicht mit warmem Holzboden und großen Fenstern"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Directional gradient: near-opaque left, transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(19,18,16,0.96) 0%, rgba(19,18,16,0.86) 26%, rgba(19,18,16,0.5) 52%, rgba(19,18,16,0.12) 74%, rgba(19,18,16,0) 100%)',
        }}
      />
      {/* Bottom dissolve into the cream page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-52"
        style={{
          background: 'linear-gradient(to top, #f3f0e8 0%, rgba(243,240,232,0.5) 40%, rgba(243,240,232,0) 100%)',
        }}
      />

      {/* Technical overlay: faint bronze hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #b98d57 1px, transparent 1px), linear-gradient(to bottom, #b98d57 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'linear-gradient(100deg, black 0%, rgba(0,0,0,0.4) 55%, transparent 85%)',
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-[1240px] items-center px-5 md:px-8">
        {/* Measuring-scale tick column */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-start gap-3 md:flex md:left-8"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="block bg-bronze/70"
              style={{ height: '1px', width: i % 2 === 0 ? '22px' : '11px' }}
            />
          ))}
        </div>

        <div className="max-w-2xl md:pl-16">
          <p className="mb-6 text-[11px] uppercase tracking-[0.36em] text-bronze">
            Sanierung im Rhein-Main-Gebiet
          </p>
          <h1 className="font-serif text-[clamp(2.6rem,7vw,5rem)] font-normal leading-[1.02] text-cream text-balance">
            Wir sanieren Ihre Wohnung —{' '}
            <span className="italic text-bronze">fertig</span> zum vereinbarten Termin.
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-cream/75">
            Komplettsanierung, Bad und Küche, Elektro und Sanitär: neun Gewerke aus einer Hand,
            ein fester Ansprechpartner und ein Festpreis, der hält. Seit 15 Jahren zwischen
            Frankfurt, Offenbach, Hanau und Wiesbaden.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#kontakt"
              className="border border-bronze bg-bronze px-7 py-3.5 text-[12px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bronze-soft"
            >
              Projekt besprechen
            </a>
            <a
              href="#vorher-nachher"
              className="text-[12px] uppercase tracking-[0.16em] text-cream/80 underline-offset-8 transition-colors hover:text-bronze hover:underline"
            >
              Vorher / Nachher ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
