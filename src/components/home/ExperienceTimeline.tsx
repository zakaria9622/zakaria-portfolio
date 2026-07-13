"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Database,
  Layers3,
} from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { experience } from "@/data/experience";

const experienceAccents = [
  {
    node: "border-cyan-200/40 bg-cyan-200/10 text-cyan-100",
    line: "from-cyan-200 via-cyan-300/70 to-transparent",
    bullet: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
    glow: "bg-cyan-300/15",
  },
  {
    node: "border-amber-200/40 bg-amber-200/10 text-amber-100",
    line: "from-amber-200 via-amber-300/70 to-transparent",
    bullet: "border-amber-200/25 bg-amber-200/10 text-amber-100",
    glow: "bg-amber-300/15",
  },
  {
    node: "border-emerald-200/40 bg-emerald-200/10 text-emerald-100",
    line: "from-emerald-200 via-emerald-300/70 to-transparent",
    bullet: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
    glow: "bg-emerald-300/15",
  },
] as const;

const experienceIcons = [Database, Layers3, BriefcaseBusiness] as const;

export function ExperienceTimeline() {
  const shouldReduceMotion = useReducedMotion() ?? false;
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-8 size-96 rounded-full bg-cyan-300/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-36 size-[28rem] rounded-full bg-electric-400/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="border-l border-cyan-200/30 bg-cyan-200/[0.055] px-5 py-4"
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

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 w-px bg-white/10 md:left-[14rem]"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 w-px origin-top bg-gradient-to-b from-cyan-200 via-electric-400 to-emerald-300 md:left-[14rem]"
            style={{ scaleY: shouldReduceMotion ? 1 : timelineProgress }}
          />

          <div className="space-y-8 md:space-y-10">
            {experience.map((job, index) => {
              const accent = experienceAccents[index % experienceAccents.length];
              const Icon = experienceIcons[index % experienceIcons.length];

              return (
                <div
                  key={job.company}
                  className="relative grid gap-5 pl-16 md:grid-cols-[14rem_1fr] md:gap-12 md:pl-0"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.65, rotate: -8 }
                    }
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.09,
                          }
                    }
                    className={`absolute left-0 top-0 z-10 flex size-11 items-center justify-center rounded-full border font-mono text-xs font-semibold tracking-[0.12em] shadow-lg md:left-[calc(14rem-22px)] ${accent.node}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>

                  <div className="min-w-0 pt-0.5 text-left md:pr-8 md:text-right">
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
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: 28, y: 18, scale: 0.985 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.006 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.58,
                            delay: 0.08 + index * 0.09,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-graphite-900/75 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-graphite-900/90 md:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`absolute -right-16 -top-16 size-40 rounded-full blur-3xl transition-opacity duration-200 group-hover:opacity-100 ${accent.glow}`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-white/25 transition-transform duration-300 group-hover:scale-x-100"
                    />

                    <div className="relative">
                      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
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

                      <div className="mt-7 border-t border-white/10 pt-5">
                        <p className="type-label text-slate-400">
                          Selected responsibilities
                        </p>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {job.highlights.map((highlight, highlightIndex) => (
                            <motion.li
                              key={highlight}
                              initial={
                                shouldReduceMotion ? false : { opacity: 0, y: 10 }
                              }
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-90px" }}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.38,
                                      delay:
                                        0.2 + index * 0.09 + highlightIndex * 0.045,
                                      ease: [0.22, 1, 0.36, 1],
                                    }
                              }
                              className="type-body-dense flex min-w-0 gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3.5 text-slate-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.055]"
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
