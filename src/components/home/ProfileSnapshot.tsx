import { EditorialMarker } from "@/components/home/EditorialMarker";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { skillsByCategory } from "@/data/skills";

const currentProgram = education[0];
const dataTools = skillsByCategory[1].skills.slice(0, 5).join(" · ");

const rows = [
  {
    index: "01",
    label: "Poste visé",
    lead: profile.title,
  },
  {
    index: "02",
    label: "Domaines",
    value: "Besoins métiers · KPI · Analyse · Reporting · Qualité des données",
  },
  {
    index: "03",
    label: "Outils",
    value: dataTools,
  },
  {
    index: "04",
    label: "Formation",
    value: `${currentProgram.program} — ${currentProgram.school}`,
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
            <p className="profile-snapshot-label">Disponibilité</p>
            <p className="profile-snapshot-value">
              {profile.alternance.availability} · {profile.alternance.location}
            </p>
          </div>
        </li>
      </ol>
    </aside>
  );
}
