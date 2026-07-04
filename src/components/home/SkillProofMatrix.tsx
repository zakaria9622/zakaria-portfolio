"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, ChartNoAxesCombined, Database, Layers3 } from "lucide-react";
import { skillsByCategory } from "@/data/skills";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";

const categoryIcons = [Database, ChartNoAxesCombined, BarChart3];

const proofNotes = [
  "Used across SQL exploration, DuckDB/dbt models, Tableau dashboards, and Python checks.",
  "Applied to profitability analysis, funnel drop-off diagnosis, data-quality gates, and diagnostic KPI controls.",
  "Connected to acquisition, CRM segmentation, conversion analysis, CSM prioritization, and stakeholder reports.",
];

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

export function SkillProofMatrix() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section id="skills" className="relative border-y border-white/10 bg-white/[0.025] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldReduceMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Skill proof matrix
          </p>
          <AnimatedSectionHeading
            text="Tools are presented as evidence, not keyword lists."
            className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl"
          />
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {skillsByCategory.map((group, index) => {
            const Icon = categoryIcons[index] ?? Layers3;

            return (
              <motion.article
                key={group.category}
                {...reveal(shouldReduceMotion, index * 0.07)}
                className="rounded-lg border border-white/10 bg-graphite-900/70 p-5 transition-colors duration-200 hover:border-white/20"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10">
                    <Icon className="size-5 text-cyan-100" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold leading-tight text-white">
                  {group.category}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-slate-400">
                  {proofNotes[index]}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
