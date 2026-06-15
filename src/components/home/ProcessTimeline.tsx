"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Database, LayoutDashboard, Lightbulb, Search } from "lucide-react";

const steps = [
  {
    title: "Question",
    text: "Frame the business problem before touching the dashboard layer.",
    icon: Search,
    accent: "text-cyan-200",
  },
  {
    title: "SQL model",
    text: "Build reliable metrics with SQL, DuckDB, Python, and clear assumptions.",
    icon: Database,
    accent: "text-emerald-200",
  },
  {
    title: "Dashboard",
    text: "Turn the analysis into focused Tableau views and stakeholder-ready KPIs.",
    icon: LayoutDashboard,
    accent: "text-amber-200",
  },
  {
    title: "Recommendation",
    text: "Translate the pattern into a decision: pricing, funnel, or CRM action.",
    icon: Lightbulb,
    accent: "text-coral-200",
  },
];

function reveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay },
  };
}

export function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldReduceMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Analytics process
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
            A repeatable path from question to action.
          </h2>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                {...reveal(shouldReduceMotion, index * 0.07)}
                className="relative rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    0{index + 1}
                  </span>
                  <Icon className={`size-5 ${step.accent}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-slate-400">
                  {step.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
