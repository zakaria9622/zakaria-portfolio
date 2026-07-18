"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  ChartNoAxesCombined,
  Check,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";
import { skillsByCategory } from "@/data/skills";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import { useHomeMotionSettings } from "@/components/home/motion";

const categoryIcons = [Database, ChartNoAxesCombined, BarChart3] as const;

const categoryAccents = [
  {
    selector: "border-cyan-200/30 bg-cyan-200/[0.07] text-cyan-50",
    icon: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
    glow: "bg-cyan-300/[0.06]",
    chip: "border-cyan-200/20 bg-cyan-200/[0.06] text-cyan-50",
    line: "from-cyan-300/80 via-cyan-300/25 to-transparent",
    count: "border-cyan-200/20 bg-cyan-200/10 text-cyan-100",
  },
  {
    selector: "border-amber-200/30 bg-amber-200/[0.07] text-amber-50",
    icon: "border-amber-200/25 bg-amber-200/10 text-amber-100",
    glow: "bg-amber-200/[0.06]",
    chip: "border-amber-200/20 bg-amber-200/[0.06] text-amber-50",
    line: "from-amber-200/80 via-amber-200/25 to-transparent",
    count: "border-amber-200/20 bg-amber-200/10 text-amber-100",
  },
  {
    selector: "border-emerald-200/30 bg-emerald-200/[0.07] text-emerald-50",
    icon: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
    glow: "bg-emerald-300/[0.06]",
    chip: "border-emerald-200/20 bg-emerald-200/[0.06] text-emerald-50",
    line: "from-emerald-300/80 via-emerald-300/25 to-transparent",
    count: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
  },
] as const;

const proofNotes = [
  "Connects acquisition, conversion, segmentation and retention signals to growth priorities.",
  "Turns raw data into trusted KPIs, models and dashboards.",
  "Turns findings into actions for growth, profitability and customer performance.",
] as const;

export function SkillProofMatrix() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();
  const [activeIndex, setActiveIndex] = useState(0);
  const selectorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeGroup = skillsByCategory[activeIndex];
  const ActiveIcon = categoryIcons[activeIndex] ?? Layers3;
  const activeAccent = categoryAccents[activeIndex] ?? categoryAccents[0];

  function selectCategory(index: number, focus = false) {
    setActiveIndex(index);
    if (focus) selectorRefs.current[index]?.focus();
  }

  function handleSelectorKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    const lastIndex = skillsByCategory.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectCategory(nextIndex, true);
    }
  }

  const panelTransition = shouldSimplifyMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-14 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div>
          <p className="type-label text-cyan-200/80">Skill proof matrix</p>
          <AnimatedSectionHeading
            text="Tools as evidence, not keyword lists."
            className="type-section-title mt-4 max-w-3xl font-heading text-white"
          />
        </div>

        <div className="mt-8 grid gap-3 md:mt-14 md:gap-5 lg:grid-cols-[0.68fr_1.32fr] lg:gap-7">
          <div
            role="tablist"
            aria-label="Skill domains"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
          >
            {skillsByCategory.map((group, index) => {
              const Icon = categoryIcons[index] ?? Layers3;
              const accent = categoryAccents[index] ?? categoryAccents[0];
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={group.category}
                  type="button"
                  role="tab"
                  id={`skill-domain-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`skill-domain-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(element) => { selectorRefs.current[index] = element; }}
                  onClick={() => selectCategory(index)}
                  onFocus={() => selectCategory(index)}
                  onMouseEnter={() => selectCategory(index)}
                  onKeyDown={(event) => handleSelectorKeyDown(event, index)}
                  initial={shouldSimplifyMotion ? false : { opacity: 0, x: -18, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={shouldSimplifyMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative min-h-11 min-w-max overflow-hidden rounded-md border border-white/10 bg-graphite-900/65 px-3 py-2 text-left transition-colors duration-200 hover:border-white/20 hover:bg-graphite-900/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:min-w-[17rem] md:rounded-xl md:p-4 lg:min-w-0"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-skill-domain"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md border border-cyan-200/20 bg-cyan-200/[0.045] shadow-[0_0_24px_rgba(34,211,238,0.04)] md:rounded-xl"
                      transition={shouldSimplifyMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-between gap-3 md:items-start md:gap-4">
                    <span className="flex items-center gap-2 md:gap-3">
                      <span className={`flex size-8 items-center justify-center rounded-md border md:size-10 md:rounded-xl ${isActive ? accent.icon : "border-white/10 bg-white/[0.04] text-slate-300"}`}>
                        <Icon className="size-4 md:size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="hidden font-mono text-xs font-semibold text-slate-500 md:inline">{String(index + 1).padStart(2, "0")}</span>
                        <span className={`block whitespace-nowrap font-heading text-sm font-semibold leading-snug md:mt-1 md:text-base ${isActive ? "text-white" : "text-slate-300"}`}>{group.category}</span>
                      </span>
                    </span>
                    <span className={`hidden rounded-full border px-2.5 py-1 font-mono text-xs font-semibold md:inline-flex ${isActive ? accent.count : "border-white/10 bg-white/[0.04] text-slate-400"}`}>{group.skills.length} skills</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeGroup.category}
              role="tabpanel"
              id={`skill-domain-panel-${activeIndex}`}
              aria-labelledby={`skill-domain-tab-${activeIndex}`}
              tabIndex={0}
              initial={shouldSimplifyMotion ? false : { opacity: 0, x: 12, y: 6, scale: 0.995 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={shouldSimplifyMotion ? { opacity: 0 } : { opacity: 0, x: -8, y: -2, scale: 0.998 }}
              transition={panelTransition}
              className="relative min-h-0 overflow-hidden rounded-xl border border-white/10 bg-graphite-900/75 p-4 shadow-[0_20px_65px_rgba(0,0,0,0.22)] backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:min-h-[28rem] md:rounded-2xl md:p-7 lg:p-8"
            >
              <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${activeAccent.line}`} />
              <div aria-hidden="true" className={`pointer-events-none absolute -right-14 -top-14 size-40 rounded-full opacity-70 blur-3xl ${activeAccent.glow}`} />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.016] [background-image:linear-gradient(to_right,rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:40px_40px]" />
              <span aria-hidden="true" className="pointer-events-none absolute right-5 top-3 select-none font-kpi text-7xl font-bold leading-none text-white/[0.035] md:text-8xl">{String(activeIndex + 1).padStart(2, "0")}</span>

              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3 md:gap-5">
                  <div className="flex min-w-0 items-start gap-3 md:gap-4">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg border md:size-12 md:rounded-xl ${activeAccent.icon}`}>
                      <ActiveIcon className="size-5 md:size-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="type-label text-slate-400">Selected competency domain</p>
                      <h3 className="type-card-title mt-2 font-heading text-white">{activeGroup.category}</h3>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${activeAccent.count}`}>{activeGroup.skills.length} skills</span>
                </div>

                <div className={`mt-4 rounded-lg border bg-white/[0.035] p-3 md:mt-8 md:rounded-xl md:p-5 ${activeAccent.chip}`}>
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border ${activeAccent.icon}`}>
                      <Sparkles className="size-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="type-label text-slate-400">Evidence connection</p>
                      <p className="type-body mt-2 max-w-3xl text-slate-200 md:mt-3">{proofNotes[activeIndex]}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 md:mt-8">
                  <p className="type-label text-slate-400">Tools and capabilities</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-3 xl:grid-cols-3">
                    {activeGroup.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={shouldSimplifyMotion ? false : { opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={shouldSimplifyMotion ? undefined : { y: -1 }}
                        transition={shouldSimplifyMotion ? { duration: 0 } : { duration: 0.26, delay: 0.06 + skillIndex * 0.035, ease: [0.22, 1, 0.36, 1] }}
                        className={`group flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2.5 font-mono text-[13px] font-medium transition-colors duration-200 hover:bg-white/[0.06] md:min-h-14 md:rounded-xl md:px-4 md:py-3 ${activeAccent.chip}`}
                      >
                        <span className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${activeAccent.icon}`}><Check className="size-3" strokeWidth={2.5} aria-hidden="true" /></span>
                        <span className="min-w-0 break-words">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="skill-panel-footer mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4 md:mt-auto md:gap-4 md:pt-6">
                  <div>
                    <p className="type-label text-slate-500">Portfolio evidence model</p>
                    <p className="type-body-dense mt-1 text-slate-400">Tools → analysis → business output</p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-slate-500">{activeIndex + 1} / {skillsByCategory.length}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
