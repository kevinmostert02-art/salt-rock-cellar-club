import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Salt Rock Wines" },
      { name: "description", content: "Get in touch with Salt Rock Wines — cellar visits, corporate gifting and general enquiries." },
      { property: "og:title", content: "Contact — Salt Rock Wines" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container-luxe grid md:grid-cols-2 gap-16">
          <div>
            <Reveal><p className="eyebrow">Contact</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1]">We'd love to <em className="text-gold not-italic">hear from you.</em></h1>
            </Reveal>
            <div className="mt-10 space-y-6 text-cream/80">
              <p className="flex items-center gap-3"><Mail size={16} className="text-gold" /> <a href="mailto:hello@saltrockwines.com" className="link-underline">hello@saltrockwines.com</a></p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-gold" /> +27 (0)21 000 0000</p>
              <p className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> Stellenbosch, Western Cape</p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass p-8 md:p-10 space-y-5">
            <div>
              <label className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/60">Name</label>
              <input required className="mt-2 w-full bg-transparent border border-white/15 px-4 py-3 focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/60">Email</label>
              <input required type="email" className="mt-2 w-full bg-transparent border border-white/15 px-4 py-3 focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/60">Message</label>
              <textarea required rows={5} className="mt-2 w-full bg-transparent border border-white/15 px-4 py-3 focus:border-gold focus:outline-none" />
            </div>
            <button type="submit" className="btn-gold btn-shimmer w-full">{sent ? "Sent — thank you" : "Send message"}</button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
