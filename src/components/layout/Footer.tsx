import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 py-7 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-6 md:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <p className="font-heading text-base font-semibold text-white">{profile.name}</p>
          <p className="mt-1 font-body text-[15px] text-slate-400">
            {profile.title}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex size-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-electric-300 md:size-auto md:p-2"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-electric-300 md:size-auto md:p-2"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-electric-300 md:size-auto md:p-2"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="font-body text-center text-xs text-slate-500 md:text-right">
          © {new Date().getFullYear()} · Growth Analytics Portfolio
        </p>
      </div>
    </footer>
  );
}
