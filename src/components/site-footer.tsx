import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/saltrock-logo.png.asset.json";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-charcoal border-t border-border">
      {/* Newsletter */}
      <section className="border-b border-border">
        <div className="container-luxe py-24 md:py-32 text-center">
          <p className="eyebrow">The Salt Rock Letter</p>
          <h2 className="mt-6 text-4xl md:text-6xl font-display">
            Join the <em className="text-gold not-italic font-normal">Salt Rock</em> Family
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-cream/70 leading-relaxed">
            Early access to new releases, private cellar dispatches, wine education and members-only offers.
            Poured quietly into your inbox.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-border px-5 py-4 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              {sent ? "Welcome" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <div className="container-luxe py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="text-2xl font-display">Salt<span className="text-gold">·</span>Rock</div>
          <p className="mt-4 text-sm text-cream/60 max-w-xs leading-relaxed">
            A collaboration between two nomads of the South African wine industry,
            revealing the intricate connection between climate and terroir in the
            sundrenched vineyards of Stellenbosch.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="w-10 h-10 border border-border grid place-items-center hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-10 h-10 border border-border grid place-items-center hover:border-gold hover:text-gold transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-cream/75">
            <li><Link to="/wines" className="hover:text-gold transition-colors">The Cellar</Link></li>
            <li><Link to="/sommelier" className="hover:text-gold transition-colors">Sommelier</Link></li>
            <li><Link to="/club" className="hover:text-gold transition-colors">Wine Club</Link></li>
            <li><Link to="/story" className="hover:text-gold transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-sm text-cream/75">
            <li>Stellenbosch, South Africa</li>
            <li><a href="mailto:hello@saltrockwines.com" className="hover:text-gold transition-colors">hello@saltrockwines.com</a></li>
            <li>Corporate Gifting</li>
            <li>Cellar Tours</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-col sm:flex-row gap-2 justify-between text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} Salt Rock Wines. Not for persons under 18.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
