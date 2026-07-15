import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { wines, type Wine } from "@/lib/wines";

export interface CartItem {
  slug: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  detailed: Array<CartItem & { wine: Wine }>;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "sr-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const add: CartCtx["add"] = (slug, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.slug === slug);
      if (idx === -1) return [...prev, { slug, qty }];
      const next = [...prev];
      next[idx] = { slug, qty: next[idx].qty + qty };
      return next;
    });
    setOpen(true);
  };
  const remove: CartCtx["remove"] = (slug) => setItems((p) => p.filter((i) => i.slug !== slug));
  const setQty: CartCtx["setQty"] = (slug, qty) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const wine = wines.find((w) => w.slug === i.slug);
      return wine ? { ...i, wine } : null;
    })
    .filter(Boolean) as Array<CartItem & { wine: Wine }>;

  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = detailed.reduce((a, i) => a + i.wine.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, open, setOpen, detailed }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}

const WISH_KEY = "sr-wish-v1";
export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(WISH_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);
  return {
    items,
    has: (slug: string) => items.includes(slug),
    toggle: (slug: string) => setItems((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug])),
  };
}
