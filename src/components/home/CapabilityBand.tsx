import { EditorialMarker } from "@/components/home/EditorialMarker";
import { capabilityBand } from "@/data/skills";

export function CapabilityBand() {
  return (
    <section className="capability-band" aria-labelledby="capability-band-title">
      <div className="capability-band-intro">
        <EditorialMarker index="02" label="Capacités" tone="amber" />
        <h2 id="capability-band-title">
          Les capacités mobilisées sur chaque analyse.
        </h2>
        <p>
          De la définition des KPI à la fiabilisation des données, jusqu&apos;au
          reporting utilisé par les équipes métiers.
        </p>
      </div>

      <ol className="capability-band-grid">
        {capabilityBand.map((capability, index) => (
          <li key={capability}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <strong>{capability}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
