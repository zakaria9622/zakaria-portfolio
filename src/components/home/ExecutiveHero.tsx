import { Download, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { DecisionTrace } from "@/components/home/DecisionTrace";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { profile } from "@/data/profile";
import { featuredProjects, getProjectBySlug } from "@/data/projects";

const featuredProject =
  getProjectBySlug("funnel-analysis") ?? featuredProjects[0];

export function ExecutiveHero() {
  return (
    <section className="editorial-hero" aria-labelledby="home-hero-title">
      <div className="editorial-hero-masthead">
        <EditorialMarker index="VOL. 01" label="Editorial growth lab" />
        <div className="editorial-hero-status" aria-label="Availability and location">
          <span>Apprenticeship · 2026–2027</span>
          <span>
            <MapPin aria-hidden="true" />
            {profile.alternance.location}
          </span>
        </div>
      </div>

      <div className="editorial-hero-grid">
        <div className="editorial-hero-copy">
          <p className="editorial-byline">
            {profile.name} / {profile.title}
          </p>
          <h1 id="home-hero-title">
            I find where growth leaks <em>— and what to do next.</em>
          </h1>
          <p className="editorial-hero-support">
            Marketing Data Analyst connecting acquisition, conversion, retention
            and profitability data to clearer growth decisions.
          </p>

          <div className="editorial-hero-actions">
            <a href={profile.cvHref} download className="editorial-primary-action">
              <Download aria-hidden="true" />
              Download CV
            </a>
            <a href={`mailto:${profile.email}`} className="editorial-secondary-action">
              <Mail aria-hidden="true" />
              Email me
            </a>
            <span className="editorial-social-links" aria-label="Social profiles">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon />
              </a>
            </span>
          </div>

          <div className="editorial-capability-line">
            <span>Acquisition</span>
            <span>Conversion</span>
            <span>Retention</span>
            <span>Profitability</span>
          </div>
        </div>

        <DecisionTrace project={featuredProject} />
      </div>
    </section>
  );
}
