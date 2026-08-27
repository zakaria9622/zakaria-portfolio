import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-heading">
        <span>Contact / {new Date().getFullYear()}</span>
        <p>{profile.name}</p>
      </div>

      <div className="editorial-footer-grid">
        <div>
          <p>{profile.title}</p>
          <span>{profile.subtitle}</span>
        </div>
        <div className="editorial-footer-links">
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
            GitHub
          </a>
        </div>
        <p className="editorial-footer-credit">
          © {new Date().getFullYear()} · {profile.name}
        </p>
      </div>
    </footer>
  );
}
