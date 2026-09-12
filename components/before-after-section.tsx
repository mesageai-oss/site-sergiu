import { BeforeAfter } from '@/components/before-after'
import { Reveal } from '@/components/reveal'

const ROOMS = [
  {
    beforeSrc: '/images/kitchen-before-renovation.png',
    afterSrc: '/images/kitchen-after-renovation-daylight.png',
    beforeAlt: 'Küche vor der Sanierung mit alten Schränken und beschädigten Fliesen',
    afterAlt: 'Küche nach der Sanierung mit matten Fronten und Steinarbeitsplatte',
    room: 'Küche',
    caption: 'Komplett entkernt, neue Elektrik, frische Fliesen und Einbauküche.',
    duration: '18 Arbeitstage',
  },
  {
    beforeSrc: '/images/bathroom-before-renovation.png',
    afterSrc: '/images/bathroom-after-renovation.png',
    beforeAlt: 'Bad vor der Sanierung mit rissigen Fliesen und alten Objekten',
    afterAlt: 'Bad nach der Sanierung mit großformatigen Fliesen und bodengleicher Dusche',
    room: 'Bad',
    caption: 'Von den Rohren bis zur Fliese neu, bodengleiche Dusche statt Wanne.',
    duration: '12 Arbeitstage',
  },
]

export function BeforeAfterSection() {
  return (
    <section id="vorher-nachher" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">
            Vorher / Nachher
          </p>
          <h2 className="font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance">
            Dieselbe Wohnung. Gleiche Kameraposition.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Ziehen Sie den Regler, um denselben Raum vor und nach der Sanierung zu vergleichen.
            Keine geschönten Winkel — das ist das tatsächliche Ergebnis.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {ROOMS.map((room, i) => (
            <Reveal key={room.room} delay={i * 120}>
              <figure className="flex flex-col">
                <BeforeAfter
                  beforeSrc={room.beforeSrc}
                  afterSrc={room.afterSrc}
                  beforeAlt={room.beforeAlt}
                  afterAlt={room.afterAlt}
                />
                <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <p className="font-serif text-2xl text-foreground">{room.room}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                      {room.caption}
                    </p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-bronze">
                    {room.duration}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
