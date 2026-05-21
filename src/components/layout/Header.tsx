"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-white transition-colors hover:text-electric-300"
        >
          {profile.name.split(" ")[0]}{" "}
          <span className="text-electric-400">{profile.name.split(" ")[1]}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="text-xs text-slate-500 transition-colors hover:text-electric-300"
              >
                {p.shortTitle}
              </Link>
            ))}
          </div>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/5 bg-navy-950/95 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm text-slate-300"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Case studies
            </p>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="block py-2 text-sm text-electric-300"
                onClick={() => setOpen(false)}
              >
                {p.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
