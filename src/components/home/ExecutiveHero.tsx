import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { ProfileSnapshot } from "@/components/home/ProfileSnapshot";
import { profile } from "@/data/profile";
import { skillsStrip } from "@/data/skills";

export function ExecutiveHero() {
  return (
    <section className="editorial-hero" aria-labelledby="home-hero-title">
      <div className="editorial-hero-masthead">
        <EditorialMarker
          index="ZM"
          label="Business Analyst · Data · Reporting · Aide à la décision"
        />
        <div
          className="editorial-hero-status"
          aria-label="Disponibilité et localisation"
        >
          <span>{profile.alternance.availability}</span>
          <span>
            <MapPin aria-hidden="true" />
            {profile.alternance.location}
          </span>
        </div>
      </div>

      <div className="editorial-hero-grid">
        <div className="editorial-hero-copy">
          <p className="editorial-byline">{profile.name}</p>
          <h1 id="home-hero-title">{profile.headline}</h1>

          <div className="editorial-hero-title-block">
            <p>{profile.title}</p>
            <p>{profile.subtitle}</p>
          </div>

          <p className="editorial-hero-support">{profile.tagline}</p>

          <div className="editorial-hero-actions">
            <Link href="/#projects" className="editorial-primary-action">
              Voir mes projets
              <ArrowRight aria-hidden="true" />
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-secondary-action"
            >
              <GitHubIcon aria-hidden="true" />
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="editorial-secondary-action"
            >
              <Mail aria-hidden="true" />
              Me contacter
            </a>
            <span className="editorial-social-links" aria-label="Profils">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </span>
          </div>

          <div className="editorial-capability-line">
            {skillsStrip.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <ProfileSnapshot />
      </div>
    </section>
  );
}
