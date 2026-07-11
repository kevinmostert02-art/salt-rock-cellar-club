import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "The Salt Rock Wine Club — Membership" },
      { name: "description", content: "Explorer, Collector and Reserve tiers. Curated dispatches, early access, private tastings and priority cellar tours." },
      { property: "og:title", content: "The Salt Rock Wine Club" },
      { property: "og:description", content: "Three tiers, one shared table. Bottles chosen with intention, delivered with care." },
    ],
  }),
  component: ClubPage,
});

const tiers = [
  {
    name: "Explorer",
    bottles: 2,
    price: "from R 290 / mo",
    tag: "Begin the journey",
    benefits: [
      "Member discount on all wines",
      "Early access to new releases",
      "Birthday reward bottle",
      "Loyalty points on every dispatch",
    ],
  },
  {
    name: "Collector",
    bottles: 4,
    price: "from R 560 / mo",
    tag: "Most poured",
    featured: true,
    benefits: [
      "Larger member discount",
      "Early access to new releases",
      "Birthday reward bottle",
      "Exclusive club-only releases",
      "Priority member support",
    ],
  },
  {
    name: "Reserve",
    bottles: 6,
    price: "from R 820 / mo",
    tag: "The private cellar",
    benefits: [
      "Biggest member discount",
      "Birthday reward bottle",
      "Limited edition releases",
      "Private tastings of new releases",
      "VIP member status",
      "Priority private cellar tours",
    ],
  },
];

function ClubPage() {
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe text-center">
          <Reveal><p className="eyebrow">The Salt Rock Wine Club</p></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-8xl font-display leading-[0.95] max-w-4xl mx-auto">
              A monthly seat<br />
              at our <em className="text-gold not-italic">private table.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl mx-auto text-cream/70 leading-relaxed">
              Bottles selected by the winemakers, delivered with intention, and unlocked
              with the kind of access reserved for family.
            </p>
          </Reveal>
        </section>

        <section className="container-luxe py-24 md:py-32">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {tiers.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative flex flex-col p-8 md:p-10 border ${
                  t.featured
                    ? "border-gold/60 bg-gradient-to-b from-burgundy/30 to-card md:-translate-y-6"
                    : "border-border bg-card/40"
                } hover:border-gold/80 transition-all duration-700 group`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 text-[0.6rem] tracking-[0.3em] uppercase bg-gold text-charcoal px-3 py-1">
                    {t.tag}
                  </span>
                )}
                {!t.featured && (
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/50">{t.tag}</p>
                )}
                <h2 className="mt-4 text-4xl md:text-5xl font-display">{t.name}</h2>
                <p className="mt-4 text-6xl font-display text-gold">{t.bottles}</p>
                <p className="mt-1 text-[0.65rem] tracking-[0.3em] uppercase text-cream/60">
                  Bottles per month
                </p>
                <p className="mt-6 text-cream/80">{t.price}</p>

                <div className="hairline my-8" />

                <ul className="space-y-3 flex-1">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-cream/85">
                      <Check size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <button className={`mt-10 ${t.featured ? "btn-gold" : "btn-ghost-gold"} w-full`}>
                  Join {t.name}
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-luxe py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="eyebrow">Refer a friend</p>
              <h2 className="mt-6 text-4xl md:text-6xl font-display leading-[1]">
                Share the <em className="text-gold not-italic">table.</em>
              </h2>
              <p className="mt-6 text-cream/70 leading-relaxed">
                Every friend you welcome to Salt Rock earns you R 100 in store credit —
                and a complimentary bottle after your fifth successful referral.
              </p>
              <Link to="/club" className="btn-ghost-gold mt-10">
                Learn about the program <ArrowRight size={14} />
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "R 100", l: "Store credit per referral" },
                  { n: "5", l: "Referrals for a free bottle" },
                  { n: "∞", l: "Bottles you can earn" },
                  { n: "1", l: "Shared love of good wine" },
                ].map((s) => (
                  <div key={s.l} className="p-6 md:p-8 border border-border bg-card/30">
                    <p className="text-4xl md:text-5xl font-display text-gold">{s.n}</p>
                    <p className="mt-3 text-[0.65rem] tracking-[0.3em] uppercase text-cream/60">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
