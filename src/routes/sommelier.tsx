import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { wines, type Wine } from "@/lib/wines";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sommelier")({
  head: () => ({
    meta: [
      { title: "The Salt Rock Sommelier — Find Your Perfect Wine" },
      { name: "description", content: "Six quiet questions. One perfect Salt Rock bottle for your moment." },
      { property: "og:title", content: "The Salt Rock Sommelier" },
      { property: "og:description", content: "Tell us the moment. We'll pour the wine." },
    ],
  }),
  component: Sommelier,
});

type Answers = {
  meal?: string;
  color?: "Red" | "White" | "Either";
  style?: "Dry" | "Off-dry" | "Sweet" | "Any";
  budget?: "Under R200" | "R200–R300" | "R300+";
  gift?: "Yes" | "No";
  occasion?: string;
};

const steps: {
  key: keyof Answers;
  question: string;
  eyebrow: string;
  options: string[];
}[] = [
  { key: "meal", eyebrow: "01 · The table", question: "What will you be eating?", options: ["Red meat / braai", "Poultry / pasta", "Seafood / sushi", "Cheese / charcuterie", "Nothing — just wine"] },
  { key: "color", eyebrow: "02 · The colour", question: "Red or white tonight?", options: ["Red", "White", "Either"] },
  { key: "style", eyebrow: "03 · The style", question: "Dry, off-dry, or sweet?", options: ["Dry", "Off-dry", "Sweet", "Any"] },
  { key: "budget", eyebrow: "04 · The budget", question: "How generous are we feeling?", options: ["Under R200", "R200–R300", "R300+"] },
  { key: "gift", eyebrow: "05 · The recipient", question: "Are you buying this as a gift?", options: ["Yes", "No"] },
  { key: "occasion", eyebrow: "06 · The moment", question: "What are we celebrating?", options: ["Weeknight", "Dinner party", "Celebration", "Just because"] },
];

function score(wine: Wine, a: Answers): number {
  let s = 0;
  if (a.color === "Red" && wine.type === "Red") s += 3;
  if (a.color === "White" && wine.type === "White") s += 3;
  if (a.color === "Either") s += 1;

  if (a.style === "Dry" && wine.sweetness <= 2) s += 2;
  if (a.style === "Off-dry" && wine.sweetness === 2) s += 3;
  if (a.style === "Sweet" && wine.sweetness >= 3) s += 3;
  if (a.style === "Any") s += 1;

  if (a.budget === "Under R200" && wine.price < 200) s += 3;
  if (a.budget === "R200–R300" && wine.price >= 200 && wine.price <= 300) s += 3;
  if (a.budget === "R300+" && wine.price > 300) s += 3;

  if (a.meal?.includes("Red meat") && wine.type === "Red" && wine.body >= 3) s += 3;
  if (a.meal?.includes("Poultry") && wine.body >= 2 && wine.body <= 4) s += 2;
  if (a.meal?.includes("Seafood") && wine.type === "White") s += 3;
  if (a.meal?.includes("Cheese")) s += 1;

  if (a.gift === "Yes" && wine.range === "Stand Alone") s += 2;
  if (a.occasion === "Celebration" && wine.range === "Stand Alone") s += 2;
  if (a.occasion === "Weeknight" && wine.range === "Lifestyle") s += 2;

  return s;
}

function Sommelier() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const progress = ((step + (done ? 1 : 0)) / steps.length) * 100;

  const pick = (value: string) => {
    const next = { ...answers, [current.key]: value } as Answers;
    setAnswers(next);
    if (step === steps.length - 1) {
      setTimeout(() => setDone(true), 350);
    } else {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const reset = () => { setAnswers({}); setStep(0); setDone(false); };

  const ranked = [...wines].map((w) => ({ w, s: score(w, answers) })).sort((a, b) => b.s - a.s);
  const top = ranked[0]?.w;
  const alt = ranked.slice(1, 3).map((r) => r.w);

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <SiteNav transparentOnTop={false} />
      <main className="pt-28 pb-24">
        <section className="container-luxe max-w-4xl">
          <div className="text-center">
            <p className="eyebrow inline-flex items-center gap-2 justify-center">
              <Sparkles size={12} /> The Salt Rock Sommelier
            </p>
            <h1 className="mt-6 text-5xl md:text-7xl font-display leading-[1]">
              Tell us the <em className="text-gold not-italic">moment.</em>
            </h1>
          </div>

          <div className="mt-14 h-px bg-cream/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>

          <div className="mt-16 min-h-[420px] relative">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="eyebrow">{current.eyebrow}</p>
                  <h2 className="mt-6 text-3xl md:text-5xl font-display leading-tight">
                    {current.question}
                  </h2>
                  <div className="mt-10 grid sm:grid-cols-2 gap-3">
                    {current.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => pick(opt)}
                        className="group text-left p-6 border border-border hover:border-gold hover:bg-card transition-all duration-500 flex items-center justify-between"
                      >
                        <span className="text-lg font-display">{opt}</span>
                        <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="mt-8 text-[0.7rem] tracking-[0.25em] uppercase text-cream/50 hover:text-gold transition-colors">
                      ← Back
                    </button>
                  )}
                </motion.div>
              ) : top && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="eyebrow">Your perfect pour</p>
                  <div className="mt-8 grid md:grid-cols-2 gap-10 items-center">
                    <div className="relative aspect-[3/4] bg-gradient-to-b from-burgundy-deep to-charcoal border border-border">
                      <img src={top.image} alt={top.name} className="absolute inset-0 h-full w-full object-contain p-10" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] tracking-[0.3em] uppercase text-cream/60">{top.range} · {top.vintage}</p>
                      <h2 className="mt-4 text-4xl md:text-5xl font-display">{top.name}</h2>
                      <p className="mt-2 font-display italic text-cream/70">{top.varietal}</p>
                      <p className="mt-6 text-cream/85 leading-relaxed">{top.tasting}</p>
                      <div className="mt-6 p-4 border-l-2 border-gold bg-card/40">
                        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-gold mb-2">Why we chose this</p>
                        <p className="text-sm text-cream/80 leading-relaxed">
                          Based on {Object.keys(answers).length} answers, this bottle matches your palate,
                          budget and moment more closely than any other in the cellar.
                        </p>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/w/$slug" params={{ slug: top.slug }} className="btn-gold">
                          Explore this wine <ArrowRight size={14} />
                        </Link>
                        <button onClick={reset} className="btn-ghost-gold">
                          <RotateCcw size={14} /> Start over
                        </button>
                      </div>
                    </div>
                  </div>

                  {alt.length > 0 && (
                    <div className="mt-20">
                      <p className="eyebrow">Similar wines</p>
                      <div className="mt-6 grid sm:grid-cols-2 gap-6">
                        {alt.map((w) => (
                          <Link key={w.slug} to="/w/$slug" params={{ slug: w.slug }} className="group p-6 border border-border flex gap-5 hover:border-gold transition-colors">
                            <div className="w-20 h-28 bg-gradient-to-b from-burgundy-deep to-charcoal shrink-0">
                              <img src={w.image} alt={w.name} className="w-full h-full object-contain p-2" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/60">{w.range}</p>
                              <p className="mt-1 text-lg font-display group-hover:text-gold transition-colors truncate">{w.name}</p>
                              <p className="mt-2 text-xs text-cream/60 line-clamp-2">{w.tasting}</p>
                              <p className="mt-2 text-sm text-gold">R {w.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
