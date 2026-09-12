'use client'

import type { FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const CONTACT = [
  { icon: Phone, label: 'Telefon', value: '+49 000 000 000', href: 'tel:+49000000000' },
  { icon: Mail, label: 'E-Mail', value: 'info@loghin-bau.de', href: 'mailto:info@loghin-bau.de' },
  { icon: MapPin, label: 'Büro', value: 'Musterstraße 00, 00000 Musterstadt', href: null },
]

const fieldClass =
  'h-12 rounded-none border-ink-line bg-transparent px-4 text-cream placeholder:text-cream/35 focus-visible:border-bronze focus-visible:ring-0'

export function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.info('Testversion', {
      description: 'Dieses Formular ist noch nicht angebunden. Es wird keine Anfrage versendet.',
    })
  }

  return (
    <section id="kontakt" className="bg-ink pt-24 md:pt-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          {/* Left: invitation + details */}
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">Kontakt</p>
            <h2 className="font-serif text-4xl leading-[1.06] text-cream md:text-6xl text-balance">
              Lassen Sie uns über Ihre Sanierung sprechen.
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-cream/70">
              Schreiben Sie uns kurz, was ansteht, oder rufen Sie einfach an. Wir melden uns und
              vereinbaren einen kostenlosen Ortstermin.
            </p>

            <dl className="mt-12 flex flex-col divide-y divide-ink-line border-y border-ink-line">
              {CONTACT.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <Icon className="h-5 w-5 shrink-0 text-bronze" strokeWidth={1.4} />
                    <span className="flex flex-col">
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-serif text-xl text-cream">{item.value}</dd>
                    </span>
                  </>
                )
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 py-5 transition-colors hover:text-bronze"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-4 py-5">
                    {content}
                  </div>
                )
              })}
            </dl>

            <p className="mt-8 text-[13px] uppercase tracking-[0.18em] text-bronze">
              Einsatzgebiet: Frankfurt · Offenbach · Hanau · Wiesbaden und Umgebung
            </p>
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                  Name
                </Label>
                <Input id="name" name="name" autoComplete="name" required className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                  Telefon
                </Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                E-Mail
              </Label>
              <Input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="project" className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                Art des Projekts
              </Label>
              <select
                id="project"
                name="project"
                defaultValue=""
                className="h-12 border border-ink-line bg-transparent px-4 text-cream outline-none focus-visible:border-bronze"
              >
                <option value="" disabled className="bg-ink-soft text-cream">
                  Bitte wählen
                </option>
                <option value="komplett" className="bg-ink-soft text-cream">Komplettsanierung</option>
                <option value="bad" className="bg-ink-soft text-cream">Bad</option>
                <option value="kueche" className="bg-ink-soft text-cream">Küche</option>
                <option value="technik" className="bg-ink-soft text-cream">Elektro / Sanitär / Heizung</option>
                <option value="energie" className="bg-ink-soft text-cream">Energieeffizienz</option>
                <option value="sonstiges" className="bg-ink-soft text-cream">Sonstiges</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
                Kurz zum Projekt
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Was soll gemacht werden? Wie groß ist die Wohnung? Bis wann?"
                className="rounded-none border-ink-line bg-transparent px-4 py-3 text-cream placeholder:text-cream/35 focus-visible:border-bronze focus-visible:ring-0"
              />
            </div>

            <button
              type="submit"
              className="mt-2 self-start border border-bronze bg-bronze px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bronze-soft"
            >
              Anfrage senden
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
