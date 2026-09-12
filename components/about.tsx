export function About() {
  return (
    <section id="ueber-uns" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 md:grid-cols-[0.85fr_1fr] md:gap-16 md:px-8">
        <div className="relative">
          <img
            src="/images/owner-portrait.png"
            alt="Porträt des Inhabers von Loghin Bau in einer im Umbau befindlichen Wohnung"
            className="aspect-[4/5] w-full border border-line object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-24 w-24 border-b border-r border-bronze"
          />
        </div>

        <div className="max-w-xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">Über uns</p>
          <h2 className="font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance">
            Sie sprechen mit der Person, die Ihre Wohnung kennt.
          </h2>
          <p className="mt-7 text-[15px] leading-relaxed text-muted-foreground">
            Loghin Bau ist ein Sanierungsbetrieb aus dem Rhein-Main-Gebiet. Seit 15 Jahren
            sanieren wir Wohnungen für Eigentümer, Vermieter zwischen zwei Mietverhältnissen und
            Menschen, die gerade eine alte Wohnung gekauft haben. Über 140 abgeschlossene
            Wohnungen stehen hinter uns.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Der Inhaber ist selbst auf der Baustelle. Kein Call-Center, keine anonyme Kolonne:
            Sie reden mit dem, der die Arbeiten koordiniert und am Ende dafür geradesteht. Das ist
            der Grund, warum unsere Kunden uns weiterempfehlen.
          </p>
        </div>
      </div>
    </section>
  )
}
