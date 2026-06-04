import { ExecutiveHero } from "@/components/home/ExecutiveHero";
import { KpiRibbon } from "@/components/home/KpiRibbon";
import { CaseStudySpotlight } from "@/components/home/CaseStudySpotlight";
import { SkillProofMatrix } from "@/components/home/SkillProofMatrix";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { ContactCommandBar } from "@/components/home/ContactCommandBar";

export default function Home() {
  return (
    <div className="executive-home">
      <ExecutiveHero />
      <KpiRibbon />
      <CaseStudySpotlight />
      <SkillProofMatrix />
      <ProcessTimeline />
      <ExperienceTimeline />
      <ContactCommandBar />
    </div>
  );
}
