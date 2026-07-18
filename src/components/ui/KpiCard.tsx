"use client";

import { motion } from "framer-motion";
import { useHomeMotionSettings } from "@/components/home/motion";

type KpiCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
  delay?: number;
};

export function KpiCard({ label, value, highlight, delay = 0 }: KpiCardProps) {
  const { shouldSimplifyMotion } = useHomeMotionSettings();
  const mobileValueParts =
    label === "VIP share"
      ? ["27.9% customers", "75.4% revenue"]
      : label === "Lost share"
        ? ["23.62% customers", "2.95% revenue"]
        : [value];

  return (
    <motion.div
      initial={shouldSimplifyMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={shouldSimplifyMotion ? { duration: 0 } : { duration: 0.4, delay }}
      className={`kpi-card rounded-xl border p-4 md:p-5 ${
        highlight
          ? "border-electric-500/40 bg-electric-500/10 shadow-lg shadow-electric-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 font-kpi text-xl font-bold tabular-nums md:text-2xl ${
          highlight ? "text-electric-300" : "text-white"
        }`}
      >
        {mobileValueParts.length > 1 ? (
          <>
            <span className="md:hidden">
              {mobileValueParts.map((part) => (
                <span key={part} className="block [&+&]:mt-1">{part}</span>
              ))}
            </span>
            <span className="hidden md:inline">{value}</span>
          </>
        ) : (
          value
        )}
      </p>
    </motion.div>
  );
}
