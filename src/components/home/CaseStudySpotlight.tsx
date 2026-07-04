"use client";

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { featuredProjects } from "@/data/projects";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import {
  enterEase,
  moveEase,
  useHomeMotionSettings,
} from "@/components/home/motion";

const imageBySlug: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

const projectEntrance = [
  { opacity: 0, x: -22, y: 10, scale: 0.992 },
  { opacity: 0, x: 22, y: 12, scale: 0.992 },
  { opacity: 0, x: -12, y: 18, scale: 0.994 },
  { opacity: 0, x: 0, y: 20, scale: 0.996 },
];

function reveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.46, delay, ease: enterEase },
  };
}

function projectReveal(shouldSimplifyMotion: boolean, index: number) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : projectEntrance[index % projectEntrance.length],
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true, margin: "-90px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.54, delay: index * 0.04, ease: moveEase },
  };
}

function metricReveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 8, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.26, delay, ease: enterEase },
  };
}

function DashboardSignalOverlay() {
  return (
    <svg
      className="premium-project-analytics-lines"
      viewBox="0 0 640 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M34 256 C122 214 166 242 238 184 S384 92 474 126 548 212 612 168" />
      <path d="M40 296 L126 260 L198 278 L284 214 L372 238 L458 180 L600 208" />
      <circle cx="238" cy="184" r="4" />
      <circle cx="474" cy="126" r="4" />
      <circle cx="600" cy="208" r="4" />
    </svg>
  );
}

function ProjectMicroVisualization({ slug }: { slug: string }) {
  if (slug === "funnel-analysis") {
    return (
      <svg
        className="project-micro-viz project-micro-viz-funnel"
        viewBox="0 0 150 92"
        aria-hidden="true"
      >
        <path pathLength={1} d="M20 18 H130 L108 40 H42 Z" />
        <path pathLength={1} d="M42 42 H108 L90 64 H60 Z" />
        <path pathLength={1} d="M60 66 H90 L80 82 H70 Z" />
        <circle cx="42" cy="29" r="3.5" />
        <circle cx="60" cy="53" r="3.5" />
        <circle cx="70" cy="74" r="3.5" />
      </svg>
    );
  }

  if (slug === "rfm-segmentation") {
    return (
      <svg
        className="project-micro-viz project-micro-viz-segments"
        viewBox="0 0 150 92"
        aria-hidden="true"
      >
        <path pathLength={1} d="M40 24 L78 18 L112 34 L98 68 L58 72 L30 48 Z" />
        <path pathLength={1} d="M40 24 L58 72 M78 18 L98 68 M112 34 L30 48" />
        <circle cx="40" cy="24" r="5" />
        <circle cx="78" cy="18" r="6" />
        <circle cx="112" cy="34" r="4.5" />
        <circle cx="98" cy="68" r="5" />
        <circle cx="58" cy="72" r="4.5" />
        <circle cx="30" cy="48" r="5.5" />
      </svg>
    );
  }

  if (slug === "renewalos") {
    return (
      <svg
        className="project-micro-viz project-micro-viz-optimisation"
        viewBox="0 0 150 92"
        aria-hidden="true"
      >
        <path pathLength={1} d="M20 70 C44 54 50 34 72 40 S104 62 130 22" />
        <path pathLength={1} d="M22 78 H130 M26 18 V78" />
        <circle cx="72" cy="40" r="4" />
        <circle cx="130" cy="22" r="5" />
      </svg>
    );
  }

  return (
    <svg
      className="project-micro-viz project-micro-viz-profit"
      viewBox="0 0 150 92"
      aria-hidden="true"
    >
      <path pathLength={1} d="M18 72 L42 58 L62 64 L84 42 L106 48 L132 22" />
      <path pathLength={1} d="M18 78 H132 M24 20 V78" />
      <circle cx="84" cy="42" r="4" />
      <circle cx="132" cy="22" r="5" />
    </svg>
  );
}

function DepthProjectCard({
  children,
  className,
  enableFinePointerMotion,
}: {
  children: ReactNode;
  className: string;
  enableFinePointerMotion: boolean;
}) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enableFinePointerMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
    event.currentTarget.style.setProperty("--shine-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--shine-y", `${y * 100}%`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--shine-x", "50%");
    event.currentTarget.style.setProperty("--shine-y", "0%");
  };

  return (
    <article
      className={`premium-project-card group ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          "--shine-x": "50%",
          "--shine-y": "0%",
        } as CSSProperties
      }
    >
      {children}
    </article>
  );
}

export function CaseStudySpotlight() {
  const { shouldSimplifyMotion, enableFinePointerMotion } =
    useHomeMotionSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const commandCenterActive = useInView(sectionRef, {
    margin: "180px 0px -160px 0px",
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 42%"],
  });
  const storyScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-command-active={
        commandCenterActive && !shouldSimplifyMotion ? "true" : "false"
      }
      className="case-study-experience relative py-20 md:py-28"
    >
      <div className="case-study-command-grid" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldSimplifyMotion)} className="mb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Case studies
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <AnimatedSectionHeading
              text="Business questions turned into measurable recommendations."
              className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl"
            />
            <p className="max-w-2xl font-body text-base leading-7 text-slate-400 lg:ml-auto">
              Each project keeps the line from raw data to stakeholder-ready output:
              SQL exploration, dashboarding, main insight, and a practical action plan.
            </p>
          </div>
        </motion.div>

        <div className="case-study-stage-grid">
          <aside className="case-study-story-rail" aria-hidden="true">
            <div className="case-study-story-track">
              <motion.div
                className="case-study-story-progress"
                style={
                  shouldSimplifyMotion
                    ? undefined
                    : { scaleY: storyScale, transformOrigin: "top" }
                }
              />
            </div>
            <div className="case-study-story-list">
              {featuredProjects.map((project) => (
                <div key={project.slug} className="case-study-story-stage">
                  <span>0{project.featuredOrder}</span>
                  <strong>{project.shortTitle}</strong>
                </div>
              ))}
            </div>
          </aside>

          <div className="case-study-cards space-y-7">
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
                <motion.div
                  key={project.slug}
                  {...projectReveal(shouldSimplifyMotion, index)}
                >
                  <DepthProjectCard
                    enableFinePointerMotion={enableFinePointerMotion}
                    className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-5"
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
                          <motion.p
                            {...metricReveal(
                              shouldSimplifyMotion,
                              0.12 + index * 0.03
                            )}
                            className={`mt-3 font-bold text-amber-100 ${
                              project.cardMetric
                                ? "font-body text-base leading-6 md:text-lg"
                                : "font-kpi text-2xl tabular-nums"
                            }`}
                          >
                            {cardMetric?.value}
                          </motion.p>
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
                    <div className="premium-project-media mt-5 overflow-hidden rounded-md border border-white/10 bg-ink-950 p-1.5 md:p-2">
                      <div className="relative aspect-[1088/513] w-full overflow-hidden rounded-sm">
                        <Image
                          src={imageSrc}
                          alt={`${project.title} dashboard screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="premium-project-image object-contain"
                        />
                      </div>
                      <DashboardSignalOverlay />
                      <ProjectMicroVisualization slug={project.slug} />
                    </div>
                  )}
                  </DepthProjectCard>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={project.slug}
                {...projectReveal(shouldSimplifyMotion, index)}
              >
                <DepthProjectCard
                  enableFinePointerMotion={enableFinePointerMotion}
                  className="grid gap-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:grid-cols-[0.95fr_1.05fr] md:p-5"
                >
                  <div className="premium-project-media relative min-h-64 overflow-hidden rounded-md border border-white/10 bg-ink-950 md:min-h-80">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={`${project.title} dashboard screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 590px"
                        className="premium-project-image object-contain p-3"
                      />
                    )}
                    <DashboardSignalOverlay />
                    <ProjectMicroVisualization slug={project.slug} />
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
                        <motion.p
                          {...metricReveal(
                            shouldSimplifyMotion,
                            0.12 + index * 0.03
                          )}
                          className={`mt-3 font-bold text-amber-100 ${
                            project.cardMetric
                              ? "font-body text-base leading-6 md:text-lg"
                              : "font-kpi text-2xl tabular-nums"
                          }`}
                        >
                          {cardMetric?.value}
                        </motion.p>
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
                </DepthProjectCard>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
