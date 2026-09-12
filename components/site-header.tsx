'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Monogram } from '@/components/monogram'

const NAV = [
  { label: 'Start', href: '#start' },
  { label: 'Vorher / Nachher', href: '#vorher-nachher' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Warum wir', href: '#warum-wir' },
  { label: 'Über uns', href: '#ueber-uns' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <a
          href="#start"
          className="flex items-center gap-3 text-cream"
          aria-label="Loghin Bau — Startseite"
        >
          <Monogram className="h-8 w-8 text-bronze" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-wide">Loghin Bau</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.32em] text-ink-muted">
              Sanierung · Rhein-Main
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 min-[1040px]:flex" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-bronze"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="hidden border border-bronze px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-bronze transition-colors hover:bg-bronze hover:text-ink min-[1040px]:inline-block"
          >
            Termin anfragen
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center border border-cream/25 text-cream min-[1040px]:hidden"
            aria-label="Menü öffnen"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 min-[1040px]:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/70 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ink-soft transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-ink-line px-6">
            <span className="font-serif text-lg text-cream">Menü</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center border border-cream/25 text-cream"
              aria-label="Menü schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile Navigation">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-line py-4 font-serif text-2xl text-cream transition-colors hover:text-bronze"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto p-6">
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="block border border-bronze px-5 py-3.5 text-center text-[12px] uppercase tracking-[0.16em] text-bronze"
            >
              Termin anfragen
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
