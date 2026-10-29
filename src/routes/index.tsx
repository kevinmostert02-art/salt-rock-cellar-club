import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, Wine, Truck, Lock, Award, Sparkles } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { WineCard } from "@/components/wine-card";
import { featuredWines } from "@/lib/wines";

import heroImg from "@/assets/hero-relight3.png";
import cellarImg from "@/assets/story-cellar.jpg";
import harvestImg from "@/assets/story-harvest.jpg";
import pairingImg from "@/assets/pairing.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-gold/60 animate-float"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 8) * 0.6}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

function LightRays() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen animate-light-ray" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="ray" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.11 85)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="oklch(0.76 0.14 85)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="200,0 260,0 700,800 500,800" fill="url(#ray)" />
      <polygon points="500,0 560,0 900,800 780,800" fill="url(#ray)" opacity="0.7" />
      <polygon points="800,0 860,0 1050,800 900,800" fill="url(#ray)" opacity="0.55" />
    </svg>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const pxA = useTransform(smx, (v) => v * 18);
  const pyA = useTransform(smy, (v) => v * 12);
  const pxB = useTransform(smx, (v) => v * -28);
  const pyB = useTransform(smy, (v) => v * -18);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Salt Rock vineyard at golden hour"
          width={832}
          height={816}
          className="h-[118%] w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-veil)" }} />
        <motion.div style={{ x: pxA, y: pyA }} className="absolute top-[10%] right-[8%] h-[38vw] w-[38vw] max-w-[560px] max-h-[560px] rounded-full bg-gold/12 blur-[120px] animate-aurora" />
        <motion.div style={{ x: pxB, y: pyB }} className="absolute bottom-[15%] left-[-5%] h-[32vw] w-[32vw] max-w-[500px] max-h-[500px] rounded-full bg-burgundy/40 blur-[130px] animate-aurora" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.08 0.005 20 / 0.6) 100%)" }} />
        <LightRays />
      </motion.div>

      <Particles />

      <motion.div style={{ opacity }} className="relative z-10 h-full container-luxe flex flex-col justify-end pt-32 md:pt-40 lg:pt-44 pb-28 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="gold-line" />
          Stellenbosch · Since climate met craft
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 md:mt-8 text-[2.4rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[1] md:leading-[0.95] font-display max-w-5xl tracking-[-0.02em]"
        >
          Crafted by Nature.<br />
          <em className="not-italic italic font-light text-gradient-gold">Perfected</em> by Time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-10 max-w-xl text-base md:text-lg text-cream/80 leading-[1.8]"
        >
          Single-site South African wines that reveal the intricate connection between climate and terroir — poured with intention, aged with patience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-14 flex flex-wrap gap-4"
        >
          <Link to="/wines" className="btn-gold btn-shimmer">
            Shop Wines <ArrowRight size={14} />
          </Link>
          <Link to="/story" className="btn-ghost-gold">
            Visit the Cellar
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/60"
      >
        <span className="text-[0.55rem] tracking-[0.45em] uppercase">Scroll</span>
        <span className="relative block h-10 w-px bg-gradient-to-b from-cream/40 to-transparent overflow-hidden">
          <motion.span
            animate={{ y: [-40, 40] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-4 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

function TrustStrip() {
  const stats = [
    { icon: Star, n: 4.9, s: "/5", d: 1, label: "Customer Satisfaction" },
    { icon: Wine, n: 8, s: "", d: 0, label: "Curated Premium Wines" },
    { icon: Truck, n: 48, s: "h", d: 0, label: "Fast Nationwide Delivery" },
    { icon: Lock, n: 100, s: "%", d: 0, label: "Secure Checkout" },
    { icon: Award, n: 3, s: "", d: 0, label: "Estate Ranges" },
    { icon: Sparkles, n: 24, s: "/7", d: 0, label: "Premium Support" },
  ];
  return (
    <section className="py-24 md:py-28 bg-gradient-to-b from-charcoal to-burgundy-deep/30 border-y border-white/8">
      <div className="container-luxe">
        <Reveal><p className="eyebrow text-center">A trusted pour</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center text-3xl md:text-5xl font-display max-w-2xl mx-auto leading-[1.1]">
            The Salt Rock <em className="text-gold not-italic">standard.</em>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.8 }}
              className="text-center"
            >
              <s.icon size={22} className="text-gold mx-auto" />
              <p className="mt-4 text-4xl md:text-5xl font-display text-gradient-gold leading-none">
                <Counter to={s.n} suffix={s.s} decimals={s.d} />
              </p>
              <p className="mt-3 text-[0.6rem] tracking-[0.28em] uppercase text-cream/60 leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative py-32 md:py-48 bg-charcoal">
      <div className="container-luxe grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-5">
          <Reveal><p className="eyebrow">Where climate & craft meet</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-4xl md:text-6xl font-display leading-[1.05]">
              Two nomads.<br />
              One <em className="text-gold not-italic">obsession.</em>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.2}>
            <p className="text-lg text-cream/75 leading-[1.9]">
              Salt Rock Wines is a collaboration between two nomads in the South African wine industry — wines serious enough to intrigue the aficionado, yet approachable and pleasing for the first-time drinker. Every bottle is handpicked, sustainably farmed, and made with an obsession for the sites we source from.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { n: "3", l: "Ranges" },
                { n: "8", l: "Wines" },
                { n: "1", l: "Terroir" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-5xl md:text-6xl font-display text-gold">{s.n}</p>
                  <p className="mt-2 text-[0.65rem] tracking-[0.3em] uppercase text-cream/60">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedWines() {
  return (
    <section className="relative py-32 md:py-40 bg-gradient-to-b from-charcoal via-burgundy-deep/40 to-charcoal">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <Reveal><p className="eyebrow">The Cellar</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl md:text-6xl font-display leading-[1.05] max-w-2xl">
                A quiet library of <em className="text-gold not-italic">single-site</em> wines.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/wines" className="btn-ghost-gold whitespace-nowrap">
              View all wines <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredWines.map((w, i) => (
            <WineCard key={w.slug} wine={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleBand({ img, eyebrow, title, body, reverse }: { img: string; eyebrow: string; title: string; body: string; reverse?: boolean }) {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className={`container-luxe grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
          </div>
        </Reveal>
        <div>
          <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 text-4xl md:text-5xl font-display leading-[1.1]">{title}</h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-cream/75 leading-[1.9] text-lg font-display italic">{body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StoryStrip() {
  const stages = [
    { n: "01", img: harvestImg, title: "Harvest", body: "Handpicked at first light, bunch by bunch." },
    { n: "02", img: cellarImg, title: "Cellar", body: "Slow, restrained winemaking. Nothing rushed." },
    { n: "03", img: pairingImg, title: "Table", body: "Poured with the people you love most." },
  ];
  return (
    <section className="py-32 md:py-40 bg-charcoal">
      <div className="container-luxe">
        <Reveal><p className="eyebrow text-center">From Vine to Table</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center text-4xl md:text-6xl font-display">
            Six stages. <em className="text-gold not-italic">One promise.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold">Chapter {s.n}</p>
                  <h3 className="mt-3 text-3xl font-display">{s.title}</h3>
                  <p className="mt-3 text-sm text-cream/75 leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/story" className="btn-ghost-gold">
            Read the full story <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SommelierCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img src={pairingImg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>
      <div className="container-luxe relative text-center">
        <Reveal><p className="eyebrow">The Salt Rock Sommelier</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-7xl font-display max-w-4xl mx-auto leading-[1.05]">
            Tell us the <em className="text-gold not-italic">moment.</em><br />
            We'll pour the wine.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl mx-auto text-cream/75 leading-relaxed">
            A private, six-question conversation that ends with the Salt Rock bottle made for your table tonight.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link to="/sommelier" className="btn-gold btn-shimmer mt-12">
            Begin the conversation <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { q: "The Stand Alone Chenin is one of the finest whites I've had this year — poised, saline, endlessly drinkable.", a: "Amara N.", role: "Verified member · Cape Town" },
    { q: "El Niño Cinsault has become our house pour. Elegant, joyful, and just serious enough.", a: "David M.", role: "Verified purchase · Johannesburg" },
    { q: "The Wine Club is a monthly highlight. The care in every dispatch is unmistakable.", a: "Sipho D.", role: "Reserve member · Durban" },
  ];
  return (
    <section className="py-32 bg-gradient-to-b from-charcoal to-burgundy-deep/60">
      <div className="container-luxe">
        <Reveal><p className="eyebrow text-center">In good company</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center text-4xl md:text-6xl font-display">
            Poured. <em className="text-gold not-italic">Praised.</em>
          </h2>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="h-full p-8 md:p-10 glass rounded-sm flex flex-col">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} className="fill-gold" />)}
                </div>
                <blockquote className="mt-6 text-xl font-display leading-[1.55] text-cream/95 italic flex-1">
                  "{r.q}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full grid place-items-center bg-burgundy/40 border border-gold/30 text-gold font-display text-lg">
                    {r.a.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-lg text-cream">{r.a}</p>
                    <p className="text-[0.6rem] tracking-[0.28em] uppercase text-cream/55">{r.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WineClubTeaser() {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="container-luxe">
        <div className="relative overflow-hidden border border-gold/25 rounded-sm">
          <div className="absolute inset-0 opacity-30">
            <img src={cellarImg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-charcoal/40" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-12 p-10 md:p-16 items-center">
            <div>
              <Reveal><p className="eyebrow">The Salt Rock Wine Club</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-4xl md:text-5xl font-display leading-[1.1]">
                  Bottles chosen for you. <em className="text-gold not-italic">Every season.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-8 space-y-3 text-cream/80">
                  {["Exclusive new releases", "Monthly personal recommendations", "Members-only pricing", "VIP tasting invitations"].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.3}>
                <Link to="/club" className="btn-gold btn-shimmer mt-10 inline-flex">
                  Explore the Club <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav />
      <main>
        <Hero />
        <TrustStrip />
        <Manifesto />
        <FeaturedWines />
        <LifestyleBand
          img={pairingImg}
          eyebrow="At the table"
          title="Wine, in its natural setting."
          body="Every bottle we pour is made to be shared — over long lunches, quiet dinners, and the kind of afternoons that stretch into evening. Salt Rock belongs at the centre of the table."
        />
        <StoryStrip />
        <LifestyleBand
          reverse
          img={cellarImg}
          eyebrow="From the cellar"
          title="Patient hands. Cool stone."
          body="Nothing is hurried in our cellar. Small vessels, gentle extractions, and the confidence to let each site speak for itself. Restraint is our loudest signature."
        />
        <SommelierCTA />
        <Testimonials />
        <WineClubTeaser />
      </main>
      <SiteFooter />
    </div>
  );
}
