import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { WineCard } from "@/components/wine-card";
import { wineBySlug, wines } from "@/lib/wines";
import { Award, Thermometer, ArrowLeft, Share2 } from "lucide-react";

export const Route = createFileRoute("/w/$slug")({
  loader: ({ params }) => {
    const wine = wineBySlug(params.slug);
    if (!wine) throw notFound();
    return { wine };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Wine not found" }, { name: "robots", content: "noindex" }] };
    }
    const w = loaderData.wine;
    return {
      meta: [
        { title: `${w.name} ${w.vintage} — Salt Rock Wines` },
        { name: "description", content: w.tasting },
        { property: "og:title", content: `${w.name} ${w.vintage}` },
        { property: "og:description", content: w.tasting },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: WinePage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-charcoal text-cream">
      <div className="text-center">
        <p className="eyebrow">Not in the cellar</p>
        <h1 className="mt-4 text-4xl font-display">This bottle isn't here</h1>
        <Link to="/wines" className="btn-gold mt-8">Browse the cellar</Link>
      </div>
    </div>
  ),
});

function Meter({ level, label, min, max }: { level: number; label: string; min: string; max: string }) {
  return (
    <div>
      <div className="flex justify-between text-[0.58rem] tracking-[0.32em] uppercase text-cream/55 mb-2.5">
        <span>{min}</span>
        <span className="text-gold tracking-[0.28em]">{label}</span>
        <span>{max}</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className={`h-[3px] flex-1 rounded-full origin-left ${i <= level ? "bg-gold" : "bg-cream/10"}`}
          />
        ))}
      </div>
    </div>
  );
}

function CellarTimeline({ vintage }: { vintage: string }) {
  const year = Number.parseInt(vintage, 10);
  const stages = Number.isFinite(year)
    ? [
        { year: `${year}`, label: "Harvest" },
        { year: `${year + 1}`, label: "Release" },
        { year: `${year + 3}`, label: "Peak" },
        { year: `${year + 7}+`, label: "Cellar plus" },
      ]
    : [
        { year: "Now", label: "Ready" },
        { year: "+2", label: "Enjoy" },
        { year: "+4", label: "Peak" },
        { year: "+7", label: "Cellar plus" },
      ];
  return (
    <div>
      <p className="eyebrow mb-8">Cellar Ageing</p>
      <div className="relative">
        <div className="absolute top-[6px] left-2 right-2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="grid grid-cols-4 gap-2">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <span className={`inline-block h-3 w-3 rounded-full ${i === 1 ? "bg-gold shadow-[0_0_16px_3px_oklch(0.76_0.14_85_/_0.6)]" : "bg-cream/25"}`} />
              <p className="mt-4 text-lg md:text-xl font-display text-cream">{s.year}</p>
              <p className="mt-1 text-[0.55rem] tracking-[0.28em] uppercase text-cream/55">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WinePage() {
  const { wine } = Route.useLoaderData();
  const related = wines.filter((w) => w.slug !== wine.slug && w.type === wine.type).slice(0, 3);

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />

      <main className="pt-32">
        <div className="container-luxe">
          <Link to="/wines" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-cream/60 hover:text-gold transition-colors">
            <ArrowLeft size={13} /> The Cellar
          </Link>
        </div>

        <section className="container-luxe grid md:grid-cols-2 gap-12 md:gap-20 py-12 md:py-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[70%] w-[70%] rounded-full bg-gold/20 blur-[100px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[70%] rounded-full bg-burgundy/40 blur-[80px]" />
              </div>
              <div className="bottle-glow relative aspect-[3/4] grid place-items-center">
                <img
                  src={wine.image}
                  alt={wine.name}
                  width={800}
                  height={1200}
                  className="relative h-full w-full object-contain p-6 md:p-10 animate-bottle-float"
                />
              </div>
              {wine.isPlaceholderImage && (
                <span className="mt-4 inline-block text-[0.5rem] tracking-[0.3em] uppercase text-gold/70 border border-gold/30 px-2 py-1 rounded-full">
                  Placeholder — official bottle coming soon
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">{wine.range} · {wine.vintage}</p>
            <h1 className="mt-6 text-5xl md:text-[4.5rem] font-display leading-[0.98] tracking-[-0.02em]">{wine.name}</h1>
            <p className="mt-3 text-lg text-cream/65 font-display italic">{wine.varietal}</p>

            {wine.awards && wine.awards.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {wine.awards.map((a: string) => (
                  <span key={a} className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.28em] uppercase text-gold border border-gold/40 px-3 py-1.5 rounded-full">
                    <Award size={12} /> {a}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-8 text-lg leading-[1.8] text-cream/85 font-display italic">"{wine.tasting}"</p>
            <p className="mt-5 text-[0.95rem] leading-[1.9] text-cream/70">{wine.longDescription}</p>

            <div className="mt-10 space-y-6">
              <Meter level={wine.body} label="Body" min="Light" max="Full" />
              <Meter level={wine.sweetness} label="Sweetness" min="Dry" max="Sweet" />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="glass p-5">
                <div className="flex items-center gap-2 text-[0.55rem] tracking-[0.3em] uppercase text-cream/55">
                  <Thermometer size={12} className="text-gold" /> Serve at
                </div>
                <p className="mt-2 text-xl font-display text-cream">{wine.servingTemp}</p>
              </div>
              <div className="glass p-5">
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-cream/55">Best enjoyed</p>
                <p className="mt-2 text-xl font-display text-cream capitalize">{wine.occasions[0] ?? "Anytime"}</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">Pairs beautifully with</p>
              <div className="flex flex-wrap gap-2">
                {wine.pairings.map((p: string, i: number) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="text-sm px-4 py-2 glass rounded-full"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/8 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">Price per bottle</p>
                <p className="text-5xl font-display text-gradient-gold mt-2 leading-none">R {wine.price}</p>
              </div>
              <div className="flex-1 flex flex-wrap gap-3 justify-end">
                <button className="btn-gold">Add to cart</button>
                <button className="btn-ghost-gold">Quick buy</button>
                <button className="w-12 h-12 border border-white/15 rounded-full grid place-items-center hover:border-gold hover:text-gold transition-colors" aria-label="Share">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-luxe py-16 md:py-24">
          <div className="glass p-8 md:p-12">
            <CellarTimeline vintage={wine.vintage} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="container-luxe py-24 md:py-32">
            <Reveal><p className="eyebrow">If you love this</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-3xl md:text-5xl font-display">
                You may also <em className="text-gold not-italic">pour</em>…
              </h2>
            </Reveal>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((w, i) => <WineCard key={w.slug} wine={w} index={i} />)}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
