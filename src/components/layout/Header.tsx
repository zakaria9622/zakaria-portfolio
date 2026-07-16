"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useMagneticTargets } from "@/components/ui/useMagneticTargets";

const navLinks = [
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useMagneticTargets(headerRef);

  useEffect(() => {
    const skipLink = document.querySelector<HTMLAnchorElement>(
      'a[href="#main-content"]'
    );
    const focusMainContent = () => {
      requestAnimationFrame(() => {
        document.getElementById("main-content")?.focus();
      });
    };

    skipLink?.addEventListener("click", focusMainContent);

    return () => {
      skipLink?.removeEventListener("click", focusMainContent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-ink-950/80 px-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-4 lg:px-5">
        <Link
          href="/"
          data-magnetic="true"
          data-magnetic-strength="6"
          className="magnetic-target flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2 py-2 font-body text-sm font-semibold leading-none text-white transition-colors duration-200 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-cyan-200/20 bg-cyan-200/10 font-mono text-xs font-semibold leading-none text-cyan-100">
            ZM
          </span>
          <span className="whitespace-nowrap">
            {profile.name.split(" ")[0]}{" "}
            <span className="text-cyan-100">{profile.name.split(" ")[1]}</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-magnetic="true"
              data-magnetic-strength="7"
              className="magnetic-target type-nav rounded-md px-3 py-2 text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.cvHref}
            data-magnetic="true"
            data-magnetic-strength="7"
            className="magnetic-target ml-2 inline-flex items-center gap-2 rounded-md border border-amber-200/20 bg-amber-200/10 px-3 py-2 font-body text-sm font-semibold leading-none text-amber-50 transition-colors duration-200 hover:border-amber-100/40 hover:bg-amber-200/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200"
          >
            <Download className="size-4" />
            CV
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex size-11 items-center justify-center rounded-md text-slate-300 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mx-auto mt-2 max-h-[calc(100svh-88px)] max-w-7xl overflow-y-auto rounded-lg border border-white/10 bg-ink-950/95 px-2 py-2 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-md px-3 py-2.5 font-body text-[15px] font-medium leading-none text-slate-300 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.cvHref}
            className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-amber-200/20 bg-amber-200/10 px-4 py-3 font-body text-sm font-semibold leading-none text-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
