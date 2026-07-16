"use client";

import { motion } from "framer-motion";
import { Activity, Database, LineChart, Users } from "lucide-react";
import { enterEase, useHomeMotionSettings } from "@/components/home/motion";

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

function reveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 10, scale: 0.996 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.42, delay, ease: enterEase },
  };
}

function metricReveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 8, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.26, delay, ease: enterEase },
  };
}

export function KpiRibbon() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();

  return (
    <section className="kpi-ribbon relative border-y border-white/10 bg-white/[0.025]">
      <div className="kpi-ribbon-grid mx-auto grid max-w-7xl gap-px px-4 py-3 sm:grid-cols-2 md:px-6 md:py-4 lg:grid-cols-4 lg:px-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;

          return (
            <motion.div
              key={kpi.label}
              {...reveal(shouldSimplifyMotion, index * 0.04)}
              className="kpi-ribbon-item group relative min-h-32 rounded-md border border-white/10 bg-graphite-900/70 p-5 transition-colors duration-200 hover:border-white/20 hover:bg-graphite-800/80"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="type-label text-slate-400">
                  {kpi.label}
                </p>
                <Icon className={`size-5 ${kpi.accent}`} />
              </div>
              <motion.p
                {...metricReveal(shouldSimplifyMotion, 0.12 + index * 0.04)}
                className={`type-kpi-large mt-5 font-kpi ${kpi.accent}`}
              >
                {kpi.value}
              </motion.p>
              <p className="type-body-dense mt-2 text-slate-400">
                {kpi.context}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
