"use client";

import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeGlassCard } from "@/components/home/HomeGlassCard";

export function Experience() {
  return (
    <Section id="experience" wide className="relative">
      <SectionHeader
        label="Background"
        title="Experience"
        description="Real marketing analytics and reporting experience — KPI tracking, dashboards and performance analysis."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {experience.map((job, i) => (
          <HomeGlassCard key={job.company} delay={i * 0.1} glow={i === 0}>
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-electric-500/30 bg-gradient-to-br from-electric-500/20 to-transparent">
                <Briefcase className="h-7 w-7 text-electric-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  {job.company}
                </h3>
                <p className="mt-1 text-sm font-medium text-electric-400 md:text-base">
                  {job.role}
                </p>
                <p className="text-sm font-medium text-electric-400 md:text-base">
                  {job.dates}
                </p>
              </div>
            </div>
            <ul className="space-y-3 border-t border-white/10 pt-6">
              {job.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg bg-white/[0.02] px-3 py-2.5 text-sm leading-relaxed text-slate-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                  {item}
                </li>
              ))}
            </ul>
          </HomeGlassCard>
        ))}
      </div>
    </Section>
  );
}
