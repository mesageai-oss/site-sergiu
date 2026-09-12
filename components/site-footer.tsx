import { Monogram } from '@/components/monogram'

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-24 md:pt-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-col gap-8 border-t border-ink-line py-12 md:flex-row md:items-center md:justify-between">
          <a href="#start" className="flex items-center gap-3 text-cream" aria-label="Loghin Bau — nach oben">
            <Monogram className="h-9 w-9 text-bronze" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-wide">Loghin Bau</span>
              <span className="mt-1.5 text-[9px] uppercase tracking-[0.32em] text-ink-muted">
                Wohnungssanierung · Rhein-Main
              </span>
            </span>
          </a>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-cream/60">
            Sanierung statt Neubau: Wir bringen Bestandswohnungen zwischen Frankfurt und Wiesbaden
            wieder in Form — termingerecht und zum Festpreis.
          </p>
        </div>

        {/* Test-version disclaimer */}
        <div className="border-t border-ink-line py-6">
          <p className="text-[12px] leading-relaxed text-ink-muted">
            Hinweis: Dies ist eine Testversion. Alle Zahlen, Orte und Kontaktdaten
            (Telefon, E-Mail, Adresse) sind Platzhalter und stehen nicht für ein reales Angebot.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-line py-8 text-[12px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Loghin Bau. Alle Rechte vorbehalten.</p>
          <nav className="flex items-center gap-8" aria-label="Rechtliches">
            <a href="#" className="uppercase tracking-[0.14em] transition-colors hover:text-bronze">
              Impressum
            </a>
            <a href="#" className="uppercase tracking-[0.14em] transition-colors hover:text-bronze">
              Datenschutz
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
