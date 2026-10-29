import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ExternalLink, MapPin, Utensils, Wine } from "lucide-react";

type Stockist = { name: string; region?: string; url?: string; note?: string };

const distributors: Stockist[] = [
  { name: "Pangea Selections", region: "National · Importer", url: "https://pangeaselections.com" },
  { name: "Nekter Wines", region: "Wine Importers", url: "https://nekterwines.com" },
  { name: "The Vineyard Connection", region: "Stellenbosch", url: "https://vineyardconnection.co.za" },
  { name: "Dry Dock Liquor", region: "Purveyors of Local & Imported Liquor", url: "https://drydock.co.za" },
  { name: "Wine Concepts", region: "Kloof Street, Cape Town", url: "https://wineconcepts.co.za" },
  { name: "Wine Village Hermanus", region: "Hermanus · Since 1998", url: "https://wine-village.co.za" },
  { name: "Wine & Co", region: "The Coolest Wine Shop", url: "https://wineandco.co.za" },
  { name: "Elephants Corner", region: "Wine Merchants", url: "https://elephantscorner.co.za" },
  { name: "NorthEast Wines & Spirits", region: "Wines & Spirits", url: "https://northeastwines.co.za" },
  { name: "BM Wines", region: "Cape Town", url: "https://bmwines.co.za" },
];

const restaurants: Stockist[] = [
  { name: "Boma on Bree", region: "Bree Street, Cape Town", note: "The Firm Hospitality" },
  { name: "Bouchon Bistro & Wine Bar", region: "Cape Town" },
  { name: "Constantia Wine and Craft", region: "Constantia · Est. 2021" },
  { name: "Novo Pizza + Wine", region: "Cape Town" },
  { name: "Publik Wine Bar", region: "Cape Town" },
  { name: "Silk Restaurant", region: "Asian Fusion" },
];

function Card({ s, icon: Icon }: { s: Stockist; icon: typeof Wine }) {
  const inner = (
    <div className="glass h-full p-7 md:p-8 flex flex-col transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold/40">
      <div className="flex items-center justify-between">
        <span className="w-10 h-10 rounded-full border border-gold/30 grid place-items-center text-gold shrink-0">
          <Icon size={16} />
        </span>
        {s.url && (
          <ExternalLink size={14} className="text-cream/40 group-hover:text-gold transition-colors" />
        )}
      </div>
      <h3 className="mt-5 text-xl md:text-2xl font-display leading-tight text-cream">
        {s.name}
      </h3>
      {s.region && (
        <p className="mt-2 text-[0.7rem] tracking-[0.25em] uppercase text-cream/55 flex items-center gap-2">
          <MapPin size={11} className="text-gold/70 shrink-0" /> {s.region}
        </p>
      )}
      {s.note && <p className="mt-3 text-sm text-cream/60 italic">{s.note}</p>}
      {s.url && (
        <span className="mt-6 pt-6 border-t border-white/8 text-[0.65rem] tracking-[0.3em] uppercase text-gold/90 group-hover:text-gold transition-colors">
          Visit website →
        </span>
      )}
    </div>
  );
  return s.url ? (
    <a href={s.url} target="_blank" rel="noreferrer" className="group block h-full">
      {inner}
    </a>
  ) : (
    <div className="group block h-full">{inner}</div>
  );
}

function Section({
  eyebrow,
  title,
  lede,
  items,
  icon,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  items: Stockist[];
  icon: typeof Wine;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <div className="max-w-2xl">
          <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05]">{title}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base md:text-lg text-cream/70 leading-relaxed">{lede}</p>
          </Reveal>
        </div>
        <div className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.name} delay={0.05 * i}>
              <Card s={s} icon={icon} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/stockists")({
  head: () => ({
    meta: [
      { title: "Stockists & Distributors — Salt Rock Wines" },
      { name: "description", content: "Find Salt Rock Wines at leading South African distributors, wine merchants and restaurants — from Cape Town to Hermanus." },
      { property: "og:title", content: "Where to find Salt Rock Wines" },
      { property: "og:description", content: "Our distributors, wine merchants and restaurant partners across South Africa." },
    ],
    links: [{ rel: "canonical", href: "/stockists" }],
  }),
  component: StockistsPage,
});

function StockistsPage() {
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-8 md:pb-12 relative overflow-hidden">
          <div className="absolute inset-0 aurora opacity-40 pointer-events-none" />
          <div className="container-luxe relative">
            <Reveal><p className="eyebrow">Where to find us</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[1] max-w-4xl">
                Stockists <em className="text-gradient-gold not-italic">&amp;</em> Distributors
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-base md:text-lg text-cream/70 leading-relaxed">
                From boutique wine merchants in Cape Town to celebrated restaurants along the coast — a curated network of partners who pour Salt Rock with pride.
              </p>
            </Reveal>
          </div>
        </section>

        <Section
          eyebrow="Our Distributors"
          title={<>Merchants <em className="text-gold not-italic">&amp;</em> Importers</>}
          lede="Purchase Salt Rock Wines through South Africa's leading independent wine merchants and importers."
          items={distributors}
          icon={Wine}
        />

        <div className="container-luxe"><div className="hairline" /></div>

        <Section
          eyebrow="On the Menu"
          title={<>Restaurant <em className="text-gold not-italic">Partners</em></>}
          lede="Enjoy a glass of Salt Rock at these celebrated tables — thoughtfully paired by chefs and sommeliers we admire."
          items={restaurants}
          icon={Utensils}
        />

        {/* Trade CTA */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="container-luxe text-center max-w-2xl">
            <Reveal><p className="eyebrow">Trade Enquiries</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl md:text-5xl font-display">Stock Salt Rock</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-cream/70 leading-relaxed">
                Restaurants, wine bars and merchants — we'd love to hear from you. Reach our trade team for allocations, tastings and wholesale pricing.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="mailto:trade@saltrockwines.com" className="mt-10 btn-gold btn-shimmer inline-flex max-w-full break-all text-center">
                trade@saltrockwines.com
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
