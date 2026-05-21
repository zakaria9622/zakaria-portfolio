"use client";

import Link from "next/link";
import { ArrowRight, BarChart2 } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeGlassCard } from "@/components/home/HomeGlassCard";
import { Badge } from "@/components/ui/Badge";

const projectAccents = [
  "from-electric-500/20 via-transparent to-transparent",
  "from-cyan-500/15 via-transparent to-transparent",
  "from-blue-600/20 via-transparent to-transparent",
];

export function FeaturedProjects() {
  return (
    <Section id="projects" wide className="home-section-projects relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.08),transparent)]" />

      <div className="relative">
        <SectionHeader
          label="Case Studies"
          title="Featured Projects"
          description="End-to-end analytics projects — from SQL exploration to business recommendations."
        />

        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, i) => (
            <HomeGlassCard
              key={project.slug}
              delay={i * 0.08}
              glow={i === 0}
              className="md:min-h-[220px]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${projectAccents[i]} opacity-60`}
              />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-electric-500/40 bg-electric-500/15 font-mono text-sm font-bold text-electric-300">
                      0{project.featuredOrder}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <BarChart2 className="h-5 w-5 text-electric-400" />
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-electric-500/30 hover:text-electric-300 lg:ml-0"
                      aria-label="GitHub repository"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      Repository
                    </a>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {project.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge key={tool} className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-navy-950/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Business question
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200 md:text-base">
                        {project.businessQuestion}
                      </p>
                    </div>
                    {project.scope && (
                      <div className="rounded-xl border border-electric-500/20 bg-electric-500/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Scope
                        </p>
                        <p className="mt-2 text-sm font-medium text-electric-300 md:text-base">
                          {project.scope}
                        </p>
                      </div>
                    )}
                    <div
                      className={`rounded-xl border border-white/10 bg-navy-950/50 p-4 ${
                        !project.scope ? "sm:col-span-2 lg:col-span-1" : ""
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Main output
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
                        {project.mainOutput}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 lg:min-w-[200px] lg:border-l lg:border-white/10 lg:pl-8">
                  <div className="hidden rounded-xl border border-dashed border-electric-500/25 bg-electric-500/5 p-4 lg:block">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Key metric
                    </p>
                    <p className="mt-2 text-2xl font-bold tabular-nums text-electric-300">
                      {project.kpis.find((k) => k.highlight)?.value ??
                        project.kpis[0]?.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {project.kpis.find((k) => k.highlight)?.label ??
                        project.kpis[0]?.label}
                    </p>
                  </div>

                  <Link
                    href={project.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-electric-500/25 transition-all hover:from-electric-500 hover:to-electric-400 lg:w-auto"
                  >
                    View case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </HomeGlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
