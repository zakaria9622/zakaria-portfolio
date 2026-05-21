"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, ListChecks, Target, Wrench } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/data/projects";
import { KpiCard } from "@/components/ui/KpiCard";
import { DashboardPlaceholder } from "@/components/ui/DashboardPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <div className="border-b border-white/5 bg-navy-950 pt-28 pb-12 md:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-electric-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
              Case Study
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              {project.businessQuestion}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </div>
            <div className="mt-8">
              <Button
                href={project.github}
                variant="primary"
                external
                icon={<GitHubIcon className="h-4 w-4" />}
              >
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.kpis.map((kpi, i) => (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              highlight={kpi.highlight}
              delay={i * 0.08}
            />
          ))}
        </div>

        <div className="mb-12">
          <DashboardPlaceholder
            slug={project.slug}
            alt={`${project.title} — ${project.screenshotPlaceholder}`}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-electric-400" />
              <h2 className="text-lg font-bold text-white">Business Problem</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {project.businessProblem}
            </p>
          </GlassCard>

          <GlassCard hover={false} delay={0.05}>
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-electric-400" />
              <h2 className="text-lg font-bold text-white">Tools</h2>
            </div>
            <ul className="space-y-2">
              {project.tools.map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <span className="h-1 w-1 rounded-full bg-electric-500" />
                  {tool}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <GlassCard className="mt-6" hover={false} delay={0.1}>
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-electric-400" />
            <h2 className="text-lg font-bold text-white">Methodology</h2>
          </div>
          <ol className="space-y-3">
            {project.methodology.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 text-sm leading-relaxed text-slate-400"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-electric-500/30 bg-electric-500/10 text-xs font-bold text-electric-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard
          className="mt-6 border-electric-500/30 bg-electric-500/5"
          hover={false}
          delay={0.15}
        >
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-electric-400" />
            <h2 className="text-lg font-bold text-white">Main Insight</h2>
          </div>
          <p className="text-base leading-relaxed text-slate-300">
            {project.mainInsight}
          </p>
        </GlassCard>

        <GlassCard className="mt-6" hover={false} delay={0.2}>
          <h2 className="mb-4 text-lg font-bold text-white">
            Business Recommendations
          </h2>
          <ul className="space-y-3">
            {project.recommendations.map((rec) => (
              <li
                key={rec}
                className="flex gap-3 text-sm leading-relaxed text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400" />
                {rec}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-12">
          <Button
            href={project.github}
            variant="primary"
            external
            icon={<GitHubIcon className="h-4 w-4" />}
          >
            GitHub Repository
          </Button>
          <Button href="/#projects" variant="secondary">
            All Projects
          </Button>
        </div>
      </div>
    </article>
  );
}
