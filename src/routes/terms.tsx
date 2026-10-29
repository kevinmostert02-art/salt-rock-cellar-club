import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Salt Rock Winery" },
      { name: "description", content: "Terms of sale for Salt Rock Winery." },
      { property: "og:title", content: "Terms — Salt Rock Winery" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container-luxe max-w-3xl">
          <Reveal><p className="eyebrow">Terms of Sale</p></Reveal>
          <Reveal delay={0.1}><h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">The <em className="text-gold not-italic">quiet</em> fine print.</h1></Reveal>
          <div className="mt-10 space-y-6 text-cream/80 leading-[1.9]">
            <p><strong>Age.</strong> No sales to persons under the age of 18. A valid ID and adult signature are required on delivery.</p>
            <p><strong>Pricing & availability.</strong> All prices are in South African Rand and include VAT where applicable. Wines are subject to availability and may be withdrawn without notice.</p>
            <p><strong>Responsible drinking.</strong> Salt Rock Winery supports responsible enjoyment. Not for sale to persons under 18.</p>
            <p className="text-sm text-cream/55">This page is maintained by Salt Rock Winery. For full legal terms please contact us.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
