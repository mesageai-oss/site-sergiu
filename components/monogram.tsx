type MonogramProps = {
  className?: string
}

/** Small geometric LB monogram — hairline strokes, no fill. */
export function Monogram({ className = '' }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="35" height="35" />
      <path d="M11 10 V30 H21" />
      <path d="M24 10 H30 a4.5 4.5 0 0 1 0 9 H24 Z" />
      <path d="M24 19 H31 a5 5 0 0 1 0 11 H24 Z" />
    </svg>
  )
}
