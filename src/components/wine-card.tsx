import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import type { Wine } from "@/lib/wines";
import { Award, Thermometer, Plus, Heart, Check } from "lucide-react";
import { useCart, useWishlist } from "@/lib/cart";
import { useState } from "react";

function Meter({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[0.58rem] tracking-[0.22em] uppercase text-cream/55">
      <span className="w-12">{label}</span>
      <div className="flex gap-[3px] flex-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
              i <= level ? "bg-gold" : "bg-cream/12"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function WineCard({ wine, index = 0 }: { wine: Wine; index?: number }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const isWished = has(wine.slug);

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    add(wine.slug, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col glass rounded-[2px] overflow-hidden transition-[border-color,box-shadow] duration-700 hover:border-gold/40 hover:shadow-[0_36px_90px_-30px_oklch(0_0_0_/_0.75),0_0_0_1px_oklch(0.76_0.14_85_/_0.25)]"
    >
      <Link
        to="/w/$slug"
        params={{ slug: wine.slug }}
        className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-charcoal via-burgundy-deep/60 to-charcoal"
      >
        <div className="absolute -inset-8 opacity-60 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] h-40 w-40 rounded-full bg-burgundy/40 blur-3xl animate-aurora" />
          <div className="absolute bottom-[15%] right-[10%] h-32 w-32 rounded-full bg-gold/15 blur-3xl animate-aurora" style={{ animationDelay: "3s" }} />
        </div>

        <div className="bottle-glow absolute inset-0 grid place-items-center">
          <img
            src={wine.image}
            alt={wine.name}
            loading="lazy"
            width={800}
            height={1000}
            className="relative h-full w-full object-contain p-8 md:p-10 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08] group-hover:-translate-y-3 animate-bottle-float"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal to-transparent" />

        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-cream/90 bg-charcoal/60 backdrop-blur px-2.5 py-1 border border-white/10 rounded-full">
            {wine.range}
          </span>
          {wine.awards?.[0] && (
            <span className="flex items-center gap-1.5 text-[0.55rem] tracking-[0.28em] uppercase text-gold bg-charcoal/60 backdrop-blur px-2.5 py-1 border border-gold/30 rounded-full">
              <Award size={9} /> Award
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); toggle(wine.slug); }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full bg-charcoal/60 backdrop-blur border border-white/10 hover:border-gold transition-colors"
        >
          <Heart size={14} className={isWished ? "fill-gold text-gold" : "text-cream/80"} />
        </button>

        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-charcoal bg-gold/95 backdrop-blur px-4 py-1.5 rounded-full">
            Quick view
          </span>
        </div>
      </Link>

      <div className="flex-1 p-6 md:p-7 flex flex-col">
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">
          {wine.type} · {wine.vintage}
        </p>
        <h3 className="mt-2 text-[1.7rem] leading-[1.1] font-display">
          <Link to="/w/$slug" params={{ slug: wine.slug }} className="hover:text-gold transition-colors">
            {wine.name}
          </Link>
        </h3>
        <p className="mt-3 text-[0.9rem] text-cream/65 leading-[1.7] line-clamp-3 min-h-[4.5rem]">
          {wine.tasting}
        </p>

        <div className="mt-5 space-y-2.5">
          <Meter level={wine.body} label="Body" />
          <Meter level={wine.sweetness} label="Sweet" />
          <div className="flex items-center gap-2 text-[0.58rem] tracking-[0.22em] uppercase text-cream/55">
            <span className="w-12 flex items-center gap-1"><Thermometer size={10} /></span>
            <span className="text-cream/75 tracking-[0.15em]">{wine.servingTemp}</span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-white/8 flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.55rem] tracking-[0.28em] uppercase text-muted-foreground">From</p>
            <p className="text-2xl font-display text-gradient-gold leading-none mt-1">R {wine.price}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/w/$slug"
              params={{ slug: wine.slug }}
              className="text-[0.65rem] tracking-[0.25em] uppercase px-3.5 py-2.5 border border-white/15 hover:border-gold hover:text-gold transition-all rounded-full"
            >
              Discover
            </Link>
            <button
              onClick={onAdd}
              aria-label="Add to cart"
              className="relative grid place-items-center w-10 h-10 rounded-full bg-gold text-charcoal hover:shadow-[0_10px_30px_-8px_oklch(0.76_0.14_85_/_0.65)] hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="c" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                    <Check size={16} strokeWidth={2.6} />
                  </motion.span>
                ) : (
                  <motion.span key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Plus size={16} strokeWidth={2.4} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
