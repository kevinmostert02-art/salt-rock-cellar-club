import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Minus, Trash2, Lock, Truck, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const shipping = subtotal >= 750 ? 0 : subtotal > 0 ? 95 : 0;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-charcoal/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed top-0 right-0 z-[81] h-dvh w-full sm:w-[440px] bg-charcoal border-l border-white/10 flex flex-col"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <p className="eyebrow">Your cellar</p>
                <h2 className="mt-1 text-2xl font-display">Cart · {count}</h2>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors">
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {detailed.length === 0 ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl">Your cellar is empty.</p>
                    <p className="mt-2 text-sm text-cream/60">Discover the collection to begin.</p>
                    <Link to="/wines" onClick={() => setOpen(false)} className="btn-gold mt-8 inline-flex">Shop wines</Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-5">
                  {detailed.map((i) => (
                    <li key={i.slug} className="flex gap-4 pb-5 border-b border-white/8">
                      <Link to="/w/$slug" params={{ slug: i.slug }} onClick={() => setOpen(false)} className="w-20 aspect-[3/4] bg-burgundy-deep/40 grid place-items-center flex-shrink-0">
                        <img src={i.wine.image} alt={i.wine.name} className="h-full w-full object-contain p-2" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.55rem] tracking-[0.28em] uppercase text-cream/55">{i.wine.range}</p>
                        <Link to="/w/$slug" params={{ slug: i.slug }} onClick={() => setOpen(false)} className="mt-1 block font-display text-lg leading-tight hover:text-gold transition-colors truncate">
                          {i.wine.name}
                        </Link>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-white/15 rounded-full">
                            <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Decrease" className="w-8 h-8 grid place-items-center hover:text-gold transition-colors"><Minus size={12} /></button>
                            <span className="w-6 text-center text-sm">{i.qty}</span>
                            <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Increase" className="w-8 h-8 grid place-items-center hover:text-gold transition-colors"><Plus size={12} /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gold font-display text-lg">R {i.wine.price * i.qty}</span>
                            <button onClick={() => remove(i.slug)} aria-label="Remove" className="text-cream/50 hover:text-destructive transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detailed.length > 0 && (
              <footer className="border-t border-white/8 px-6 py-6 space-y-4">
                <div className="text-sm flex justify-between text-cream/70">
                  <span>Subtotal</span><span className="text-cream">R {subtotal}</span>
                </div>
                <div className="text-sm flex justify-between text-cream/70">
                  <span>Shipping · nationwide</span>
                  <span className="text-cream">{shipping === 0 ? "Complimentary" : `R ${shipping}`}</span>
                </div>
                {subtotal < 750 && (
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/80">
                    R {750 - subtotal} away from complimentary shipping
                  </p>
                )}
                <div className="pt-3 border-t border-white/8 flex justify-between items-end">
                  <span className="text-[0.65rem] tracking-[0.28em] uppercase text-cream/55">Total</span>
                  <span className="text-3xl font-display text-gradient-gold">R {total}</span>
                </div>
                <button className="btn-gold btn-shimmer w-full">Secure Checkout</button>
                <div className="pt-2 grid grid-cols-3 gap-2 text-[0.55rem] tracking-[0.22em] uppercase text-cream/50">
                  <span className="flex items-center gap-1.5"><Lock size={11} /> Encrypted</span>
                  <span className="flex items-center gap-1.5"><Truck size={11} /> 2–4 days</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> Guaranteed</span>
                </div>
                <p className="text-[0.6rem] text-cream/40 text-center">Checkout demo — no payment is processed.</p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
