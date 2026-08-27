import { EditorialMarker } from "@/components/home/EditorialMarker";
import { education } from "@/data/education";

const academicProgression = [...education].reverse();

export function EducationSection() {
  return (
    <section
      id="education"
      className="academic-progression"
      aria-labelledby="academic-progression-title"
    >
      <header className="academic-progression-heading">
        <EditorialMarker index="07" label="Formation" tone="blue" />
        <div>
          <p>Économie et gestion → digital business → data</p>
          <h2 id="academic-progression-title">Formation</h2>
        </div>
      </header>

      <ol className="academic-progression-list">
        {academicProgression.map((entry, index) => (
          <li key={`${entry.school}-${entry.program}`}>
            <div className="academic-progression-stage">
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{entry.stage}</p>
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
