import { EditorialMarker } from "@/components/home/EditorialMarker";
import { education } from "@/data/education";
import { profile } from "@/data/profile";

const currentProgram = education[0];

const rows = [
  {
    index: "01",
    label: "Positionnement",
    lead: profile.title,
  },
  {
    index: "02",
    label: "Domaines",
    value: "KPI · Qualité des données · ETL · Reporting BI",
  },
  {
    index: "03",
    label: "Outils",
    value: "SQL · Tableau · Excel · Python/pandas",
  },
  {
    index: "04",
    label: "Formation",
    value: `${currentProgram.program} — ${currentProgram.school}`,
  },
  {
    index: "05",
    label: "Disponibilité",
    value: profile.availability.label,
  },
] as const;

export function ProfileSnapshot() {
  return (
    <aside className="profile-snapshot" aria-labelledby="profile-snapshot-title">
      <div className="profile-snapshot-heading">
        <EditorialMarker index="01" label="Profil en bref" tone="blue" />
        <p>Lecture en 30 secondes</p>
      </div>

      <h2 id="profile-snapshot-title" className="sr-only">
        Profil de {profile.name} en bref
      </h2>

      <ol className="profile-snapshot-list">
        {rows.map((row) => (
          <li key={row.label}>
            <span className="profile-snapshot-index" aria-hidden="true">
              {row.index}
            </span>
            <div>
              <p className="profile-snapshot-label">{row.label}</p>
              {"lead" in row ? (
                <p className="profile-snapshot-lead">{row.lead}</p>
              ) : (
                <p className="profile-snapshot-value">{row.value}</p>
              )}
            </div>
          </li>
        ))}

        <li className="profile-snapshot-highlight">
          <span className="profile-snapshot-index" aria-hidden="true">
            →
          </span>
          <div>
            <p className="profile-snapshot-label">Localisation</p>
            <p className="profile-snapshot-value">
              {profile.availability.location}
            </p>
          </div>
        </li>
      </ol>
    </aside>
  );
}
