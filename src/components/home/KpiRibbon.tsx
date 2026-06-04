"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Database, LineChart, Users } from "lucide-react";

const kpis = [
  {
    label: "Orders analyzed",
    value: "12,000",
    context: "Profitability model",
    icon: Database,
    accent: "text-cyan-200",
  },
  {
    label: "Revenue analyzed",
    value: "EUR 2.05M",
    context: "E-commerce profit leak",
    icon: LineChart,
    accent: "text-amber-200",
  },
  {
    label: "Users in funnel",
    value: "3M+",
    context: "Conversion diagnosis",
    icon: Users,
    accent: "text-emerald-200",
  },
  {
    label: "VIP revenue share",
    value: "75.4%",
    context: "RFM segmentation",
    icon: Activity,
    accent: "text-coral-200",
  },
];

function reveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay },
  };
}

export function KpiRibbon() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative border-y border-white/10 bg-white/[0.025]">
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;

          return (
            <motion.div
              key={kpi.label}
              {...reveal(shouldReduceMotion, index * 0.04)}
              className="group relative min-h-32 rounded-md border border-white/10 bg-graphite-900/70 p-5 transition-colors duration-200 hover:border-white/20 hover:bg-graphite-800/80"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {kpi.label}
                </p>
                <Icon className={`size-5 ${kpi.accent}`} />
              </div>
              <p className={`mt-5 text-3xl font-semibold tracking-tight ${kpi.accent}`}>
                {kpi.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{kpi.context}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
