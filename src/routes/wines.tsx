import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WineCard } from "@/components/wine-card";
import { Reveal } from "@/components/reveal";
import { wines, type WineType } from "@/lib/wines";

export const Route = createFileRoute("/wines")({
  head: () => ({
    meta: [
      { title: "The Cellar — Salt Rock Wines" },
      { name: "description", content: "Explore the full Salt Rock Wines collection: Climate, Lifestyle and Stand Alone ranges from Stellenbosch, South Africa." },
      { property: "og:title", content: "The Cellar — Salt Rock Wines" },
      { property: "og:description", content: "Every Salt Rock bottle, filterable by type, range, occasion and price." },
    ],
  }),
  component: WinesPage,
});

const TYPES: (WineType | "All")[] = ["All", "Red", "White", "Rosé", "Sparkling", "Dessert"];
const RANGES = ["All Ranges", "Climate", "Lifestyle", "Stand Alone"] as const;

function WinesPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [range, setRange] = useState<(typeof RANGES)[number]>("All Ranges");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    let list = wines.filter((w) => {
      if (type !== "All" && w.type !== type) return false;
      if (range !== "All Ranges" && w.range !== range) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [type, range, sort]);

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe pb-16">
          <Reveal><p className="eyebrow">The Cellar</p></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1] max-w-3xl">
              Every bottle we make, <em className="text-gold not-italic">quietly gathered.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-cream/70 leading-relaxed">
              Three ranges. One shared obsession with site, restraint and time.
            </p>
          </Reveal>
        </section>

        <section>
          <div className="glass-strong border-y border-white/8">
            <div className="container-luxe py-5 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mr-2">Type</span>
                {TYPES.map((t) => (
                  <button key={t} onClick={() => setType(t)} data-active={type === t} className="pill-filter">
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mr-2">Range</span>
                {RANGES.map((r) => (
                  <button key={r} onClick={() => setRange(r)} data-active={range === r} className="pill-filter">
                    {r}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="bg-transparent border border-white/15 text-[0.65rem] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full focus:border-gold focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price · Low to High</option>
                  <option value="price-desc">Price · High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="container-luxe py-16 md:py-24">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground mb-8">
            Showing {filtered.length} of {wines.length} wines
          </p>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((w, i) => (
              <WineCard key={w.slug} wine={w} index={i} />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <p className="text-center py-24 text-cream/60 font-display text-2xl">
              No wines match this pairing. Try broadening your filters.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
