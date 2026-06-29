"use client";

import { motion } from "framer-motion";
import { Download, FolderKanban, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { HeroDashboardMockup } from "@/components/home/HeroDashboardMockup";

export function Hero() {
  return (
    <section className="home-hero relative min-h-[90vh] overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="home-gradient-orb absolute -top-32 right-1/4 h-[600px] w-[600px]" />
        <div className="home-gradient-orb-secondary absolute bottom-0 left-0 h-[400px] w-[400px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.15),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-gradient-to-r from-electric-500/20 to-transparent px-4 py-2 shadow-lg shadow-electric-500/10 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-electric-300" />
              <span className="h-2 w-2 rounded-full bg-electric-400 animate-pulse" />
              <span className="font-body text-sm font-medium leading-none text-electric-200">
                Open to Data Analyst / BI Analyst alternance
              </span>
            </div>

            <p className="mb-3 font-mono text-sm font-semibold tracking-wide text-electric-400/90">
              Data · BI · Analytics
            </p>

            <h1 className="bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text font-heading text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.05]">
              {profile.name}
            </h1>

            <p className="mt-4 font-heading text-xl font-semibold leading-tight md:text-2xl">
              <span className="bg-gradient-to-r from-electric-300 to-electric-500 bg-clip-text text-transparent">
                {profile.title}
              </span>
            </p>

            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-slate-400 md:text-lg">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href="#projects"
                variant="primary"
                icon={<FolderKanban className="h-4 w-4" />}
                className="shadow-lg shadow-electric-500/30"
              >
                View Projects
              </Button>
              {/* TODO: Add CV PDF to /public/cv-zakaria-maachou.pdf */}
              <Button
                href={profile.cvHref}
                variant="secondary"
                icon={<Download className="h-4 w-4" />}
              >
                Download CV
              </Button>
              <Button
                href={profile.github}
                variant="outline"
                external
                icon={<GitHubIcon className="h-4 w-4" />}
              >
                GitHub
              </Button>
              <Button
                href={profile.linkedin}
                variant="outline"
                external
                icon={<LinkedInIcon className="h-4 w-4" />}
              >
                LinkedIn
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Case studies", value: "4" },
                { label: "Stack", value: "SQL · Tableau" },
                { label: "Based in", value: "Paris" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="home-glass-kpi rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-kpi text-sm font-bold tabular-nums text-white md:text-base">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative lg:pl-4">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
