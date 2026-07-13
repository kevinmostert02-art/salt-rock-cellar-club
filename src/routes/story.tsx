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
import bottleImg from "@/assets/bottles/Stand_Alone_Pinot_Noir.jpg.asset.json";
const bottleImgUrl = bottleImg.url;

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

        <section className="container-luxe py-24 md:py-32 max-w-3xl">
          <Reveal>
            <p className="text-xl md:text-2xl font-display italic text-cream/85 leading-[1.6]">
              Salt Rock Wines is a collaboration between two nomads in the South African wine industry —
              both passionate about revealing the intricate connection between climate and terroir in
              the sundrenched vineyards of Stellenbosch.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg text-cream/70 leading-[1.9]">
              Our wines are serious enough to intrigue the wine aficionado, yet approachable and pleasing
              for the first-time wine drinker. Every bottle is a small honest record of a specific vintage,
              a specific site, and the season it survived.
            </p>
          </Reveal>
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
