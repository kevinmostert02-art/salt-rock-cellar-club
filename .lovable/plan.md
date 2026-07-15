## Salt Rock Wines — Luxury Elevation Pass

Keep every existing layout, route, brand asset, wine data, and color/typography token exactly as-is. This pass is additive polish + a few new sections, no rebuilds.

### 1. Hero (`src/routes/index.tsx`)
- Add mouse-parallax transform on the hero bottle/orbs (motion `useMotionValue` + `useTransform`, throttled).
- Add animated light-ray SVG layer behind the headline (slow drift, low opacity).
- Add gold shimmer sweep on the primary CTA every ~5s (existing `animate-shimmer` keyframe, masked to button).
- Keep existing text reveal, orbs, scroll indicator.

### 2. Wine cards (`src/components/wine-card.tsx`)
- Add heart wishlist icon (local state, no backend) next to the + button.
- Refine hover: stronger lift, animated gold border trace, "Quick view" already present — keep.
- Add-to-cart button: brief check-mark success animation on click.

### 3. Product page (`src/routes/w.$slug.tsx`)
- Add bottle zoom-on-hover (scale + cursor-zoom).
- Add small "Region · Grape · Alcohol · Vintage · Availability" chip strip near title (data already in `wines.ts`).
- Add wishlist + share polish. Keep all existing sections.

### 4. Collection filters (`src/routes/wines.tsx`)
- Add Sweetness (1–5), Body (1–5), and Price range pill filters alongside Type/Range.
- Animate filter transitions with motion `AnimatePresence` + layout.

### 5. New editorial + trust sections on home
- **Trust strip**: 6 animated counters/badges (★ satisfaction, curated wines, nationwide delivery, secure checkout, authentic SA, premium service). Uses motion `useInView` + count-up.
- **Lifestyle storytelling**: 2 alternating editorial bands using existing `hero-vineyard.jpg`, `story-cellar.jpg`, `story-harvest.jpg`, `pairing.jpg` (no new image generation — reuse).
- **Testimonials**: 3 elegant quote cards with 5-star row and customer initials (placeholder names, tasteful).
- **Wine Club teaser**: compact CTA card linking to `/club` with 4 benefit bullets.

### 6. Editorial mini-guide route (`src/routes/guide.tsx`)
- New route: "The Salt Rock Guide" — Choosing Wine, Pairing, Serving, Storage, SA Regions as magazine-style sections. Add nav link.

### 7. Cart drawer (`src/components/cart-drawer.tsx`)
- Lightweight client-only cart (Zustand-free — React context in `src/lib/cart.tsx`, persisted to localStorage behind `useEffect`).
- Slide-in glass drawer with qty controls, subtotal, "Secure checkout" badge row, shipping estimate copy. Wire "Add to cart" buttons on card + product page.
- Nav gets a cart icon with item count.

### 8. Footer (`src/components/site-footer.tsx`)
- Expand into 4 columns: Shop / Experience / Support / Connect. Add payment method badges (SVG inline), shipping/returns/terms/privacy/contact links (stub routes or anchors), Instagram gallery row (6 tiles reusing existing imagery), gold divider.
- Add stub routes: `shipping.tsx`, `returns.tsx`, `terms.tsx`, `privacy.tsx`, `contact.tsx` — each a simple styled page with proper head().

### 9. Micro-interactions & styles (`src/styles.css`)
- Add `.btn-shimmer` utility (gold sweep every 5s).
- Add `.card-breathe` subtle scale keyframe.
- Add `@media (prefers-reduced-motion: reduce)` block disabling floats/shimmers/parallax.
- Ensure focus-visible ring uses gold token on all interactive elements.

### 10. SEO
- Add Organization + WebSite JSON-LD in `__root.tsx`.
- Add Product JSON-LD in `w.$slug.tsx` head() (name, brand, offers/price ZAR, description).
- Add BreadcrumbList JSON-LD on collection + product routes.
- Confirm per-route `og:title`/`og:description` on new pages; add relative canonical.

### 11. Accessibility
- Add `aria-label` to icon-only buttons (wishlist, cart, share).
- Ensure cart drawer uses Radix Dialog (shadcn) for focus trap + Esc.
- Add `alt` audit on all new imagery.

### Out of scope (explicitly not doing)
- No backend/checkout integration (cart is client-only, "Checkout" is a styled placeholder).
- No new AI imagery — reuse existing assets.
- No changes to brand palette, fonts, wine data, or existing routes' architecture.
- No Lighthouse audit run (kept lightweight; lazy-loading + reuse of assets already in place).

### Technical notes
- Cart state: React Context + `useSyncExternalStore`-safe localStorage hydration to avoid SSR mismatch.
- Parallax + counters gated on `prefers-reduced-motion`.
- New route files follow the existing `createFileRoute` + `head()` pattern per tanstack-route-architecture.
