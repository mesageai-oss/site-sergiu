import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { BeforeAfterSection } from '@/components/before-after-section'
import { Services } from '@/components/services'
import { PlanBand } from '@/components/apartment-wireframe'
import { Process } from '@/components/process'
import { WhyUs } from '@/components/why-us'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { MobileCallBar } from '@/components/mobile-call-bar'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="pb-16 min-[1040px]:pb-0">
        <Hero />
        <StatsBar />
        <BeforeAfterSection />
        <Services />
        <PlanBand />
        <Process />
        <WhyUs />
        <About />
        <Contact />
        <SiteFooter />
      </main>
      <MobileCallBar />
    </>
  )
}
