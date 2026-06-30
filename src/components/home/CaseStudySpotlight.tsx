"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { featuredProjects } from "@/data/projects";

const imageBySlug: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

function reveal(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.5, delay },
  };
}

export function CaseStudySpotlight() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldReduceMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Case studies
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              Business questions turned into measurable recommendations.
            </h2>
            <p className="max-w-2xl font-body text-base leading-7 text-slate-400 lg:ml-auto">
              Each project keeps the line from raw data to stakeholder-ready output:
              SQL exploration, dashboarding, main insight, and a practical action plan.
            </p>
          </div>
        </motion.div>

        <div className="space-y-5">
          {featuredProjects.map((project, index) => {
            const highlightedKpi =
              project.kpis.find((kpi) => kpi.highlight) ?? project.kpis[0];
            const cardMetric = project.cardMetric ?? highlightedKpi;
            const scopeBadge = project.cardScope ??
              (project.scope ? `Scope: ${project.scope}` : undefined);
            const imageSrc = imageBySlug[project.slug];
            const isRenewalOS = project.slug === "renewalos";

            if (isRenewalOS) {
              return (
                <motion.article
                  key={project.slug}
                  {...reveal(shouldReduceMotion, index * 0.08)}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 transition-colors duration-200 hover:border-cyan-200/25 hover:bg-white/[0.055] md:p-5"
                >
                  <div className="flex flex-col gap-8 p-1 md:p-3">
                    <div>
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-100">
                          0{project.featuredOrder}
                        </span>
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-xs font-medium text-slate-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                        {project.title}
                      </h3>

                      {project.summary && (
                        <p className="mt-4 max-w-4xl font-body text-sm leading-7 text-slate-400">
                          {project.summary}
                        </p>
                      )}

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-white/10 bg-ink-950/55 p-4">
                          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            <Target className="size-3.5 text-cyan-200" />
                            Business question
                          </p>
                          <p className="mt-3 font-body text-sm leading-6 text-slate-200">
                            {project.businessQuestion}
                          </p>
                        </div>
                        <div className="rounded-md border border-amber-200/20 bg-amber-200/10 p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100/70">
                            {project.cardMetric
                              ? project.cardMetric.label
                              : "Key metric"}
                          </p>
                          <p
                            className={`mt-3 font-bold text-amber-100 ${
                              project.cardMetric
                                ? "font-body text-base leading-6 md:text-lg"
                                : "font-kpi text-2xl tabular-nums"
                            }`}
                          >
                            {cardMetric?.value}
                          </p>
                          {!project.cardMetric && (
                            <p className="mt-1 font-mono text-sm text-amber-50/70">
                              {cardMetric?.label}
                            </p>
                          )}
                        </div>
                      </div>

                      {scopeBadge && (
                        <p className="mt-4 inline-flex rounded-md border border-emerald-200/20 bg-emerald-200/10 px-3 py-2 font-mono text-sm font-medium text-emerald-100">
                          {scopeBadge}
                        </p>
                      )}

                      <p className="mt-5 max-w-4xl font-body text-sm leading-7 text-slate-400">
                        {project.mainInsight}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-body text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                        >
                          Open live demo
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      <Link
                        href={project.href}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-body text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                      >
                        View case study
                        <ArrowUpRight className="size-4" />
                      </Link>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 font-body text-sm font-semibold leading-none text-slate-200 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                      >
                        <GitHubIcon className="size-4" />
                        Repository
                      </a>
                    </div>
                  </div>

                  {imageSrc && (
                    <div className="mt-5 overflow-hidden rounded-md border border-white/10 bg-ink-950 p-1.5 md:p-2">
                      <div className="relative aspect-[1088/513] w-full overflow-hidden rounded-sm">
                        <Image
                          src={imageSrc}
                          alt={`${project.title} dashboard screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            }

            return (
              <motion.article
                key={project.slug}
                {...reveal(shouldReduceMotion, index * 0.08)}
                className="group grid gap-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 transition-colors duration-200 hover:border-cyan-200/25 hover:bg-white/[0.055] md:grid-cols-[0.95fr_1.05fr] md:p-5"
              >
                <div className="relative min-h-64 overflow-hidden rounded-md border border-white/10 bg-ink-950 md:min-h-80">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={`${project.title} dashboard screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 590px"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between gap-8 p-1 md:p-3">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-100">
                        0{project.featuredOrder}
                      </span>
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-xs font-medium text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                      {project.title}
                    </h3>

                    {project.summary && (
                      <p className="mt-4 font-body text-sm leading-7 text-slate-400">
                        {project.summary}
                      </p>
                    )}

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-md border border-white/10 bg-ink-950/55 p-4">
                        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          <Target className="size-3.5 text-cyan-200" />
                          Business question
                        </p>
                        <p className="mt-3 font-body text-sm leading-6 text-slate-200">
                          {project.businessQuestion}
                        </p>
                      </div>
                      <div className="rounded-md border border-amber-200/20 bg-amber-200/10 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100/70">
                          {project.cardMetric ? project.cardMetric.label : "Key metric"}
                        </p>
                        <p
                          className={`mt-3 font-bold text-amber-100 ${
                            project.cardMetric
                              ? "font-body text-base leading-6 md:text-lg"
                              : "font-kpi text-2xl tabular-nums"
                          }`}
                        >
                          {cardMetric?.value}
                        </p>
                        {!project.cardMetric && (
                          <p className="mt-1 font-mono text-sm text-amber-50/70">
                            {cardMetric?.label}
                          </p>
                        )}
                      </div>
                    </div>

                    {scopeBadge && (
                      <p className="mt-4 inline-flex rounded-md border border-emerald-200/20 bg-emerald-200/10 px-3 py-2 font-mono text-sm font-medium text-emerald-100">
                        {scopeBadge}
                      </p>
                    )}

                    <p className="mt-5 font-body text-sm leading-7 text-slate-400">
                      {project.mainInsight}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={project.href}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-body text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                    >
                      View case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 font-body text-sm font-semibold leading-none text-slate-200 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                    >
                      <GitHubIcon className="size-4" />
                      Repository
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
