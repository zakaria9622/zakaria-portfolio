"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HomeGlassCard } from "@/components/home/HomeGlassCard";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <Section id="contact" wide className="home-section-contact relative pb-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-electric-500/10 to-transparent" />

      <div className="relative">
        <SectionHeader
          label="Get in touch"
          title="Contact"
          description="Open to Data Analyst / BI Analyst alternance opportunities."
        />

        <HomeGlassCard glow className="max-w-4xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <div className="home-glass-panel flex items-start gap-4 rounded-xl border border-white/10 bg-navy-950/40 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-electric-400" />
                <div>
                  <p className="font-heading text-sm font-semibold leading-tight text-white">
                    Location
                  </p>
                  <p className="mt-1 font-body text-sm leading-6 text-slate-400">
                    {profile.alternance.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  href: `mailto:${profile.email}`,
                  icon: Mail,
                  label: profile.email,
                },
                {
                  href: `tel:${profile.phone.replace(/\s/g, "")}`,
                  icon: Phone,
                  label: profile.phone,
                },
                {
                  href: profile.github,
                  icon: GitHubIcon,
                  label: "GitHub",
                  external: true,
                },
                {
                  href: profile.linkedin,
                  icon: LinkedInIcon,
                  label: "LinkedIn",
                  external: true,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="home-glass-panel flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 font-body text-sm leading-6 text-slate-300 transition-all hover:border-electric-500/30 hover:bg-electric-500/5 hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-500/15">
                      <Icon className="h-5 w-5 text-electric-400" />
                    </div>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-10">
            <Button
              href={`mailto:${profile.email}`}
              variant="primary"
              className="shadow-lg shadow-electric-500/25"
            >
              Send Email
            </Button>
            <Button href={profile.linkedin} variant="outline" external>
              Connect on LinkedIn
            </Button>
          </div>
        </HomeGlassCard>
      </div>
    </Section>
  );
}
