import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import heroImg from "@/assets/hero-vineyard.jpg";
import cellarImg from "@/assets/story-cellar.jpg";
import harvestImg from "@/assets/story-harvest.jpg";
import pairingImg from "@/assets/pairing.jpg";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "The Salt Rock Guide — Wine Education" },
      { name: "description", content: "Choose, pair, serve and store wine like a sommelier. A quiet field guide to enjoying South African wine at its best." },
      { property: "og:title", content: "The Salt Rock Guide" },
      { property: "og:description", content: "How to choose, pair, serve and store wine — a luxury magazine-style guide from Salt Rock Winery." },
      { property: "og:url", content: "/guide" },
    ],
    links: [{ rel: "canonical", href: "/guide" }],
  }),
  component: GuidePage,
});

const chapters = [
  {
    kicker: "Chapter I",
    title: "How to Choose Wine",
    img: heroImg,
    body: "Begin with the occasion, then the table. A quiet weeknight calls for something bright and unencumbered — our Lifestyle Chenin or Sauvignon Blanc. A slow dinner invites structure: the Stand Alone Pinot Noir or Chardonnay. Choose the mood first; the bottle follows.",
    tips: ["Match weight of wine to weight of food", "Cooler climates give brighter acidity", "Trust the winemaker's own notes"],
  },
  {
    kicker: "Chapter II",
    title: "The Pairing Guide",
    img: pairingImg,
    body: "Great pairing isn't a rulebook — it's a conversation between what's in the glass and what's on the plate. Fat loves acidity. Spice softens under a whisper of residual sugar. Umami and tannin sing when the wine has real bones.",
    tips: ["Chenin Blanc with roast chicken, thyme, lemon", "Cinsault (chilled) with charcuterie & summer stews", "Cape Red blends with the fire — braai wine, always"],
  },
  {
    kicker: "Chapter III",
    title: "Serving Temperature",
    img: cellarImg,
    body: "Temperature transforms a wine. Too cold and the aromatics disappear; too warm and the alcohol shouts. Ten minutes out of the fridge for whites; a brief chill for reds in the height of summer. Your wine should feel cool to the touch — never cold.",
    tips: ["Whites: 8–12°C", "Rosé & light reds: 12–14°C", "Full reds: 16–18°C — never above"],
  },
  {
    kicker: "Chapter IV",
    title: "Cellaring & Storage",
    img: harvestImg,
    body: "Wine wants stillness, darkness and a steady cool. A cupboard away from the kitchen is often enough. Store bottles on their side to keep the cork moist, and avoid rooms that swing more than a few degrees across the day.",
    tips: ["Ideal cellar: 12–14°C, 60–70% humidity", "Away from direct light and vibration", "Lifestyle range: drink within 2 years"],
  },
  {
    kicker: "Chapter V",
    title: "South African Wine Regions",
    img: heroImg,
    body: "Every Salt Rock bottle carries a place. Stellenbosch's Helderberg gives our Chenins their granite tension. Elgin's cool mountain vineyards lend Chardonnay a Burgundian finesse. The Hemel en Aarde ridge, cooled by Atlantic breath, is where our Pinot Noir was always going to be born.",
    tips: ["Helderberg — bush-vine Chenin, Cinsault", "Elgin — cool-climate Chardonnay", "Hemel en Aarde — Pinot Noir"],
  },
];

function GuidePage() {
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40">
        <section className="container-luxe pb-16">
          <Reveal><p className="eyebrow">The Salt Rock Guide</p></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1] max-w-3xl">
              A quiet field guide to <em className="text-gold not-italic">enjoying wine.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-cream/70 leading-relaxed">
              Five short chapters on how to choose, pair, serve and cellar the wines that end up on your table.
            </p>
          </Reveal>
        </section>

        {chapters.map((c, i) => (
          <section key={c.title} className="py-24 md:py-32 border-t border-white/6">
            <div className={`container-luxe grid md:grid-cols-12 gap-12 md:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="md:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                  <p className="absolute top-6 left-6 eyebrow">{c.kicker}</p>
                </div>
              </Reveal>
              <div className="md:col-span-7">
                <Reveal>
                  <p className="eyebrow">{c.kicker}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-6 text-4xl md:text-6xl font-display leading-[1.05]">{c.title}</h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-8 text-lg text-cream/80 leading-[1.9] font-display italic">{c.body}</p>
                </Reveal>
                <Reveal delay={0.3}>
                  <ul className="mt-10 space-y-3">
                    {c.tips.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-cream/75">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
