import { EditorialMarker } from "@/components/home/EditorialMarker";
import { education } from "@/data/education";

const academicStages = [
  "Economics and management",
  "Digital business and marketing",
  "Data management and AI",
] as const;

const academicProgression = [...education].reverse();

export function EducationSection() {
  return (
    <section
      id="education"
      className="academic-progression"
      aria-labelledby="academic-progression-title"
    >
      <header className="academic-progression-heading">
        <EditorialMarker index="07" label="Academic progression" tone="blue" />
        <div>
          <p>Foundation → application → specialization</p>
          <h2 id="academic-progression-title">
            An academic path moving steadily toward Marketing Data Analytics.
          </h2>
        </div>
      </header>

      <ol className="academic-progression-list">
        {academicProgression.map((entry, index) => (
          <li key={`${entry.school}-${entry.program}`}>
            <div className="academic-progression-stage">
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{academicStages[index]}</p>
            </div>
            <div className="academic-progression-program">
              <time>{entry.dates}</time>
              <h3>{entry.program}</h3>
              <p>{entry.school}</p>
            </div>
            {index < academicProgression.length - 1 && (
              <span className="academic-progression-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
