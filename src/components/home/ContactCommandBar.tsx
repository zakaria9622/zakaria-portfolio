import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { profile } from "@/data/profile";

export function ContactCommandBar() {
  return (
    <section
      id="contact"
      className="editorial-contact-close"
      aria-labelledby="editorial-contact-title"
    >
      <div className="editorial-contact-register">
        <EditorialMarker index="08" label="Recruiter note" tone="blue" />
        <p>{profile.positioning}</p>
      </div>

      <div className="editorial-contact-body">
        <div className="editorial-contact-copy">
          <p>Available for a Marketing Data Analyst apprenticeship from September 2026.</p>
          <h2 id="editorial-contact-title">
            Let’s turn the next growth question into a clear decision.
          </h2>
          <span>
            <MapPin aria-hidden="true" />
            {profile.alternance.location}
          </span>
        </div>

        <div className="editorial-contact-actions">
          <a
            href={`mailto:${profile.email}`}
            className="editorial-contact-email"
          >
            <span>
              <Mail aria-hidden="true" />
              Primary contact
            </span>
            <strong>{profile.email}</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <a href={profile.cvHref} className="editorial-contact-cv">
            <Download aria-hidden="true" />
            <span>
              <small>Recruiter copy</small>
              Download CV
            </span>
          </a>

          <div className="editorial-contact-socials">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
