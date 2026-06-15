"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

const previewProject = featuredProjects[0];

const heroMetrics = [
  { label: "Orders", value: "12K", tone: "text-cyan-200" },
  { label: "Revenue", value: "EUR 2.05M", tone: "text-amber-200" },
  { label: "Margin", value: "10.42%", tone: "text-emerald-200" },
];

function heroMotion(shouldReduceMotion: boolean, delay = 0) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.55, delay },
  };
}

export function ExecutiveHero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      <div className="executive-grid-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <motion.div {...heroMotion(shouldReduceMotion)}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 font-body text-xs font-semibold leading-none text-emerald-100">
              <ShieldCheck className="size-4" />
              Open to Data Analyst / BI Analyst alternance
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-xs font-medium leading-none text-slate-300">
              <MapPin className="size-4 text-cyan-200" />
              {profile.alternance.location}
            </span>
          </div>

          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Executive Analytics Portfolio
          </p>

          <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-5 font-heading text-xl font-semibold leading-tight text-cyan-100 md:text-2xl">
            {profile.title}
          </p>

          <p className="mt-6 max-w-2xl font-body text-base leading-8 text-slate-300 md:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-200 px-5 py-3 font-body text-sm font-semibold leading-none text-ink-950 shadow-[0_18px_45px_rgba(35,184,216,0.18)] transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              View case studies
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={profile.cvHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 font-body text-sm font-semibold leading-none text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
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

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono font-medium tracking-[0.02em]">
              <BarChart3 className="size-4 text-emerald-200" />
              SQL, Tableau, Python, BI reporting
            </span>
          </div>
        </motion.div>

        <motion.div
          {...heroMotion(shouldReduceMotion, 0.12)}
          className="relative"
        >
          <div className="executive-surface relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
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
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain p-3"
              />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-md border border-white/10 bg-ink-950/65 px-3 py-3"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className={`mt-1 font-kpi text-lg font-bold tabular-nums ${metric.tone}`}>
                    {metric.value}
                  </p>
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
      </div>
    </section>
  );
}
