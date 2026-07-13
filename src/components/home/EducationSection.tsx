"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BrainCircuit, Building2, CalendarDays, GraduationCap } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { education } from "@/data/education";

const educationAccents = [
  {
    node:
      "border-cyan-200/35 bg-cyan-200/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]",
    icon: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
    line: "from-cyan-300/80 via-cyan-300/30 to-transparent",
    glow: "bg-cyan-300/10",
    date: "border-cyan-200/20 bg-cyan-200/[0.07] text-cyan-100",
    number: "text-cyan-200/[0.08]",
  },
  {
    node:
      "border-amber-200/35 bg-amber-200/10 text-amber-100 shadow-[0_0_28px_rgba(253,230,138,0.1)]",
    icon: "border-amber-200/25 bg-amber-200/10 text-amber-100",
    line: "from-amber-200/80 via-amber-200/30 to-transparent",
    glow: "bg-amber-200/10",
    date: "border-amber-200/20 bg-amber-200/[0.07] text-amber-100",
    number: "text-amber-200/[0.08]",
  },
  {
    node:
      "border-emerald-200/35 bg-emerald-200/10 text-emerald-100 shadow-[0_0_28px_rgba(110,231,183,0.1)]",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
    line: "from-emerald-300/80 via-emerald-300/30 to-transparent",
    glow: "bg-emerald-300/10",
    date: "border-emerald-200/20 bg-emerald-200/[0.07] text-emerald-100",
    number: "text-emerald-200/[0.08]",
  },
] as const;

const educationIcons = [BrainCircuit, Building2, GraduationCap] as const;

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
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
      className="relative overflow-hidden border-b border-white/10 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-36 size-96 rounded-full bg-cyan-300/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 -right-36 size-[30rem] rounded-full bg-electric-400/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/[0.035] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
              Academic Background
            </p>
            <AnimatedSectionHeading
              text="Education"
              className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-5xl"
            />
            <p className="mt-4 max-w-3xl font-body text-base leading-7 text-slate-400">
              Business education combined with specialized training in data management,
              analytics and artificial intelligence.
            </p>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 24, y: 8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="border-l border-cyan-200/30 bg-graphite-900/60 px-5 py-4 shadow-[0_18px_50px_rgba(34,211,238,0.06)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
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

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 w-px bg-white/10 md:hidden"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[21px] top-0 w-px origin-top bg-gradient-to-b from-cyan-300 via-amber-200 to-emerald-300 md:hidden"
            style={{ scaleY: shouldReduceMotion ? 1 : pathwayProgress }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[16.666%] right-[16.666%] top-[22px] hidden h-px bg-white/10 md:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[16.666%] right-[16.666%] top-[22px] hidden h-px origin-left bg-gradient-to-r from-cyan-300 via-amber-200 to-emerald-300 md:block"
            style={{ scaleX: shouldReduceMotion ? 1 : pathwayProgress }}
          />

          <ul className="relative grid gap-7 md:grid-cols-3 md:gap-5 lg:gap-7">
            {education.map((entry, index) => {
              const accent = educationAccents[index % educationAccents.length];
              const Icon = educationIcons[index % educationIcons.length];
              const milestoneNumber = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={`${entry.school}-${entry.program}`}
                  className="relative min-w-0 pl-16 md:pl-0"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : { opacity: 0, scale: 0.6, rotate: -10 }
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
                            delay: index * 0.1,
                          }
                    }
                    className={`absolute left-0 top-0 z-10 flex size-11 items-center justify-center rounded-full border font-mono text-xs font-semibold tracking-[0.12em] md:relative md:mx-auto ${accent.node}`}
                  >
                    {milestoneNumber}
                  </motion.div>

                  <motion.article
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 26, scale: 0.975 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -7,
                            scale: 1.008,
                            transition: { type: "spring", stiffness: 280, damping: 24 },
                          }
                    }
                    viewport={{ once: true, margin: "-90px" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.6,
                            delay: 0.1 + index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="group relative mt-0 h-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-graphite-900/75 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-graphite-900/90 md:mt-7 md:p-6 lg:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.line}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-80 ${accent.glow}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-4 top-2 select-none font-kpi text-6xl font-bold leading-none ${accent.number}`}
                    >
                      {milestoneNumber}
                    </span>
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${accent.line}`}
                    />

                    <div className="relative">
                      <div className={`flex size-11 items-center justify-center rounded-xl border ${accent.icon}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <p className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Academic program
                      </p>
                      <h3 className="mt-2 break-words font-heading text-xl font-semibold leading-tight text-white md:text-2xl">
                        {entry.program}
                      </h3>
                      <p className="mt-4 break-words font-body text-sm font-medium leading-6 text-cyan-100">
                        {entry.school}
                      </p>
                      <span className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-medium leading-5 ${accent.date}`}>
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
