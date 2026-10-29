import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns — Salt Rock Wines" },
      { name: "description", content: "The Salt Rock guarantee — if a bottle isn't perfect, we'll make it right." },
      { property: "og:title", content: "Returns — Salt Rock Wines" },
      { property: "og:url", content: "/returns" },
    ],
    links: [{ rel: "canonical", href: "/returns" }],
  }),
  component: () => (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container-luxe max-w-3xl prose-none">
          <Reveal><p className="eyebrow">Returns</p></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">The Salt Rock <em className="text-gold not-italic">guarantee.</em></h1>
          </Reveal>
          <div className="mt-10 space-y-6 text-cream/80 leading-[1.9]">
            <p>If a bottle arrives damaged, corked, or not as described, we replace it — no questions asked. Simply email <a href="mailto:hello@saltrockwines.com" className="text-gold link-underline">hello@saltrockwines.com</a> within 14 days of delivery with a photo of the bottle and we'll organise a replacement or refund.</p>
            <p>Unopened, undamaged bottles may be returned within 14 days for a full refund of the wine cost. Return shipping is at the customer's expense unless the return is due to our error.</p>
          </div>
          <div className="mt-16"><Link to="/contact" className="btn-gold">Contact us</Link></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
