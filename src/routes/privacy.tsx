import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Salt Rock Winery" },
      { name: "description", content: "How Salt Rock Winery handles your personal information." },
      { property: "og:title", content: "Privacy — Salt Rock Winery" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container-luxe max-w-3xl">
          <Reveal><p className="eyebrow">Privacy Policy</p></Reveal>
          <Reveal delay={0.1}><h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">Your privacy, <em className="text-gold not-italic">respected.</em></h1></Reveal>
          <div className="mt-10 space-y-6 text-cream/80 leading-[1.9]">
            <p>Salt Rock Winery collects only the information required to fulfil your order and communicate with you — name, delivery address, email and order history. We do not sell or share your details with third parties beyond the couriers and payment processors required to complete your purchase.</p>
            <p>You may request a copy or deletion of your personal information at any time by emailing <a href="mailto:hello@saltrockwines.com" className="text-gold link-underline">hello@saltrockwines.com</a>.</p>
            <p className="text-sm text-cream/55">This page is maintained by Salt Rock Winery as a summary of practices. For full legal terms please contact us.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
