import { Phone } from 'lucide-react'

export function MobileCallBar() {
  return (
    <a
      href="tel:+49000000000"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3 bg-bronze py-4 text-[13px] uppercase tracking-[0.16em] text-ink min-[1040px]:hidden"
    >
      <Phone className="h-4 w-4" strokeWidth={2} />
      Jetzt anrufen: +49 000 000 000
    </a>
  )
}
