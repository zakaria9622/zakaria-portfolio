import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
        <EditorialMarker index="08" label="Contact" tone="blue" />
        <p>{profile.positioning}</p>
      </div>

      <div className="editorial-contact-body">
        <div className="editorial-contact-copy">
          <h2 id="editorial-contact-title">
            Disponible immédiatement pour une alternance de 12 mois en Data Analyst.
          </h2>
          <span>
            <MapPin aria-hidden="true" />
            {profile.availability.location}
          </span>
          <p>{profile.availability.rhythm}</p>
        </div>

        <div className="editorial-contact-actions">
          <a
            href={`mailto:${profile.email}`}
            className="editorial-contact-email"
          >
            <span>
              <Mail aria-hidden="true" />
              Contact principal
            </span>
            <strong>{profile.email}</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <a href={profile.phoneHref} className="editorial-contact-cv">
            <Phone aria-hidden="true" />
            <span>
              <small>Téléphone</small>
              {profile.phone}
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
