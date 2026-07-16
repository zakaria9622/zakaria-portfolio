"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BrainCircuit, Building2, CalendarDays, GraduationCap } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { useHomeMotionSettings } from "@/components/home/motion";
import { education } from "@/data/education";

const educationAccents = [
  {
    node:
      "border-cyan-200/35 bg-cyan-200/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.06)]",
    icon: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
    line: "from-cyan-300/80 via-cyan-300/30 to-transparent",
    glow: "bg-cyan-300/[0.06]",
    date: "border-cyan-200/20 bg-cyan-200/[0.07] text-cyan-100",
    number: "text-cyan-200/[0.05]",
  },
  {
    node:
      "border-amber-200/35 bg-amber-200/10 text-amber-100 shadow-[0_0_18px_rgba(253,230,138,0.055)]",
    icon: "border-amber-200/25 bg-amber-200/10 text-amber-100",
    line: "from-amber-200/80 via-amber-200/30 to-transparent",
    glow: "bg-amber-200/[0.06]",
    date: "border-amber-200/20 bg-amber-200/[0.07] text-amber-100",
    number: "text-amber-200/[0.05]",
  },
  {
    node:
      "border-emerald-200/35 bg-emerald-200/10 text-emerald-100 shadow-[0_0_18px_rgba(110,231,183,0.055)]",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
    line: "from-emerald-300/80 via-emerald-300/30 to-transparent",
    glow: "bg-emerald-300/[0.06]",
    date: "border-emerald-200/20 bg-emerald-200/[0.07] text-emerald-100",
    number: "text-emerald-200/[0.05]",
  },
] as const;

const educationIcons = [BrainCircuit, Building2, GraduationCap] as const;

export function EducationSection() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 42%"],
  });
  const pathwayProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative overflow-hidden border-b border-white/10 py-14 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-cyan-300/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="type-label text-cyan-200/80">
              Academic Background
            </p>
            <AnimatedSectionHeading
              text="Education"
              className="type-section-title mt-4 font-heading text-white"
            />
            <p className="type-body mt-4 max-w-3xl text-slate-400">
              Business education combined with specialized training in data management,
              analytics and artificial intelligence.
            </p>
          </div>

          <motion.div
            initial={shouldSimplifyMotion ? false : { opacity: 0, x: 24, y: 8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={
              shouldSimplifyMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="hidden border-l border-cyan-200/30 bg-graphite-900/60 px-5 py-4 shadow-[0_18px_50px_rgba(34,211,238,0.06)] backdrop-blur-xl md:block"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="type-label text-cyan-100/70">
                  Academic trajectory
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-white">
                  {education.length} programs
                </p>
                <p className="mt-1 font-body text-sm leading-6 text-slate-300">
                  Economics, business and data specialization.
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/25 bg-cyan-200/10">
                <GraduationCap className="size-5 text-cyan-100" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-8 md:mt-14">
          <div
            aria-hidden="true"
            className="hidden"
          />
          <motion.div
            aria-hidden="true"
            className="hidden"
            style={{ scaleY: shouldSimplifyMotion ? 1 : pathwayProgress }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[16.666%] right-[16.666%] top-[22px] hidden h-px bg-white/10 md:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[16.666%] right-[16.666%] top-[22px] hidden h-px origin-left bg-gradient-to-r from-cyan-300 via-amber-200 to-emerald-300 md:block"
            style={{ scaleX: shouldSimplifyMotion ? 1 : pathwayProgress }}
          />

          <ul className="relative grid gap-3 md:grid-cols-3 md:gap-5 lg:gap-7">
            {education.map((entry, index) => {
              const accent = educationAccents[index % educationAccents.length];
              const Icon = educationIcons[index % educationIcons.length];
              const milestoneNumber = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={`${entry.school}-${entry.program}`}
                  className="relative min-w-0"
                >
                  <motion.div
                    initial={
                      shouldSimplifyMotion
                        ? { opacity: 1, scale: 1, rotate: 0 }
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
                            delay: index * 0.1,
                          }
                    }
                    className={`absolute left-0 top-0 z-10 hidden size-11 items-center justify-center rounded-full border font-mono text-xs font-semibold tracking-[0.12em] md:relative md:mx-auto md:flex ${accent.node}`}
                  >
                    {milestoneNumber}
                  </motion.div>

                  <motion.article
                    initial={
                      shouldSimplifyMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 26, scale: 0.975 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={
                      shouldSimplifyMotion
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.003,
                            transition: { type: "spring", stiffness: 280, damping: 24 },
                          }
                    }
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldSimplifyMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.6,
                            delay: 0.1 + index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="group relative h-auto min-w-0 overflow-hidden rounded-xl border border-white/10 bg-graphite-900/75 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-graphite-900/90 md:mt-7 md:h-full md:rounded-2xl md:p-6 lg:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-14 -top-14 size-36 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-45 ${accent.glow}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-4 top-2 hidden select-none font-kpi text-6xl font-bold leading-none md:block ${accent.number}`}
                    >
                      {milestoneNumber}
                    </span>
                    <div className="education-card-content relative">
                      <div className={`education-card-icon flex size-10 items-center justify-center rounded-lg border md:size-11 md:rounded-xl ${accent.icon}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <p className="education-card-label type-label mt-4 text-slate-400 md:mt-7">
                        Academic program
                      </p>
                      <h3 className="type-card-title mt-2 break-words font-heading text-white">
                        {entry.program}
                      </h3>
                      <p className="type-body-dense mt-2 font-medium text-cyan-100 md:mt-4">
                        {entry.school}
                      </p>
                      <span className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-medium leading-5 md:mt-5 ${accent.date}`}>
                        <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                        {entry.dates}
                      </span>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
