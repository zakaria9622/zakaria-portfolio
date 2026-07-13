"use client";

import { motion } from "framer-motion";
import { Database, LayoutDashboard, Lightbulb, Search } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";
import {
  enterEase,
  moveEase,
  useHomeMotionSettings,
} from "@/components/home/motion";

const steps = [
  {
    title: "Question",
    text: "Frame the business problem before touching the dashboard layer.",
    icon: Search,
    accent: "text-cyan-200",
  },
  {
    title: "SQL model",
    text: "Build reliable metrics with SQL, DuckDB, Python, and clear assumptions.",
    icon: Database,
    accent: "text-emerald-200",
  },
  {
    title: "Dashboard",
    text: "Turn the analysis into focused Tableau views and stakeholder-ready KPIs.",
    icon: LayoutDashboard,
    accent: "text-amber-200",
  },
  {
    title: "Recommendation",
    text: "Translate the pattern into a decision: pricing, funnel, or CRM action.",
    icon: Lightbulb,
    accent: "text-coral-200",
  },
];

const stepEntrance = [
  { opacity: 0, x: -14, y: 8 },
  { opacity: 0, x: 0, y: 16 },
  { opacity: 0, x: 0, y: 16 },
  { opacity: 0, x: 14, y: 8 },
];

function reveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.44, delay, ease: enterEase },
  };
}

function stepReveal(shouldSimplifyMotion: boolean, index: number) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : stepEntrance[index % stepEntrance.length],
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.38, delay: 0.08 + index * 0.06, ease: moveEase },
  };
}

function connectorReveal(shouldSimplifyMotion: boolean, axis: "x" | "y") {
  const hidden =
    axis === "x" ? { opacity: 0, scaleX: 0 } : { opacity: 0, scaleY: 0 };
  const visible =
    axis === "x" ? { opacity: 1, scaleX: 1 } : { opacity: 1, scaleY: 1 };

  return {
    initial: shouldSimplifyMotion ? visible : hidden,
    whileInView: visible,
    viewport: { once: true, margin: "-80px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.58, delay: 0.06, ease: moveEase },
  };
}

function pathReveal(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1, pathLength: 1 }
      : { opacity: 0, pathLength: 0 },
    whileInView: { opacity: 1, pathLength: 1 },
    viewport: { once: true, margin: "-90px" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.82, delay, ease: moveEase },
  };
}

export function ProcessTimeline() {
  const { shouldSimplifyMotion } = useHomeMotionSettings();

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...reveal(shouldSimplifyMotion)} className="mb-12">
          <p className="type-label text-cyan-200/80">
            Analytics process
          </p>
          <AnimatedSectionHeading
            text="A repeatable path from question to action."
            className="type-section-title mt-4 max-w-3xl font-heading text-white"
          />
        </motion.div>

        <div className="process-flow relative grid gap-3 md:grid-cols-4">
          <motion.div
            {...connectorReveal(shouldSimplifyMotion, "y")}
            className="process-flow-line process-flow-line-mobile"
            aria-hidden="true"
          />
          <motion.div
            {...connectorReveal(shouldSimplifyMotion, "x")}
            className="process-flow-line process-flow-line-desktop"
            aria-hidden="true"
          />
          <svg
            className="process-map-lines"
            viewBox="0 0 1120 260"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              {...pathReveal(shouldSimplifyMotion, 0.08)}
              className="process-map-path process-map-path-primary"
              d="M62 82 C186 20 270 148 386 90 S574 34 690 112 874 198 1058 88"
            />
            <motion.path
              {...pathReveal(shouldSimplifyMotion, 0.2)}
              className="process-map-path process-map-path-secondary"
              d="M62 170 C196 216 288 132 414 172 S626 236 742 152 908 80 1058 150"
            />
            {[62, 386, 690, 1058].map((x, index) => (
              <motion.circle
                key={x}
                initial={
                  shouldSimplifyMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.72 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={
                  shouldSimplifyMotion
                    ? { duration: 0 }
                    : { duration: 0.28, delay: 0.2 + index * 0.08, ease: enterEase }
                }
                className="process-map-node"
                cx={x}
                cy={index % 2 === 0 ? 82 : 90}
                r="7"
              />
            ))}
          </svg>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                {...stepReveal(shouldSimplifyMotion, index)}
                className="process-step-card relative rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    0{index + 1}
                  </span>
                  <Icon className={`size-5 ${step.accent}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="type-body-dense mt-3 text-slate-400">
                  {step.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
