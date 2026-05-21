"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { skillsStrip } from "@/data/skills";

export function SkillsStrip() {
  return (
    <div className="relative border-y border-white/10 bg-gradient-to-r from-navy-900/80 via-electric-500/[0.06] to-navy-900/80 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-center gap-2">
          <Database className="h-4 w-4 text-electric-400" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Core stack
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {skillsStrip.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="home-skill-pill rounded-xl border border-white/15 bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-slate-200 shadow-sm backdrop-blur-md transition-colors hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-white"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
