"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { education } from "@/data/education";

function reveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay },
  };
}

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section id="education" className="relative border-b border-white/10 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldReduceMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Academic Background
          </p>
          <AnimatedSectionHeading
            text="Education"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-5xl"
          />
          <p className="mt-4 max-w-3xl font-body text-base leading-7 text-slate-400">
            Business education combined with specialized training in data management,
            analytics and artificial intelligence.
          </p>
        </motion.div>

        <ul className="grid gap-4 lg:grid-cols-3">
          {education.map((entry, index) => (
            <li key={`${entry.school}-${entry.program}`} className="min-w-0">
              <motion.article
                {...reveal(shouldReduceMotion, index * 0.07)}
                className="h-full min-w-0 rounded-lg border border-white/10 bg-graphite-900/70 p-5"
              >
                <div className="mb-6 flex size-11 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10">
                  <GraduationCap className="size-5 text-cyan-100" />
                </div>
                <h3 className="break-words font-heading text-xl font-semibold leading-tight text-white">
                  {entry.program}
                </h3>
                <p className="mt-4 break-words font-body text-sm font-medium leading-6 text-cyan-100">
                  {entry.school}
                </p>
                <p className="mt-2 font-mono text-xs font-medium leading-5 text-slate-500">
                  {entry.dates}
                </p>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
