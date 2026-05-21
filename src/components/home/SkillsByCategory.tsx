"use client";

import { BarChart3, LineChart, Users } from "lucide-react";
import { skillsByCategory } from "@/data/skills";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeGlassCard } from "@/components/home/HomeGlassCard";

const icons = [BarChart3, LineChart, Users];

export function SkillsByCategory() {
  return (
    <Section id="skills" wide className="home-section-skills relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-electric-500/5 blur-[100px]" />

      <div className="relative">
        <SectionHeader
          label="Expertise"
          title="Skills by Category"
          description="Technical stack and business analytics capabilities aligned with Data & BI roles."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillsByCategory.map((group, i) => {
            const Icon = icons[i] ?? BarChart3;
            return (
              <HomeGlassCard key={group.category} delay={i * 0.1}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-electric-500/30 bg-gradient-to-br from-electric-500/25 to-electric-600/5">
                  <Icon className="h-6 w-6 text-electric-300" />
                </div>
                <h3 className="text-xl font-bold text-white">{group.category}</h3>
                <ul className="mt-5 space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 text-sm text-slate-400 transition-colors hover:border-white/5 hover:bg-white/[0.03] hover:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-electric-400 to-electric-600" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </HomeGlassCard>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
