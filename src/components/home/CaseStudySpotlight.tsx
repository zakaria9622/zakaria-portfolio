"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import { ProjectImageLightbox } from "@/components/project/ProjectImageLightbox";
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

const projectImagePresentation: Record<string, { className: string }> = {
  "profit-leak": {
    className: "object-cover object-center md:object-contain",
  },
  "funnel-analysis": {
    className: "object-cover object-[center_46%] md:object-contain",
  },
  "rfm-segmentation": {
    className: "object-cover object-[center_52%] md:object-contain",
  },
  renewalos: {
    className: "object-cover object-center",
  },
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
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <article className={`premium-project-card group ${className}`}>
      {children}
    </article>
  );
}

export function CaseStudySpotlight() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();
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
      className="case-study-experience relative py-14 md:py-28"
    >
      <div className="case-study-command-grid" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div {...reveal(shouldSimplifyMotion)} className="mb-8 md:mb-12">
          <p className="type-label text-cyan-200/80">
            Case studies
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <AnimatedSectionHeading
              text="Growth questions turned into measurable recommendations."
              className="type-section-title font-heading text-white"
            />
            <p className="type-body max-w-2xl text-slate-400 lg:ml-auto">
              Each case study connects analysis to a clear growth decision.
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

          <div className="case-study-cards space-y-4 md:space-y-7">
          {featuredProjects.map((project, index) => {
            const highlightedKpi =
              project.kpis.find((kpi) => kpi.highlight) ?? project.kpis[0];
            const cardMetric = project.cardMetric ?? highlightedKpi;
            const imageSrc = imageBySlug[project.slug];
            const imagePresentation = projectImagePresentation[project.slug];
            const isRenewalOS = project.slug === "renewalos";

            if (isRenewalOS) {
              return (
                <motion.div
                  key={project.slug}
                  {...projectReveal(shouldSimplifyMotion, index)}
                >
                  <DepthProjectCard
                    className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-5"
                  >
                    <div className="flex flex-col gap-5 p-0 md:gap-8 md:p-3">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5 md:gap-3">
                        <span className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-100">
                          {project.featuredCategory}
                        </span>
                      </div>

                      <h3 className="type-card-title font-heading text-white">
                        {project.title}
                      </h3>

                      <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-3">
                        <div className="question-block rounded-md border border-white/10 bg-ink-950/55 p-4">
                          <p className="type-label flex items-center gap-2 text-slate-400">
                            <Target className="size-3.5 text-cyan-200" />
                            Business question
                          </p>
                          <p className="type-question mt-3 text-slate-100">
                            {project.featuredBusinessQuestion ?? project.businessQuestion}
                          </p>
                        </div>
                        <div className="kpi-highlight-block rounded-md border border-amber-200/20 bg-amber-200/10 p-4">
                          <p className="type-label text-amber-100/70">
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
                            {project.slug === "rfm-segmentation" ? (
                              <>
                                <span className="block md:hidden">27.9% customers</span>
                                <span className="mt-1 block md:hidden">75.4% revenue</span>
                                <span className="hidden md:inline">{cardMetric?.value}</span>
                              </>
                            ) : (
                              cardMetric?.value
                            )}
                          </motion.p>
                          {!project.cardMetric && (
                            <p className="mt-1 font-mono text-sm text-amber-50/70">
                              {cardMetric?.label}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="mobile-project-conclusion insight-block type-insight mt-4 max-w-4xl md:mt-5">
                        {project.featuredInsight ?? project.mainInsight}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={project.href}
                        prefetch={false}
                        className="mobile-project-primary-link inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-cta text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:min-h-0"
                      >
                        View case study
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>

                  {imageSrc && (
                    <div className="premium-project-media relative order-first overflow-hidden rounded-md border border-white/10 bg-ink-950 p-1 md:order-none md:mt-5 md:p-2">
                      <div className="relative aspect-[1088/513] w-full overflow-hidden rounded-sm">
                        <Image
                          src={imageSrc}
                          alt={`${project.title} dashboard screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className={`premium-project-image ${imagePresentation.className}`}
                        />
                      </div>
                      <DashboardSignalOverlay />
                      <ProjectMicroVisualization slug={project.slug} />
                      <ProjectImageLightbox
                        src={imageSrc}
                        alt={`${project.title} dashboard screenshot`}
                        triggerLabel={`Expand ${project.title} dashboard preview`}
                      />
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
                  className="grid gap-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:grid-cols-[1.15fr_0.85fr] md:p-5 xl:grid-cols-[1.25fr_0.75fr]"
                >
                  <div className="premium-project-media relative aspect-[16/10] min-h-0 min-w-0 w-full overflow-hidden rounded-md border border-white/10 bg-ink-950 sm:min-h-[19rem] md:min-h-[24rem] xl:min-h-[27rem]">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={`${project.title} dashboard screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 760px"
                        className={`premium-project-image ${imagePresentation.className}`}
                      />
                    )}
                    <DashboardSignalOverlay />
                    <ProjectMicroVisualization slug={project.slug} />
                    {imageSrc && (
                      <ProjectImageLightbox
                        src={imageSrc}
                        alt={`${project.title} dashboard screenshot`}
                        triggerLabel={`Expand ${project.title} dashboard preview`}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-5 p-0 md:gap-8 md:p-3">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5 md:gap-3">
                      <span className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-100">
                        {project.featuredCategory}
                      </span>
                    </div>

                    <h3 className="type-card-title font-heading text-white">
                      {project.title}
                    </h3>

                    <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-3">
                      <div className="question-block rounded-md border border-white/10 bg-ink-950/55 p-4">
                        <p className="type-label flex items-center gap-2 text-slate-400">
                          <Target className="size-3.5 text-cyan-200" />
                          Business question
                        </p>
                        <p className="type-question mt-3 text-slate-100">
                          {project.featuredBusinessQuestion ?? project.businessQuestion}
                        </p>
                      </div>
                      <div className="kpi-highlight-block rounded-md border border-amber-200/20 bg-amber-200/10 p-4">
                        <p className="type-label text-amber-100/70">
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
                          {project.slug === "rfm-segmentation" ? (
                            <>
                              <span className="block md:hidden">27.9% customers</span>
                              <span className="mt-1 block md:hidden">75.4% revenue</span>
                              <span className="hidden md:inline">{cardMetric?.value}</span>
                            </>
                          ) : (
                            cardMetric?.value
                          )}
                        </motion.p>
                        {!project.cardMetric && (
                          <p className="mt-1 font-mono text-sm text-amber-50/70">
                            {cardMetric?.label}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="mobile-project-conclusion insight-block type-insight mt-4 md:mt-5">
                      {project.featuredInsight ?? project.mainInsight}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={project.href}
                      prefetch={false}
                      className="mobile-project-primary-link inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-cta text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:min-h-0"
                    >
                      View case study
                      <ArrowUpRight className="size-4" />
                    </Link>
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
