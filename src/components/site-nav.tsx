import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import logoImg from "@/assets/saltrock-logo.webp";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/wines", label: "Wines" },
  { to: "/sommelier", label: "Sommelier" },
  { to: "/club", label: "Wine Club" },
  { to: "/guide", label: "Guide" },
  { to: "/stockists", label: "Stockists" },
  { to: "/story", label: "Story" },
];

export function SiteNav({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(transparentOnTop ? y > 40 : true);
      if (y > 160 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden && !open ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-luxe pt-4 md:pt-5 transition-all duration-500">
        <div
          className={`flex h-16 md:h-[68px] items-center justify-between px-4 md:px-7 transition-all duration-500 ${
            scrolled
              ? "glass-strong rounded-full shadow-[0_10px_40px_-10px_oklch(0_0_0_/_0.5)]"
              : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Salt Rock Wines"
              width={40}
              height={40}
              className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="text-xl md:text-[1.35rem] font-display tracking-wide text-cream">
              Salt<span className="text-gold">·</span>Rock
            </span>
            <span className="hidden lg:inline text-[0.55rem] tracking-[0.4em] uppercase text-muted-foreground/80 group-hover:text-gold transition-colors">
              Stellenbosch
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-[0.68rem] tracking-[0.3em] uppercase text-cream/85 hover:text-gold transition-colors link-underline"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-[0.68rem] tracking-[0.3em] uppercase text-cream/85 hover:text-gold transition-colors px-3 py-2"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag size={16} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-charcoal text-[10px] font-semibold grid place-items-center tracking-normal"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden text-cream p-2 -mr-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="md:hidden mx-4 mt-3 glass-strong rounded-3xl overflow-hidden"
          >
            <nav className="p-8 flex flex-col gap-6">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-display text-cream hover:text-gold transition-colors"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="hairline my-2" />
              <Link
                to="/wines"
                onClick={() => setOpen(false)}
                className="text-[0.7rem] tracking-[0.3em] uppercase text-gold"
              >
                Shop the Cellar →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
