import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin, Truck, ShieldCheck, Lock } from "lucide-react";
import { useState } from "react";

import logoImg from "@/assets/saltrock-logo.webp";
import heroImg from "@/assets/hero-vineyard.jpg";
import cellarImg from "@/assets/story-cellar.jpg";
import harvestImg from "@/assets/story-harvest.jpg";
import pairingImg from "@/assets/pairing.jpg";
import elNino from "@/assets/bottles/El_Nino_Cinsault.jpg";
import saPinot from "@/assets/bottles/Stand_Alone_Pinot_Noir.jpg";

const gramTiles = [heroImg, cellarImg, harvestImg, pairingImg, elNino, saPinot];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-charcoal border-t border-border">
      {/* Wine Club / Newsletter */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container-luxe py-24 md:py-32 text-center relative">
          <p className="eyebrow">Join the Wine Club</p>
          <h2 className="mt-6 text-4xl md:text-6xl font-display">
            The <em className="text-gold not-italic font-normal">Salt Rock</em> Letter
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-cream/70 leading-relaxed">
            Early access to new releases, private cellar dispatches, wine education and members-only offers. Poured quietly into your inbox.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 justify-center text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">
            <li>· Exclusive releases</li>
            <li>· Monthly recommendations</li>
            <li>· Special offers</li>
            <li>· VIP tasting invitations</li>
          </ul>
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
              aria-label="Email address"
              className="flex-1 bg-transparent border border-border px-5 py-4 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
            />
            <button type="submit" className="btn-gold btn-shimmer whitespace-nowrap">
              {sent ? "Welcome" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* Instagram gallery */}
      <section className="border-b border-border">
        <div className="container-luxe py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">@saltrockwines</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-display">From the cellar to your feed</h3>
            </div>
            <a href="https://instagram.com/saltrockwines" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-cream/70 hover:text-gold transition-colors">
              <Instagram size={14} /> Follow
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {gramTiles.map((src, i) => (
              <a key={i} href="https://instagram.com/saltrockwines" target="_blank" rel="noreferrer" className="relative aspect-square overflow-hidden group bg-burgundy-deep/40">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                  <Instagram className="text-gold" size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="container-luxe py-20 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Salt Rock Wines" width={52} height={52} className="h-11 w-auto opacity-90" />
            <div className="text-2xl font-display">Salt<span className="text-gold">·</span>Rock</div>
          </div>
          <p className="mt-4 text-sm text-cream/60 max-w-xs leading-relaxed">
            A collaboration between two nomads of the South African wine industry, revealing the intricate connection between climate and terroir in the sundrenched vineyards of Stellenbosch.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://instagram.com/saltrockwines" aria-label="Instagram" className="w-10 h-10 border border-border grid place-items-center hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 border border-border grid place-items-center hover:border-gold hover:text-gold transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5">Shop</p>
          <ul className="space-y-3 text-sm text-cream/75">
            <li><Link to="/wines" className="hover:text-gold transition-colors">The Cellar</Link></li>
            <li><Link to="/wines" className="hover:text-gold transition-colors">Stand Alone</Link></li>
            <li><Link to="/wines" className="hover:text-gold transition-colors">Climate Range</Link></li>
            <li><Link to="/wines" className="hover:text-gold transition-colors">Lifestyle</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Experience</p>
          <ul className="space-y-3 text-sm text-cream/75">
            <li><Link to="/sommelier" className="hover:text-gold transition-colors">Sommelier</Link></li>
            <li><Link to="/club" className="hover:text-gold transition-colors">Wine Club</Link></li>
            <li><Link to="/guide" className="hover:text-gold transition-colors">The Guide</Link></li>
            <li><Link to="/stockists" className="hover:text-gold transition-colors">Stockists</Link></li>
            <li><Link to="/story" className="hover:text-gold transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Support</p>
          <ul className="space-y-3 text-sm text-cream/75">
            <li><Link to="/shipping" className="hover:text-gold transition-colors">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-gold transition-colors">Returns</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><a href="mailto:hello@saltrockwines.com" className="hover:text-gold transition-colors flex items-center gap-1.5"><Mail size={12} /> Email us</a></li>
            <li className="flex items-center gap-1.5"><MapPin size={12} /> Somerset West, ZA</li>
          </ul>
        </div>
      </div>

      {/* Trust / Payment strip */}
      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-wrap gap-6 items-center justify-between text-[0.6rem] tracking-[0.28em] uppercase text-cream/55">
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-2"><Lock size={12} className="text-gold" /> Secure Checkout</span>
            <span className="flex items-center gap-2"><Truck size={12} className="text-gold" /> Nationwide Delivery</span>
            <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-gold" /> Authentic Wines</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {["VISA", "MASTER", "EFT", "SNAPSCAN", "PAYFAST"].map((p) => (
              <span key={p} className="px-2 py-1 border border-white/12 text-[0.55rem] tracking-[0.2em] text-cream/60">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Gold hairline */}
      <div className="hairline" />

      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-col sm:flex-row gap-2 justify-between text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} Salt Rock Wines. Not for persons under 18.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link to="/shipping" className="hover:text-gold transition-colors">Shipping</Link>
            <Link to="/returns" className="hover:text-gold transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
