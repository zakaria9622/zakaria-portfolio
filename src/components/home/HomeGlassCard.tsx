"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type HomeGlassCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
};

export function HomeGlassCard({
  children,
  className = "",
  delay = 0,
  hover = true,
  glow = false,
}: HomeGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`home-glass-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-7 shadow-xl shadow-black/30 backdrop-blur-xl md:p-8 ${
        glow ? "home-card-glow" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-electric-500/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
