const STATS = [
  { value: '15', label: 'Jahre Erfahrung' },
  { value: '140+', label: 'renovierte Wohnungen' },
  { value: '9', label: 'Gewerke aus einer Hand' },
  { value: '1', label: 'fester Ansprechpartner' },
]

export function StatsBar() {
  return (
    <div className="relative z-20 mx-auto -mt-20 max-w-[1240px] px-5 md:px-8">
      <div className="grid grid-cols-2 border border-ink-line bg-ink md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 px-6 py-8 md:px-8 md:py-10 ${
              i % 2 === 1 ? 'border-l border-ink-line' : ''
            } ${i >= 2 ? 'border-t border-ink-line md:border-t-0' : ''} ${
              i === 2 ? 'md:border-l' : ''
            } ${i === 3 ? 'md:border-l' : ''}`}
          >
            <span className="font-serif text-4xl leading-none text-bronze md:text-5xl">
              {stat.value}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
