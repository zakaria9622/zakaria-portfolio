"use client";

import { motion } from "framer-motion";

type KpiCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
};

export function KpiCard({ label, value, highlight, delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-xl border p-5 ${
        highlight
          ? "border-electric-500/40 bg-electric-500/10 shadow-lg shadow-electric-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 text-xl font-bold tracking-tight md:text-2xl ${
          highlight ? "text-electric-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}
