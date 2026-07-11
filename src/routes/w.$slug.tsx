import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
      <div className="flex justify-between text-[0.6rem] tracking-[0.3em] uppercase text-cream/60 mb-2">
        <span>{min}</span>
        <span className="text-gold">{label}</span>
        <span>{max}</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`h-1 flex-1 ${i <= level ? "bg-gold" : "bg-cream/10"}`} />
        ))}
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

      <main className="pt-28">
        <div className="container-luxe">
          <Link to="/wines" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase text-cream/60 hover:text-gold transition-colors">
            <ArrowLeft size={14} /> The Cellar
          </Link>
        </div>

        <section className="container-luxe grid md:grid-cols-2 gap-12 md:gap-20 py-12 md:py-20 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] bg-gradient-to-b from-burgundy-deep to-charcoal border border-border overflow-hidden">
              <img
                src={wine.image}
                alt={wine.name}
                width={800}
                height={1200}
                className="absolute inset-0 h-full w-full object-contain p-10"
              />
              {wine.isPlaceholderImage && (
                <span className="absolute bottom-4 left-4 text-[0.55rem] tracking-[0.25em] uppercase text-gold/70 bg-charcoal/70 border border-gold/30 px-2 py-1">
                  Placeholder — replace with official bottle
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">{wine.range} · {wine.vintage}</p>
            <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">{wine.name}</h1>
            <p className="mt-2 text-lg text-cream/70 font-display italic">{wine.varietal}</p>

            {wine.awards && wine.awards.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {wine.awards.map((a: string) => (
                  <span key={a} className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-gold border border-gold/40 px-3 py-1.5">
                    <Award size={12} /> {a}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-8 text-lg leading-[1.8] text-cream/85">{wine.tasting}</p>
            <p className="mt-4 text-base leading-[1.9] text-cream/70">{wine.longDescription}</p>

            <div className="mt-10 space-y-6">
              <Meter level={wine.body} label="Body" min="Light" max="Full" />
              <Meter level={wine.sweetness} label="Sweetness" min="Dry" max="Sweet" />
              <div className="flex items-center gap-3 text-sm text-cream/80">
                <Thermometer size={16} className="text-gold" />
                <span className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/60">Serve at</span>
                <span>{wine.servingTemp}</span>
              </div>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">Pairs beautifully with</p>
              <div className="flex flex-wrap gap-2">
                {wine.pairings.map((p: string) => (
                  <span key={p} className="text-sm px-4 py-2 border border-border bg-card/40">{p}</span>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-6">
              <div>
                <p className="text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">Price per bottle</p>
                <p className="text-4xl font-display text-gold mt-1">R {wine.price}</p>
              </div>
              <div className="flex-1 flex flex-wrap gap-3 justify-end">
                <button className="btn-gold">Add to cart</button>
                <button className="btn-ghost-gold">Quick buy</button>
                <button className="w-12 h-12 border border-border grid place-items-center hover:border-gold hover:text-gold transition-colors" aria-label="Share">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </Reveal>
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
