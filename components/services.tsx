import { Bath, Home, Leaf, PaintRoller, Zap } from 'lucide-react'

const SERVICES = [
  {
    icon: Home,
    title: 'Komplettsanierung',
    text: 'Die ganze Wohnung von Grund auf: Entkernen, neu aufbauen, alle Gewerke koordiniert. Sie bekommen eine fertig übergabefähige Wohnung, nicht fünf einzelne Baustellen.',
  },
  {
    icon: Bath,
    title: 'Bad & Küche',
    text: 'Neue Fliesen, Sanitärobjekte, Anschlüsse und Möbeleinbau. Wir planen die Abläufe so, dass das Bad in einem Zug fertig wird und nicht wochenlang unbenutzbar bleibt.',
  },
  {
    icon: Zap,
    title: 'Elektro, Sanitär & Heizung',
    text: 'Alte Leitungen und Rohre raus, neue Elektrik nach aktueller Norm, Wasser- und Heizungsstränge erneuert. Fachbetriebe, mit denen wir seit Jahren zusammenarbeiten.',
  },
  {
    icon: PaintRoller,
    title: 'Maler, Boden & Trockenbau',
    text: 'Wände spachteln und streichen, Parkett, Laminat oder Vinyl verlegen, Trockenbauwände und abgehängte Decken. Der sichtbare Teil, sauber ausgeführt.',
  },
  {
    icon: Leaf,
    title: 'Energieeffizienz',
    text: 'Neue Fenster, Dämmung und moderne Heiztechnik. Wir sagen Ihnen konkret, was sich im Bestand lohnt und was nicht — ohne Ihnen etwas aufzuschwatzen.',
  },
]

export function Services() {
  return (
    <section id="leistungen" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">Leistungen</p>
          <h2 className="font-serif text-4xl leading-[1.08] text-cream md:text-5xl text-balance">
            Neun Gewerke, ein Betrieb, eine Rechnung.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-cream/70">
            Sie brauchen nicht Elektriker, Fliesenleger und Maler einzeln zu suchen und zu
            koordinieren. Das übernehmen wir — und haften für das Ergebnis als Ganzes.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-ink-line sm:grid-cols-2 min-[1040px]:grid-cols-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`flex flex-col gap-5 border-b border-ink-line px-0 py-9 sm:px-7 min-[1040px]:border-b-0 min-[1040px]:py-10 ${
                  i > 0 ? 'sm:border-l sm:border-ink-line' : ''
                } ${i === 2 ? 'min-[1040px]:border-l' : ''}`}
              >
                <Icon className="h-7 w-7 text-bronze" strokeWidth={1.1} aria-hidden="true" />
                <h3 className="font-serif text-2xl leading-tight text-cream">{service.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-cream/65">{service.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
