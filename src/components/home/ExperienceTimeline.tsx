"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { experience } from "@/data/experience";

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

export function ExperienceTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section id="experience" className="relative border-y border-white/10 bg-white/[0.025] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldReduceMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Experience
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
            Business, data & BI experience.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experience.map((job, index) => (
            <motion.article
              key={job.company}
              {...reveal(shouldReduceMotion, index * 0.08)}
              className="grid gap-6 rounded-lg border border-white/10 bg-graphite-900/70 p-5 md:grid-cols-[0.42fr_1fr]"
            >
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10">
                  <BriefcaseBusiness className="size-5 text-cyan-100" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold leading-tight text-white">
                    {job.company}
                  </h3>
                  <p className="mt-2 font-body text-sm font-medium leading-6 text-cyan-100">
                    {job.role}
                  </p>
                  <p className="font-body text-sm font-medium leading-6 text-cyan-100">
                    {job.dates}
                  </p>
                </div>
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 font-body text-sm leading-6 text-slate-300"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
