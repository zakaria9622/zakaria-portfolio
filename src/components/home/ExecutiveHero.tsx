"use client";

import dynamic from "next/dynamic";
import { type CSSProperties, type PointerEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Download,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { enterEase, useHomeMotionSettings } from "@/components/home/motion";
import { useMagneticTargets } from "@/components/ui/useMagneticTargets";

const previewProject = featuredProjects[0];

const DataIntelligenceCore = dynamic(
  () =>
    import("@/components/home/DataIntelligenceCore").then(
      (mod) => mod.DataIntelligenceCore
    ),
  {
    ssr: false,
    loading: () => <DataCoreFallback />,
  }
);

const heroMetrics = [
  { label: "Orders", value: "12K", tone: "text-cyan-200" },
  { label: "Revenue", value: "EUR 2.05M", tone: "text-amber-200" },
  { label: "Margin", value: "10.42%", tone: "text-emerald-200" },
];

function heroItem(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.52, delay, ease: enterEase },
  };
}

function heroPreview(shouldSimplifyMotion: boolean) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 18, scale: 0.992 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.62, delay: 0.1, ease: enterEase },
  };
}

function metricMotion(shouldSimplifyMotion: boolean, delay = 0) {
  return {
    initial: shouldSimplifyMotion ? { opacity: 1 } : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : { duration: 0.28, delay, ease: enterEase },
  };
}

function headlineWord(shouldSimplifyMotion: boolean, index: number) {
  return {
    initial: shouldSimplifyMotion
      ? { opacity: 1 }
      : { opacity: 0, y: "112%", filter: "blur(8px)" },
    animate: { opacity: 1, y: "0%", filter: "blur(0px)" },
    transition: shouldSimplifyMotion
      ? { duration: 0 }
      : {
          duration: 0.72,
          delay: 0.12 + index * 0.08,
          ease: enterEase,
        },
  };
}

function HeroAnalyticalBackground({
  shouldSimplifyMotion,
}: {
  shouldSimplifyMotion: boolean;
}) {
  return (
    <div
      className="hero-analytics-field pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
      >
        <motion.g
          className="hero-signal-layer"
          initial={
            shouldSimplifyMotion ? { opacity: 0.54 } : { opacity: 0, x: -18 }
          }
          animate={{ opacity: 0.54, x: 0 }}
          transition={
            shouldSimplifyMotion
              ? { duration: 0 }
              : { duration: 0.75, delay: 0.12, ease: enterEase }
          }
        >
          <path
            d="M80 505 C245 455 310 520 455 462 S735 312 902 354 1148 515 1360 432"
            className="hero-signal-line hero-signal-line-primary"
          />
          <path
            d="M114 365 C275 314 391 358 510 326 S736 205 905 246 1174 368 1320 297"
            className="hero-signal-line hero-signal-line-secondary"
          />
          <path
            d="M164 587 L310 532 L455 556 L612 472 L784 498 L930 424 L1115 452 L1300 378"
            className="hero-signal-line hero-signal-line-steps"
          />
        </motion.g>
      </svg>
    </div>
  );
}

function DataCoreFallback() {
  return (
    <div className="data-core-fallback" aria-hidden="true">
      <svg viewBox="0 0 720 620" role="presentation">
        <defs>
          <radialGradient id="core-fallback-glow" cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.28" />
            <stop offset="48%" stopColor="#22c55e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#06070a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-fallback-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="52%" stopColor="#f2a93b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <rect width="720" height="620" fill="url(#core-fallback-glow)" />
        <g className="core-fallback-grid" opacity="0.28">
          {Array.from({ length: 11 }).map((_, index) => (
            <path
              key={`h-${index}`}
              d={`M96 ${120 + index * 38} H624`}
            />
          ))}
          {Array.from({ length: 11 }).map((_, index) => (
            <path
              key={`v-${index}`}
              d={`M${130 + index * 46} 86 V520`}
            />
          ))}
        </g>
        <g className="core-fallback-network">
          <path d="M160 354 C238 246 314 274 362 194 S492 154 564 268" />
          <path d="M164 428 C256 382 314 436 394 354 S516 288 590 326" />
          <path d="M182 288 L274 340 L352 268 L442 318 L544 232" />
        </g>
        <g className="core-fallback-points">
          {[
            [160, 354],
            [238, 246],
            [314, 274],
            [362, 194],
            [492, 154],
            [564, 268],
            [164, 428],
            [394, 354],
            [590, 326],
            [182, 288],
            [352, 268],
            [544, 232],
          ].map(([x, y], index) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 7 : 5} />
          ))}
        </g>
      </svg>
      <div className="data-core-static-label data-core-static-label-a">
        <span>Orders</span>
        <strong>12K</strong>
      </div>
      <div className="data-core-static-label data-core-static-label-b">
        <span>Revenue</span>
        <strong>EUR 2.05M</strong>
      </div>
      <div className="data-core-static-label data-core-static-label-c">
        <span>Margin</span>
        <strong>10.42%</strong>
      </div>
    </div>
  );
}

function HeroDataTransfer({
  progress,
  shouldSimplifyMotion,
}: {
  progress: MotionValue<number>;
  shouldSimplifyMotion: boolean;
}) {
  const opacity = useTransform(progress, [0.42, 0.68, 0.96], [0, 0.82, 0.16]);
  const scaleY = useTransform(progress, [0.46, 0.92], [0.18, 1]);
  const pathLength = useTransform(progress, [0.5, 0.94], [0, 1]);

  if (shouldSimplifyMotion) {
    return null;
  }

  return (
    <motion.div
      className="hero-data-transfer pointer-events-none absolute inset-x-0 bottom-0"
      style={{ opacity, scaleY, transformOrigin: "top" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none">
        <motion.path
          className="hero-transfer-path hero-transfer-path-primary"
          d="M752 28 C804 78 836 128 918 142 S1116 154 1246 238"
          style={{ pathLength }}
        />
        <motion.path
          className="hero-transfer-path hero-transfer-path-secondary"
          d="M676 38 C620 96 618 146 536 160 S338 174 198 238"
          style={{ pathLength }}
        />
        <motion.path
          className="hero-transfer-path hero-transfer-path-tertiary"
          d="M820 54 C860 112 760 146 710 178 S612 220 566 254"
          style={{ pathLength }}
        />
        <circle className="hero-transfer-node" cx="752" cy="28" r="4" />
        <circle className="hero-transfer-node" cx="918" cy="142" r="3.5" />
        <circle className="hero-transfer-node" cx="536" cy="160" r="3.5" />
      </svg>
    </motion.div>
  );
}

export function ExecutiveHero() {
  const { shouldSimplifyMotion, enableFinePointerMotion } =
    useHomeMotionSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineWords = profile.name.split(" ");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 26,
    mass: 0.7,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 26,
    mass: 0.7,
  });
  const previewX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const previewY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  useMagneticTargets(sectionRef);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enableFinePointerMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
    event.currentTarget.style.setProperty(
      "--hero-spot-x",
      `${(normalizedX + 0.5) * 100}%`
    );
    event.currentTarget.style.setProperty(
      "--hero-spot-y",
      `${(normalizedY + 0.5) * 100}%`
    );
  };

  const resetDepth = (event: PointerEvent<HTMLElement>) => {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty("--hero-spot-x", "70%");
    event.currentTarget.style.setProperty("--hero-spot-y", "38%");
  };

  return (
    <section
      ref={sectionRef}
      data-data-core-hero
      className="cinematic-hero relative min-h-[100svh] overflow-hidden pt-28 pb-20 sm:pt-32 md:pb-24"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetDepth}
      style={
        {
          "--hero-spot-x": "70%",
          "--hero-spot-y": "38%",
        } as CSSProperties
      }
    >
      <div className="executive-grid-bg pointer-events-none absolute inset-0" />
      <HeroAnalyticalBackground shouldSimplifyMotion={shouldSimplifyMotion} />
      <div className="hero-data-bridge pointer-events-none absolute inset-x-0 bottom-0" />
      <HeroDataTransfer
        progress={scrollYProgress}
        shouldSimplifyMotion={shouldSimplifyMotion}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <motion.div>
          <motion.div
            {...heroItem(shouldSimplifyMotion)}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 font-sans text-xs font-semibold leading-none tracking-normal text-emerald-100">
              <ShieldCheck className="size-4" />
              Apprenticeship · 2026–2027
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-xs font-medium leading-none text-slate-300">
              <MapPin className="size-4 text-cyan-200" />
              {profile.alternance.location}
            </span>
          </motion.div>

          <motion.p
            {...heroItem(shouldSimplifyMotion, 0.04)}
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80"
          >
            Executive Analytics Portfolio
          </motion.p>

          <motion.h1
            aria-label={profile.name}
            className="cinematic-headline max-w-4xl font-heading text-6xl font-bold leading-[0.88] text-white sm:text-7xl lg:text-8xl"
          >
            {headlineWords.map((word, index) => (
              <span key={word} className="headline-word" aria-hidden="true">
                <motion.span {...headlineWord(shouldSimplifyMotion, index)}>
                  {word}
                  {index < headlineWords.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...heroItem(shouldSimplifyMotion, 0.13)}
            className="mt-5 font-heading text-xl font-semibold leading-tight text-cyan-100 md:text-2xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            {...heroItem(shouldSimplifyMotion, 0.18)}
            className="mt-6 max-w-2xl font-body text-base leading-8 text-slate-300 md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              data-magnetic="true"
              data-magnetic-strength="9"
              className="magnetic-target inline-flex items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 py-3 font-body text-sm font-semibold leading-none text-ink-950 shadow-[0_18px_45px_rgba(35,184,216,0.18)] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              View case studies
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={profile.cvHref}
              data-magnetic="true"
              data-magnetic-strength="8"
              className="magnetic-target inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 font-body text-sm font-semibold leading-none text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              <Download className="size-4" />
              Download CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>

          <motion.div
            {...heroItem(shouldSimplifyMotion, 0.22)}
            className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono font-medium tracking-[0.02em]">
              <BarChart3 className="size-4 text-emerald-200" />
              SQL, Tableau, Python, BI reporting
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          {...heroPreview(shouldSimplifyMotion)}
          className="hero-core-column relative min-h-[560px] lg:min-h-[680px]"
        >
          <div className="data-core-stage">
            <div className="data-core-frame">
              {enableFinePointerMotion ? (
                <DataIntelligenceCore anchorSelector="[data-data-core-hero]" />
              ) : (
                <DataCoreFallback />
              )}
            </div>
          </div>

          <motion.div
            style={{ x: previewX, y: previewY }}
            className="hero-preview-depth hero-proof-panel"
          >
            <div className="executive-surface relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 px-2 pb-3">
                <div>
                  <p className="font-heading text-sm font-semibold leading-tight text-white">
                    {previewProject.shortTitle}
                  </p>
                  <p className="mt-1 font-body text-xs leading-5 text-slate-500">
                    {previewProject.businessQuestion}
                  </p>
                </div>
                <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 font-mono text-xs font-semibold leading-none tracking-[0.02em] text-cyan-100">
                  Live proof
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-ink-950">
                <Image
                  src="/projects/profit-leak.png"
                  alt={`${previewProject.title} dashboard preview`}
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-contain p-3"
                />
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {heroMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="rounded-md border border-white/10 bg-ink-950/65 px-3 py-3"
                  >
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {metric.label}
                    </p>
                    <motion.p
                      {...metricMotion(
                        shouldSimplifyMotion,
                        0.26 + index * 0.04
                      )}
                      className={`mt-1 font-kpi text-lg font-bold tabular-nums ${metric.tone}`}
                    >
                      {metric.value}
                    </motion.p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-md border border-amber-300/20 bg-amber-300/10 px-3 py-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/70">
                  Main insight
                </p>
                <p className="mt-1 font-body text-sm leading-6 text-amber-50">
                  {previewProject.mainInsight}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
