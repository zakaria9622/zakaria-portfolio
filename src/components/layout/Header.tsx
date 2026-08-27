"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Expérience", href: "/#experience" },
  { label: "Projets", href: "/#projects" },
  { label: "Compétences", href: "/#skills" },
  { label: "Formation", href: "/#education" },
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
          aria-label={`${profile.name} — accueil`}
        >
          <span aria-hidden="true">ZM</span>
          <span>{profile.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="editorial-desktop-nav">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="editorial-header-cv"
          >
            <Mail aria-hidden="true" />
            Email
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="editorial-menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={
            open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
          }
        >
          <span>{open ? "Fermer" : "Menu"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navigation mobile"
          className="editorial-mobile-nav"
        >
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="editorial-mobile-cv"
            onClick={() => setOpen(false)}
          >
            <Mail aria-hidden="true" />
            Me contacter
          </a>
        </nav>
      )}
    </header>
  );
}
