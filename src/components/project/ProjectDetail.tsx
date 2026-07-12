"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Database,
  Lightbulb,
  ListChecks,
  ShieldAlert,
  Target,
  UserRound,
  Wrench,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/data/projects";
import { KpiCard } from "@/components/ui/KpiCard";
import { DashboardPlaceholder } from "@/components/ui/DashboardPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

const chapterHeadingClass =
  "font-heading text-3xl font-bold leading-tight text-white md:text-4xl";
const chapterEyebrowClass =
  "font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80";

export function ProjectDetail({ project }: { project: Project }) {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <article ref={articleRef}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-electric-400 to-amber-200 shadow-[0_0_16px_rgba(103,232,249,0.65)]"
        style={{ scaleX: progressScale }}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-navy-950 pt-28 pb-14 md:pt-32 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 right-[-8%] size-[28rem] rounded-full bg-cyan-300/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-44 left-[-8%] size-[30rem] rounded-full bg-electric-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.07)_1px,transparent_1px)] [background-size:34px_34px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href="/#projects"
            className="mb-10 inline-flex items-center gap-2 font-body text-sm leading-none text-slate-400 transition-colors hover:text-electric-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -28, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <p className="font-mono text-sm font-semibold uppercase tracking-widest text-electric-400">
                Case Study
              </p>
              <h1 className="mt-3 max-w-2xl break-words font-heading text-4xl font-bold leading-[0.98] text-white md:text-5xl xl:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl font-body text-lg leading-8 text-slate-200 md:text-xl">
                {project.businessQuestion}
              </p>
              {project.summary && (
                <p className="mt-4 max-w-2xl font-body text-base leading-7 text-slate-400">
                  {project.summary}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="min-w-[10rem] rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Project type
                  </p>
                  <p className="mt-1 font-body text-xs leading-5 text-slate-200">
                    {project.projectType}
                  </p>
                </div>
                <div className="min-w-[10rem] rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Contribution
                  </p>
                  <p className="mt-1 font-body text-xs leading-5 text-slate-200">
                    {project.ownership}
                  </p>
                </div>
                {project.artifacts && project.artifacts.length > 0 && (
                  <div className="min-w-[10rem] rounded-lg border border-cyan-200/15 bg-cyan-200/[0.035] px-3 py-2.5">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                      Inspectable work
                    </p>
                    <p className="mt-1 font-body text-xs leading-5 text-cyan-50">
                      {project.artifacts.length} artifacts
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                {project.liveDemo ? (
                  <div className="flex flex-wrap gap-3">
                    <Button
                      href={project.liveDemo}
                      variant="primary"
                      external
                      icon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      Open live demo
                    </Button>
                    <Button
                      href={project.github}
                      variant="secondary"
                      external
                      icon={<GitHubIcon className="h-4 w-4" />}
                    >
                      View on GitHub
                    </Button>
                  </div>
                ) : (
                  <Button
                    href={project.github}
                    variant="primary"
                    external
                    icon={<GitHubIcon className="h-4 w-4" />}
                  >
                    View on GitHub
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 42,
                y: 18,
                rotateY: -8,
                rotateX: 3,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.012, rotateX: 1.2, rotateY: -1.2 }}
              style={{ perspective: 1400 }}
              className="min-w-0 transform-gpu"
            >
              <DashboardPlaceholder
                slug={project.slug}
                alt={`${project.title} â€” ${project.screenshotPlaceholder}`}
                variant="hero"
                label={project.shortTitle}
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Case study sections"
        className="sticky top-24 z-30 border-y border-white/10 bg-ink-950/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3 lg:px-8">
          {[
            ["Results", "#results"],
            ["Evidence", "#evidence"],
            ["Analysis", "#analysis"],
            ["Recommendations", "#recommendations"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-md px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 lg:px-8 md:py-20">
        <section id="results" aria-labelledby="results-title" className="scroll-mt-32">
          <div className="mb-8 border-b border-white/10 pb-7">
            <p className={chapterEyebrowClass}>Results snapshot</p>
            <h2 id="results-title" className={`mt-3 ${chapterHeadingClass}`}>
              Key metrics and analytical output
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

          {project.supportingScreenshots && project.supportingScreenshots.length > 0 && (
            <div
              className={`mt-10 grid gap-6 ${
                project.supportingScreenshots.length > 1 ? "lg:grid-cols-2" : ""
              }`}
            >
              {project.supportingScreenshots.map((screenshot) => (
                <figure key={screenshot.src} className="relative w-full">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-900/60 p-1.5 shadow-xl shadow-black/30">
                    <div className="relative h-[min(300px,45vh)] overflow-hidden rounded-lg border border-white/5 bg-navy-950 md:h-[340px]">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        className="object-contain p-3 sm:p-4"
                        sizes="(max-width: 1024px) 100vw, 560px"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 font-body text-sm leading-6 text-slate-400">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        <section
          id="evidence"
          aria-labelledby="project-evidence-title"
          className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-electric-500/30 bg-electric-500/10">
              <BadgeCheck className="h-5 w-5 text-electric-300" aria-hidden="true" />
            </div>
            <div>
              <p className={chapterEyebrowClass}>Evidence trail</p>
              <h2 id="project-evidence-title" className="mt-1 font-heading text-2xl font-bold leading-tight text-white">
                Project Evidence
              </h2>
            </div>
          </div>

          <GlassCard className="p-5 md:p-6" hover={false}>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="min-w-0 rounded-lg border border-white/10 bg-navy-950/45 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-bold leading-tight text-white">Project type</h3>
                </div>
                <p className="break-words font-body text-sm leading-6 text-slate-300">{project.projectType}</p>
              </article>

              <article className="min-w-0 rounded-lg border border-white/10 bg-navy-950/45 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <UserRound className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-bold leading-tight text-white">Contribution</h3>
                </div>
                <p className="break-words font-body text-sm leading-6 text-slate-300">{project.ownership}</p>
              </article>

              <article className="min-w-0 rounded-lg border border-white/10 bg-navy-950/45 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-bold leading-tight text-white">Dataset</h3>
                </div>
                <p className="break-words font-body text-sm leading-6 text-slate-300">{project.datasetDisclosure}</p>
              </article>

              <article className="min-w-0 rounded-lg border border-white/10 bg-navy-950/45 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-bold leading-tight text-white">Verifiable outputs</h3>
                </div>
                <ul className="space-y-2">
                  {project.evidence.map((item) => (
                    <li key={item} className="flex min-w-0 gap-2 font-body text-sm leading-6 text-slate-300">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-electric-400" aria-hidden="true" />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </GlassCard>

          {project.artifacts && project.artifacts.length > 0 && (
            <div id="inspect-the-work" aria-labelledby="inspect-the-work-title" className="mt-6 scroll-mt-28">
              <h3 id="inspect-the-work-title" className="font-heading text-xl font-bold leading-tight text-white">
                Inspect the work
              </h3>
              <p className="mt-2 font-body text-sm leading-6 text-slate-400">
                Open the underlying SQL, methodology, quality controls and analytical artifacts.
              </p>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {project.artifacts.map((artifact) => (
                  <li key={artifact.href} className="min-w-0">
                    <a
                      href={artifact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${artifact.label} (opens in a new tab)`}
                      className="group flex h-full min-w-0 flex-col rounded-lg border border-white/10 bg-navy-950/45 p-4 transition-colors duration-200 hover:border-electric-500/30 hover:bg-electric-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-300"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="break-words font-heading text-base font-bold leading-tight text-white">{artifact.label}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                      </span>
                      <span className="mt-3 break-words font-body text-sm leading-6 text-slate-400">{artifact.description}</span>
                      <span className="sr-only">Opens in a new tab</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="analysis" aria-labelledby="analysis-title" className="scroll-mt-32">
          <div className="mb-8 border-b border-white/10 pb-7">
            <p className={chapterEyebrowClass}>Analytical approach</p>
            <h2 id="analysis-title" className={`mt-3 ${chapterHeadingClass}`}>
              From business problem to decision insight
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard hover={false}>
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-electric-400" />
                <h3 className="font-heading text-lg font-bold leading-tight text-white">Business Problem</h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-slate-400">{project.businessProblem}</p>
            </GlassCard>

            <GlassCard hover={false} delay={0.05}>
              <div className="mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-electric-400" />
                <h3 className="font-heading text-lg font-bold leading-tight text-white">Tools</h3>
              </div>
              <ul className="space-y-2">
                {project.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 font-mono text-sm text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-electric-500" />
                    {tool}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {project.architecture && project.architecture.length > 0 && (
            <GlassCard className="mt-6" hover={false} delay={0.08}>
              <div className="mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-electric-400" />
                <h3 className="font-heading text-lg font-bold leading-tight text-white">Architecture</h3>
              </div>
              <ol className="space-y-3">
                {project.architecture.map((step, i) => (
                  <li key={step} className="flex gap-3 font-body text-sm leading-relaxed text-slate-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-electric-500/30 bg-electric-500/10 font-mono text-xs font-bold text-electric-300">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </GlassCard>
          )}

          <GlassCard className="mt-6" hover={false} delay={0.1}>
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-electric-400" />
              <h3 className="font-heading text-lg font-bold leading-tight text-white">Methodology</h3>
            </div>
            <ol className="space-y-3">
              {project.methodology.map((step, i) => (
                <li key={step} className="flex gap-3 font-body text-sm leading-relaxed text-slate-400">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-electric-500/30 bg-electric-500/10 font-mono text-xs font-bold text-electric-300">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </GlassCard>

          <GlassCard className="mt-6 border-electric-500/30 bg-electric-500/5" hover={false} delay={0.15}>
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-electric-400" />
              <h3 className="font-heading text-lg font-bold leading-tight text-white">Main Insight</h3>
            </div>
            <p className="font-body text-base leading-relaxed text-slate-300">{project.mainInsight}</p>
          </GlassCard>
        </section>

        <section id="recommendations" aria-labelledby="recommendations-title" className="scroll-mt-32 border-t border-white/10 pt-14">
          <div className="mb-8">
            <p className={chapterEyebrowClass}>Decision layer</p>
            <h2 id="recommendations-title" className={`mt-3 ${chapterHeadingClass}`}>
              Recommended business actions
            </h2>
          </div>

          <GlassCard hover={false} delay={0.2}>
            <h3 className="mb-4 font-heading text-lg font-bold leading-tight text-white">Business Recommendations</h3>
            <ul className="space-y-3">
              {project.recommendations.map((rec) => (
                <li key={rec} className="flex gap-3 font-body text-sm leading-relaxed text-slate-400">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400" />
                  {rec}
                </li>
              ))}
            </ul>
          </GlassCard>

          {project.limitations && project.limitations.length > 0 && (
            <GlassCard className="mt-6 border-amber-300/25 bg-amber-300/5" hover={false} delay={0.25}>
              <div className="mb-4 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-200" />
                <h3 className="font-heading text-lg font-bold leading-tight text-white">Limitations</h3>
              </div>
              <ul className="space-y-3">
                {project.limitations.map((limitation) => (
                  <li key={limitation} className="flex gap-3 font-body text-sm leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                    {limitation}
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}

          <div className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-12">
            {project.liveDemo && (
              <Button href={project.liveDemo} variant="primary" external icon={<ArrowUpRight className="h-4 w-4" />}>
                Open live demo
              </Button>
            )}
            <Button href={project.github} variant={project.liveDemo ? "secondary" : "primary"} external icon={<GitHubIcon className="h-4 w-4" />}>
              GitHub Repository
            </Button>
            <Button href="/#projects" variant="secondary">All Projects</Button>
          </div>
        </section>
      </div>
    </article>
  );
}
