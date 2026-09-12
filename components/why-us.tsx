const POINTS = [
  {
    n: '01',
    title: 'Ein fester Ansprechpartner',
    text: 'Sie telefonieren nicht mit einer Zentrale und rennen keinen Subunternehmern hinterher. Eine Person kennt Ihre Wohnung, Ihren Zeitplan und den Stand der Arbeiten — von Anfang bis Abnahme.',
  },
  {
    n: '02',
    title: 'Ein Festpreis, der hält',
    text: 'Was im Angebot steht, gilt. Mehrkosten entstehen nur, wenn Sie zusätzliche Leistungen beauftragen — und das besprechen wir vorher, nicht auf der Schlussrechnung.',
  },
  {
    n: '03',
    title: 'Realistische Termine',
    text: 'Wir planen mit Puffer statt mit Wunschdenken. Und wenn sich doch etwas verschiebt, sagen wir frühzeitig Bescheid, statt Sie am Übergabetag zu überraschen.',
  },
  {
    n: '04',
    title: 'Dieselben Partner seit Jahren',
    text: 'Elektriker, Fliesenleger, Sanitär: Wir arbeiten mit denselben Fachbetrieben, die wir kennen und deren Qualität wir einschätzen können. Keine wechselnden Kolonnen.',
  },
]

export function WhyUs() {
  return (
    <section id="warum-wir" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">Warum wir</p>
          <h2 className="font-serif text-4xl leading-[1.08] text-cream md:text-5xl text-balance">
            Vier Dinge, auf die Sie sich verlassen können.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border border-ink-line bg-ink-line md:grid-cols-2">
          {POINTS.map((point) => (
            <div key={point.n} className="flex flex-col gap-4 bg-ink p-8 md:p-11">
              <span className="font-serif text-2xl text-bronze">{point.n}</span>
              <h3 className="font-serif text-2xl leading-tight text-cream md:text-3xl">
                {point.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-cream/65">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
