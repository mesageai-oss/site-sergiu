const STEPS = [
  {
    n: '01',
    title: 'Ortstermin',
    text: 'Wir kommen in Ihre Wohnung, schauen uns den Bestand an und hören, was Sie vorhaben. Kostenlos und unverbindlich.',
  },
  {
    n: '02',
    title: 'Aufmaß & Festpreis',
    text: 'Wir messen auf und rechnen sauber durch. Sie bekommen ein schriftliches Festpreis-Angebot mit klar aufgelisteten Positionen.',
  },
  {
    n: '03',
    title: 'Termin & Material',
    text: 'Wir legen einen realistischen Zeitplan fest und wählen gemeinsam Fliesen, Böden und Sanitär aus. Sie wissen, wann was passiert.',
  },
  {
    n: '04',
    title: 'Ausführung',
    text: 'Wir arbeiten die Gewerke der Reihe nach ab. Ein fester Ansprechpartner ist erreichbar und meldet sich, wenn etwas hakt.',
  },
  {
    n: '05',
    title: 'Übergabe',
    text: 'Gemeinsame Abnahme, Mängelliste, Nacharbeit. Erst wenn alles passt, ist der Auftrag für uns abgeschlossen.',
  },
]

export function Process() {
  return (
    <section id="ablauf" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-16 max-w-2xl md:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">Ablauf</p>
          <h2 className="font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance">
            Von der Besichtigung bis zur Abnahme.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Fünf Schritte, kein Blindflug. Sie wissen an jedem Punkt, was als Nächstes kommt und
            was es kostet.
          </p>
        </div>

        <ol className="relative grid grid-cols-1 gap-y-10 md:grid-cols-5 md:gap-x-6">
          {/* Dashed connector */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 hidden h-full border-l border-dashed border-line md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-line md:block"
          />

          {STEPS.map((step) => (
            <li key={step.n} className="relative flex flex-col gap-4">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-bronze bg-background font-serif text-lg text-bronze">
                {step.n}
              </span>
              <h3 className="font-serif text-2xl leading-tight text-foreground">{step.title}</h3>
              <p className="pr-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
