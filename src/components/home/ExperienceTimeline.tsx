"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Database,
  Layers3,
} from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { useHomeMotionSettings } from "@/components/home/motion";
import { experience } from "@/data/experience";

const experienceAccents = [
  {
    node: "border-cyan-200/40 bg-cyan-200/10 text-cyan-100",
    line: "from-cyan-200 via-cyan-300/70 to-transparent",
    bullet: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
    glow: "bg-cyan-300/[0.08]",
  },
  {
    node: "border-amber-200/40 bg-amber-200/10 text-amber-100",
    line: "from-amber-200 via-amber-300/70 to-transparent",
    bullet: "border-amber-200/25 bg-amber-200/10 text-amber-100",
    glow: "bg-amber-300/[0.08]",
  },
  {
    node: "border-emerald-200/40 bg-emerald-200/10 text-emerald-100",
    line: "from-emerald-200 via-emerald-300/70 to-transparent",
    bullet: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
    glow: "bg-emerald-300/[0.08]",
  },
] as const;

const experienceIcons = [Database, Layers3, BriefcaseBusiness] as const;

export function ExperienceTimeline() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();
  const [openExperiences, setOpenExperiences] = useState<Set<number>>(
    () => new Set([0])
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 38%"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    restDelta: 0.001,
  });

  function toggleExperience(index: number) {
    setOpenExperiences((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-14 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-12 size-80 rounded-full bg-cyan-300/[0.045] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,.8fr)] lg:items-end">
          <div>
            <p className="type-label text-cyan-200/80">
              Experience
            </p>
            <AnimatedSectionHeading
              text="Business, data & BI experience."
              className="type-section-title mt-4 max-w-3xl font-heading text-white"
            />
          </div>

          <motion.div
            initial={shouldSimplifyMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={
              shouldSimplifyMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="hidden border-l border-cyan-200/30 bg-cyan-200/[0.055] px-5 py-4 md:block"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="type-label text-cyan-100/70">
                  Professional trajectory
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-white">
                  {experience.length} experiences
                </p>
                <p className="type-body-dense mt-1 text-slate-300">
                  Business, marketing performance and data analytics.
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/25 bg-cyan-200/10">
                <BriefcaseBusiness className="size-5 text-cyan-100" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-8 md:mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 hidden w-px bg-white/10 md:block md:left-[14rem]"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 hidden w-px origin-top bg-gradient-to-b from-cyan-200 via-electric-400 to-emerald-300 md:block md:left-[14rem]"
            style={{ scaleY: shouldSimplifyMotion ? 1 : timelineProgress }}
          />

          <div className="space-y-3 md:space-y-10">
            {experience.map((job, index) => {
              const accent = experienceAccents[index % experienceAccents.length];
              const Icon = experienceIcons[index % experienceIcons.length];
              const isOpen = openExperiences.has(index);

              return (
                <div
                  key={job.company}
                  className="relative grid gap-0 md:grid-cols-[14rem_1fr] md:gap-12"
                >
                  <motion.div
                    initial={
                      shouldSimplifyMotion
                        ? false
                        : { opacity: 0, scale: 0.78, rotate: -4 }
                    }
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldSimplifyMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.09,
                          }
                    }
                    className={`absolute left-0 top-0 z-10 hidden size-11 items-center justify-center rounded-full border font-mono text-xs font-semibold tracking-[0.12em] shadow-lg md:left-[calc(14rem-22px)] md:flex ${accent.node}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>

                  <div className="hidden min-w-0 pt-0.5 text-left md:block md:pr-8 md:text-right">
                    {index === 0 && (
                      <span className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                        Latest experience
                      </span>
                    )}
                    <div className="mt-3 flex items-center gap-2 font-mono text-xs font-medium tracking-wide text-slate-300 md:justify-end">
                      <CalendarDays className="size-3.5 shrink-0 text-cyan-100/80" aria-hidden="true" />
                      <span>{job.dates}</span>
                    </div>
                  </div>

                  <motion.article
                    initial={
                      shouldSimplifyMotion
                        ? false
                        : { opacity: 0, x: 28, y: 18, scale: 0.985 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    whileHover={shouldSimplifyMotion ? undefined : { y: -2, scale: 1.002 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldSimplifyMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.58,
                            delay: 0.08 + index * 0.09,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="group relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-graphite-900/75 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-graphite-900/90 md:rounded-2xl md:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`absolute -right-16 -top-16 size-36 rounded-full opacity-[0.35] blur-3xl transition-opacity duration-200 group-hover:opacity-[0.55] ${accent.glow}`}
                    />

                    <div className="relative">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`experience-details-${index}`}
                        onClick={() => toggleExperience(index)}
                        className="flex min-h-11 w-full items-start gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 md:hidden"
                      >
                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${accent.bullet}`}>
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-heading text-lg font-semibold leading-tight text-white">
                              {job.company}
                            </span>
                            {index === 0 && (
                              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                                Latest
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block font-body text-base font-medium leading-snug text-cyan-100">
                            {job.role}
                          </span>
                          <span className="mt-2 flex items-center gap-2 font-mono text-xs text-slate-400">
                            <CalendarDays className="size-3.5" aria-hidden="true" />
                            {job.dates}
                          </span>
                        </span>
                        <ChevronDown
                          className={`mt-1 size-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      <div className="hidden gap-5 sm:grid-cols-[auto_1fr] sm:items-start md:grid">
                        <div className={`flex size-11 items-center justify-center rounded-xl border ${accent.bullet}`}>
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="type-label text-slate-400">
                            Professional experience
                          </p>
                          <h3 className="type-card-title mt-2 font-heading text-white">
                            {job.company}
                          </h3>
                          <p className="mt-2 font-body text-base font-medium leading-7 text-cyan-100">
                            {job.role}
                          </p>
                        </div>
                      </div>

                      <div
                        id={`experience-details-${index}`}
                        className={`${isOpen ? "block" : "hidden"} mt-4 border-t border-white/10 pt-4 md:mt-7 md:block md:pt-5`}
                      >
                        <p className="type-label text-slate-400">
                          Selected responsibilities
                        </p>
                        <ul className="mt-3 grid gap-2 md:mt-4 md:gap-3 sm:grid-cols-2">
                          {job.highlights.map((highlight, highlightIndex) => (
                            <motion.li
                              key={highlight}
                              initial={
                                shouldSimplifyMotion ? false : { opacity: 0, y: 10 }
                              }
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-90px" }}
                              transition={
                                shouldSimplifyMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.38,
                                      delay:
                                        0.2 + index * 0.09 + highlightIndex * 0.045,
                                      ease: [0.22, 1, 0.36, 1],
                                    }
                              }
                              className="type-body-dense flex min-w-0 gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-slate-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.055] md:rounded-xl md:p-3.5"
                            >
                              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border ${accent.bullet}`}>
                                <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                              </span>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
