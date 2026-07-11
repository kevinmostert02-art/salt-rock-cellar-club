import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/wines", label: "Wines" },
  { to: "/sommelier", label: "Sommelier" },
  { to: "/club", label: "Wine Club" },
  { to: "/story", label: "Story" },
];

export function SiteNav({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-xl md:text-2xl font-display tracking-wide text-cream">
            Salt<span className="text-gold">·</span>Rock
          </span>
          <span className="hidden sm:inline text-[0.6rem] tracking-[0.35em] uppercase text-muted-foreground group-hover:text-gold transition-colors">
            Wines · Stellenbosch
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.72rem] tracking-[0.28em] uppercase text-cream/85 hover:text-gold transition-colors link-underline"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/wines" className="text-[0.72rem] tracking-[0.28em] uppercase text-cream/85 hover:text-gold transition-colors">
            Shop
          </Link>
          <span className="h-4 w-px bg-border" />
          <button className="text-[0.72rem] tracking-[0.28em] uppercase text-cream/85 hover:text-gold transition-colors">
            Cart (0)
          </button>
        </div>

        <button
          className="md:hidden text-cream p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-xl border-t border-border animate-reveal">
          <nav className="container-luxe py-8 flex flex-col gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display text-cream hover:text-gold transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <div className="hairline my-2" />
            <Link to="/wines" onClick={() => setOpen(false)} className="text-[0.72rem] tracking-[0.28em] uppercase text-cream/70">
              Shop the Cellar →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
