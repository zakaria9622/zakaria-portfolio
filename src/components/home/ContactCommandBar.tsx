"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { AnimatedSectionHeading } from "@/components/home/AnimatedSectionHeading";

const contactLinks = [
  {
    label: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    href: profile.github,
    icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
];

function reveal(shouldReduceMotion: boolean) {
  return {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.5 },
  };
}

export function ContactCommandBar() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section id="contact" className="relative py-20 pb-28 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          {...reveal(shouldReduceMotion)}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 md:p-7"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="type-label text-cyan-200/80">
                Contact
              </p>
              <AnimatedSectionHeading
                text="Available for a Data & BI apprenticeship."
                className="type-section-title mt-4 font-heading text-white"
              />
              <div className="mt-6 flex flex-wrap gap-3 font-body text-[15px] text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-ink-950/55 px-3 py-2">
                  <MapPin className="size-4 text-cyan-200" />
                  {profile.alternance.location}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex min-h-14 items-center gap-3 rounded-md border border-white/10 bg-ink-950/55 px-4 py-3 font-body text-[15px] font-medium leading-6 text-slate-200 transition-colors duration-200 hover:border-cyan-200/30 hover:bg-cyan-200/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    <Icon className="size-5 shrink-0 text-cyan-100" />
                    <span className="min-w-0 break-words">{item.label}</span>
                  </a>
                );
              })}
              <a
                href={profile.cvHref}
                className="group inline-flex min-h-14 items-center gap-3 rounded-md border border-amber-200/20 bg-amber-200/10 px-4 py-3 font-body text-sm font-semibold leading-none text-amber-50 transition-colors duration-200 hover:border-amber-100/40 hover:bg-amber-200/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              >
                <Download className="size-5 shrink-0" />
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-14 items-center justify-center rounded-md bg-white px-4 py-3 font-body text-sm font-semibold leading-none text-ink-950 transition-colors duration-200 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:col-span-2"
              >
                Send email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
