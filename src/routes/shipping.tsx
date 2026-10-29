import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Truck, Package, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Salt Rock Winery" },
      { name: "description", content: "Complimentary nationwide shipping on orders over R750. Careful, temperature-aware dispatch from Stellenbosch." },
      { property: "og:title", content: "Shipping — Salt Rock Winery" },
      { property: "og:url", content: "/shipping" },
    ],
    links: [{ rel: "canonical", href: "/shipping" }],
  }),
  component: () => (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container-luxe max-w-3xl">
          <Reveal><p className="eyebrow">Shipping</p></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">Delivered with <em className="text-gold not-italic">care.</em></h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-cream/75 leading-relaxed">
              Every bottle leaves our Stellenbosch cellar carefully packaged in a purpose-built wine box and dispatched with insured, temperature-aware couriers.
            </p>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {[
              { i: Truck, t: "Nationwide delivery", b: "Anywhere in South Africa. Complimentary on orders over R750." },
              { i: Clock, t: "2–4 business days", b: "Metro areas typically 2 days. Outlying towns up to 5." },
              { i: Package, t: "Purpose-built packaging", b: "Rigid wine cartons, insured against transit damage." },
              { i: MapPin, t: "Signature on delivery", b: "An adult signature (18+) is required at the doorstep." },
            ].map((c) => (
              <div key={c.t} className="glass p-8">
                <c.i className="text-gold" size={20} />
                <h3 className="mt-4 text-xl font-display">{c.t}</h3>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/wines" className="btn-gold">Shop the Cellar</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
