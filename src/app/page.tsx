import type { Metadata } from "next";
import { ExecutiveHero } from "@/components/home/ExecutiveHero";
import { KpiRibbon } from "@/components/home/KpiRibbon";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { EducationSection } from "@/components/home/EducationSection";
import { CaseStudySpotlight } from "@/components/home/CaseStudySpotlight";
import { SkillProofMatrix } from "@/components/home/SkillProofMatrix";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ContactCommandBar } from "@/components/home/ContactCommandBar";
import { CinematicPortfolioLayer } from "@/components/home/CinematicPortfolioLayer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="executive-home">
      <CinematicPortfolioLayer />
      <ExecutiveHero />
      <KpiRibbon />
      <ExperienceTimeline />
      <EducationSection />
      <CaseStudySpotlight />
      <SkillProofMatrix />
      <ProcessTimeline />
      <ContactCommandBar />
    </div>
  );
}
