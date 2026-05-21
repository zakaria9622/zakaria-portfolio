import { Hero } from "@/components/home/Hero";
import { SkillsStrip } from "@/components/home/SkillsStrip";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SkillsByCategory } from "@/components/home/SkillsByCategory";
import { Experience } from "@/components/home/Experience";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <SkillsStrip />
      <FeaturedProjects />
      <SkillsByCategory />
      <Experience />
      <Contact />
    </div>
  );
}
