"use client";

import { useEffect, useState } from "react";

export const projectChapters = [
  { id: "decision-brief", label: "Brief" },
  { id: "evidence", label: "Evidence" },
  { id: "analysis", label: "Analysis" },
  { id: "method", label: "Method" },
  { id: "transparency", label: "Limits" },
  { id: "inspect-the-work", label: "Work" },
] as const;

type ChapterId = (typeof projectChapters)[number]["id"];

export function ProjectChapterNav() {
  const [activeChapter, setActiveChapter] =
    useState<ChapterId>("decision-brief");

  useEffect(() => {
    const sections = projectChapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const updateActiveChapter = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const activationLine = window.innerWidth <= 760 ? 170 : 160;
        let nextChapter = sections[0]?.id as ChapterId | undefined;

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) {
            nextChapter = section.id as ChapterId;
          } else {
            break;
          }
        }

        if (nextChapter) setActiveChapter(nextChapter);
      });
    };

    updateActiveChapter();
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    window.addEventListener("resize", updateActiveChapter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, []);

  return (
    <nav className="project-chapter-nav" aria-label="Case study chapters">
      <ol>
        {projectChapters.map((chapter, index) => {
          const isActive = chapter.id === activeChapter;

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {chapter.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
