import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Wine } from "@/lib/wines";
import { Award, Thermometer } from "lucide-react";

function Meter({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-cream/60">
      <span className="w-14">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-[3px] w-4 ${i <= level ? "bg-gold" : "bg-cream/15"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function WineCard({ wine, index = 0 }: { wine: Wine; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative flex flex-col bg-card border border-border hover:border-gold/40 transition-all duration-700"
    >
      <Link
        to="/w/$slug"
        params={{ slug: wine.slug }}
        className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-charcoal to-burgundy-deep"
      >
        <img
          src={wine.image}
          alt={wine.name}
          loading="lazy"
          width={800}
          height={1000}
          className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span className="eyebrow !text-[0.6rem] bg-charcoal/60 backdrop-blur px-2.5 py-1 border border-border">
            {wine.range}
          </span>
          {wine.awards?.[0] && (
            <span className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-gold bg-charcoal/60 backdrop-blur px-2.5 py-1 border border-gold/30">
              <Award size={10} /> Award
            </span>
          )}
        </div>
      </Link>

      <div className="flex-1 p-6 md:p-8 flex flex-col">
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
          {wine.type} · {wine.vintage}
        </p>
        <h3 className="mt-2 text-2xl font-display leading-tight">
          <Link to="/w/$slug" params={{ slug: wine.slug }} className="hover:text-gold transition-colors">
            {wine.name}
          </Link>
        </h3>
        <p className="mt-4 text-sm text-cream/70 leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {wine.tasting}
        </p>

        <div className="mt-6 space-y-2">
          <Meter level={wine.body} label="Body" />
          <Meter level={wine.sweetness} label="Sweet" />
          <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-cream/60">
            <span className="w-14 flex items-center gap-1"><Thermometer size={10} /></span>
            <span className="text-cream/80">{wine.servingTemp}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {wine.pairings.slice(0, 3).map((p) => (
            <span key={p} className="text-[0.65rem] tracking-wide uppercase px-2 py-1 border border-border text-cream/70">
              {p}
            </span>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">From</p>
            <p className="text-xl font-display text-gold">R {wine.price}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/w/$slug"
              params={{ slug: wine.slug }}
              className="text-[0.7rem] tracking-[0.22em] uppercase px-4 py-3 border border-border hover:border-gold hover:text-gold transition-colors"
            >
              Discover
            </Link>
            <button className="text-[0.7rem] tracking-[0.22em] uppercase px-4 py-3 bg-gold text-charcoal hover:bg-gold-soft transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
