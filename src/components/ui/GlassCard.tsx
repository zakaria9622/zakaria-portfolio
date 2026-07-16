"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useHomeMotionSettings } from "@/components/home/motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
};

export function GlassCard({
  children,
  className = "",
  delay = 0,
  hover = true,
}: GlassCardProps) {
  const { shouldSimplifyMotion } = useHomeMotionSettings();

  return (
    <motion.div
      initial={shouldSimplifyMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={shouldSimplifyMotion ? { duration: 0 } : { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover && !shouldSimplifyMotion ? { y: -2 } : undefined}
      className={`rounded-xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
