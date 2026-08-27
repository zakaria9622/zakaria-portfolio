"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { experience } from "@/data/experience";

const careerChapters = [...experience].reverse();

export function ExperienceTimeline() {
  const [openExperiences, setOpenExperiences] = useState<Set<number>>(
    () => new Set([careerChapters.length - 1])
  );

  function toggleExperience(index: number) {
    setOpenExperiences((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      id="experience"
      className="editorial-experience"
      aria-labelledby="experience-heading"
    >
      <div className="editorial-experience-heading">
        <EditorialMarker index="03" label="Expérience professionnelle" tone="blue" />
        <div>
          <h2 id="experience-heading">Expérience professionnelle</h2>
          <p>
            De la collecte et la fiabilisation des données jusqu&apos;au
            reporting destiné aux équipes métiers.
          </p>
        </div>
      </div>

      <ol className="career-progression" aria-label="Progression professionnelle">
        {careerChapters.map((job, index) => (
          <li key={job.company}>
            <span aria-hidden="true">0{index + 1}</span>
            {job.focus}
          </li>
        ))}
        <li className="is-direction">
          <span aria-hidden="true">→</span>
          Business Analyst
        </li>
      </ol>

      <div className="career-chapters">
        {careerChapters.map((job, index) => {
          const isLatest = index === careerChapters.length - 1;
          const isOpen = openExperiences.has(index);
          const detailsId = `experience-details-${index}`;
          const triggerId = `experience-trigger-${index}`;

          return (
            <article
              key={job.company}
              className={`career-chapter${isLatest ? " is-latest" : ""}`}
            >
              <div className="career-chapter-index" aria-hidden="true">
                <span>0{index + 1}</span>
                <i />
              </div>

              <div className="career-chapter-annotation">
                <p>{job.focus}</p>
                <span>{job.dates}</span>
                {isLatest && <strong>Expérience en cours</strong>}
              </div>

              <div className="career-chapter-content">
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  onClick={() => toggleExperience(index)}
                  className="career-chapter-trigger"
                >
                  <span>
                    <small>{job.label}</small>
                    <strong>{job.company}</strong>
                    <em>{job.role}</em>
                  </span>
                  <ChevronDown
                    className={isOpen ? "is-open" : undefined}
                    aria-hidden="true"
                  />
                </button>

                <div className="career-chapter-desktop-title">
                  <p>{job.label}</p>
                  <h3>{job.company}</h3>
                  <span>{job.role}</span>
                </div>

                <div
                  id={detailsId}
                  aria-labelledby={triggerId}
                  className={`career-chapter-details${isOpen ? " is-open" : ""}`}
                >
                  <p>Missions principales</p>
                  <ul>
                    {job.highlights.map((highlight, highlightIndex) => (
                      <li key={highlight}>
                        <span aria-hidden="true">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="career-direction-note">
        <span aria-hidden="true">04</span>
        <p>Objectif</p>
        <strong>Business Analyst</strong>
        <small>
          Traduire les besoins métiers en KPI, analyses et reporting exploitables
          pour la décision.
        </small>
      </div>
    </section>
  );
}
