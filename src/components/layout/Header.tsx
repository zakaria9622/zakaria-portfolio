"use client";

import Link from "next/link";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-6">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-ink-950/80 px-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-4 lg:px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold tracking-tight text-white transition-colors duration-200 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10 font-mono text-xs text-cyan-100">
            ZM
          </span>
          <span className="truncate">
            {profile.name.split(" ")[0]}{" "}
            <span className="text-cyan-100">{profile.name.split(" ")[1]}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1 border-l border-white/10 pl-3">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="rounded-md px-2.5 py-2 text-xs font-medium text-slate-500 transition-colors duration-200 hover:bg-white/[0.05] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                {p.shortTitle}
              </Link>
            ))}
          </div>
          <a
            href={profile.cvHref}
            className="ml-2 inline-flex items-center gap-2 rounded-md border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm font-semibold text-amber-50 transition-colors duration-200 hover:border-amber-100/40 hover:bg-amber-200/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
          >
            <Download className="size-4" />
            CV
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-7xl rounded-lg border border-white/10 bg-ink-950/95 px-4 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Case studies
            </p>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="block rounded-md px-3 py-2 text-sm text-cyan-100 transition-colors duration-200 hover:bg-white/[0.05]"
                onClick={() => setOpen(false)}
              >
                {p.title}
              </Link>
            ))}
          </div>
          <a
            href={profile.cvHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-sm font-semibold text-amber-50"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
