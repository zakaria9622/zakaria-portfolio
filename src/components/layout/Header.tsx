"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    return () => skipLink?.removeEventListener("click", focusMainContent);
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="editorial-header">
      <div className="editorial-header-inner">
        <Link
          href="/"
          className="editorial-brand"
          aria-label={`${profile.name} — home`}
        >
          <span aria-hidden="true">ZM</span>
          <span>{profile.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="editorial-desktop-nav">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <a href={profile.cvHref} className="editorial-header-cv">
            <Download aria-hidden="true" />
            CV
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="editorial-menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span>{open ? "Close" : "Menu"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="editorial-mobile-nav"
        >
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <a href={profile.cvHref} className="editorial-mobile-cv">
            <Download aria-hidden="true" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
