import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";

import heroImg from "@/assets/hero-vineyard.jpg";
import cellarImg from "@/assets/story-cellar.jpg";
import harvestImg from "@/assets/story-harvest.jpg";
import pairingImg from "@/assets/pairing.jpg";
import bottleAsset from "@/assets/bottles/Stand_Alone_Pinot_Noir.jpg.asset.json";
import founder1Asset from "@/assets/team/founder-1.jpg.asset.json";
import founder2Asset from "@/assets/team/founder-2.jpg.asset.json";
import standAloneAsset from "@/assets/ranges/stand-alone-range.png.asset.json";
import climateAsset from "@/assets/ranges/climate-range.jpg.asset.json";
import lifestyleAsset from "@/assets/ranges/lifestyle-range.png.asset.json";
const bottleImg = bottleAsset.url;

const founders = [
  {
    img: founder1Asset.url,
    role: "Co-Founder · Winemaker",
    name: "The Winemaker",
    bio: "A restless nomad of the Cape wine industry, chasing single vineyards from Elgin to the Hemel-en-Aarde Ridge in pursuit of wines that speak honestly of their season.",
  },
  {
    img: founder2Asset.url,
    role: "Co-Founder · Viticulturist",
    name: "The Grower",
    bio: "Guardian of the vines. Decades spent reading the soils and skies of Stellenbosch, coaxing balance from bush vines that others have long overlooked.",
  },
];

const ranges = [
  {
    img: standAloneAsset.url,
    name: "Stand Alone",
    body: "Our Stand Alone wines are all about reflecting the best possible version of what South Africa can give — single vineyards from the most bespoke slopes and regions for each variety, produced with minimal intervention and aged in a variety of vessels. Pinot Noir from the Hemel-en-Aarde Ridge, Chardonnay from Elgin and Chenin Blanc from Helderberg Stellenbosch.",
  },
  {
    img: climateAsset.url,
    name: "Climate",
    body: "Our Climate wines have been crafted to create awareness of two climate phenomena the world has been experiencing in recent years: El Niño and La Niña. Serious enough to intrigue the wine geek, yet approachable for the first-time drinker — built on two unconventional varieties, Cinsault and Semillon Gris, from single vineyards that truly reflect the variety in a specific terroir.",
  },
  {
    img: lifestyleAsset.url,
    name: "Lifestyle",
    body: "Our Lifestyle wines are produced from special pockets around the greater Stellenbosch wine route to express the uniqueness of the region. These wines are distinct and truly reflect the terroir in each variety — and, as with every Salt Rock bottling, our winemaking approach remains minimal.",
  },
];

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Salt Rock Wines" },
      { name: "description", content: "From vineyard to bottling: the six chapters behind every Salt Rock wine." },
      { property: "og:title", content: "Our Story — Salt Rock Wines" },
      { property: "og:description", content: "A collaboration between two nomads of the South African wine industry." },
    ],
  }),
  component: StoryPage,
});

const chapters = [
  { n: "01", title: "The Vineyard", img: heroImg, body: "Handpicked sites across Stellenbosch — each chosen for what it can say about a single variety when the season is right." },
  { n: "02", title: "The Harvest", img: harvestImg, body: "Bunch by bunch, at first light. We pick when the fruit is ready, not when the calendar demands it." },
  { n: "03", title: "Fermentation", img: bottleImg, body: "Wild and considered. We intervene as little as the vintage will allow, so the site speaks through the glass." },
  { n: "04", title: "Barrel Ageing", img: cellarImg, body: "Time in old and new French oak — enough to add spine and shadow, never enough to hide the fruit." },
  { n: "05", title: "Bottling", img: bottleImg, body: "Small batches. Individually numbered ranges. Each bottle a quiet record of a specific season." },
  { n: "06", title: "The Table", img: pairingImg, body: "The final chapter isn't ours — it's yours. Poured slowly, shared generously, remembered fondly." },
];

function StoryPage() {
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav />
      <main>
        <section className="relative h-[80svh] min-h-[500px] overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" width={1920} height={1280} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero-veil)" }} />
          <div className="relative z-10 h-full container-luxe flex flex-col justify-end pb-20 md:pb-28">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="eyebrow">
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-6 text-5xl md:text-8xl font-display max-w-4xl leading-[1]"
            >
              Two nomads.<br />
              <em className="text-gold not-italic">One shared obsession.</em>
            </motion.h1>
          </div>
        </section>

        {/* Founders */}
        <section className="border-b border-border">
          <div className="container-luxe py-20 md:py-32">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              {founders.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.12}>
                  <figure className="group">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden rounded-full bg-charcoal/50 ring-1 ring-cream/10 shadow-2xl">
                      <img
                        src={f.img}
                        alt={f.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                      />
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Winemaking Journey */}
        <section className="container-luxe py-24 md:py-32 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Our Winemaking Journey</p>
            <h2 className="mt-6 text-4xl md:text-6xl font-display leading-[1]">
              A collaboration <em className="text-gold not-italic">poured slowly</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-xl md:text-2xl font-display italic text-cream/85 leading-[1.6]">
              Two nomads in the South African wine industry came together to collaborate and
              express themselves in ways that the day-to-day hustle wouldn't allow.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-cream/70 leading-[1.9]">
              Through Salt Rock Wines, we aim to create awareness of the effect of two climate
              phenomena the world has been experiencing in the past few years: El Niño and La Niña.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-lg text-cream/70 leading-[1.9]">
              The wines we produce are suitable for consumption all year round — serious enough
              to intrigue the wine aficionado, yet approachable and pleasing for the first-time
              wine drinker.
            </p>
          </Reveal>
        </section>

        {/* Ranges */}
        <section className="border-t border-border bg-charcoal/60">
          <div className="container-luxe py-24 md:py-32">
            <div className="max-w-2xl">
              <Reveal>
                <p className="eyebrow">The Ranges</p>
                <h2 className="mt-6 text-4xl md:text-6xl font-display leading-[1]">
                  Three <em className="text-gold not-italic">expressions</em>. One philosophy.
                </h2>
              </Reveal>
            </div>

            <div className="mt-16 md:mt-24 space-y-24 md:space-y-32">
              {ranges.map((r, i) => (
                <div
                  key={r.name}
                  className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
                    i % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <div className="md:col-span-6 relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-cream/95 flex items-center justify-center p-8 md:p-14">
                      <img
                        src={r.img}
                        alt={`${r.name} Range`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="md:col-span-6">
                      <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold">
                        Range · 0{i + 1}
                      </p>
                      <h3 className="mt-4 text-4xl md:text-6xl font-display leading-[1]">
                        {r.name}
                      </h3>
                      <p className="mt-6 text-lg text-cream/75 leading-[1.9]">{r.body}</p>
                      <Link
                        to="/wines"
                        className="mt-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.35em] uppercase text-gold link-underline"
                      >
                        Explore the range <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>


        {chapters.map((c, i) => (
          <section key={c.n} className="border-t border-border">
            <div className={`container-luxe py-20 md:py-32 grid md:grid-cols-12 gap-10 md:gap-16 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div className="md:col-span-7 relative aspect-[5/4] overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="md:col-span-5">
                  <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold">Chapter {c.n}</p>
                  <h2 className="mt-4 text-4xl md:text-6xl font-display leading-[1]">{c.title}</h2>
                  <p className="mt-6 text-lg text-cream/75 leading-[1.9]">{c.body}</p>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="border-t border-border py-24 md:py-32 text-center">
          <div className="container-luxe">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-display max-w-2xl mx-auto leading-[1.05]">
                Come <em className="text-gold not-italic">taste</em> what we mean.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap gap-4 justify-center">
                <Link to="/wines" className="btn-gold">Explore the cellar <ArrowRight size={14} /></Link>
                <Link to="/club" className="btn-ghost-gold">Join the club</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
