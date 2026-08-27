import { EditorialMarker } from "@/components/home/EditorialMarker";

const steps = [
  {
    title: "Besoin métier",
    text: "Clarifier la question, les utilisateurs et la décision attendue.",
    output: "Un périmètre cadré",
  },
  {
    title: "KPI & règles de gestion",
    text: "Définir des indicateurs compréhensibles et des règles de calcul documentées.",
    output: "Des indicateurs partagés",
  },
  {
    title: "Données & qualité",
    text: "Préparer, contrôler et fiabiliser les sources avant diffusion.",
    output: "Des données exploitables",
  },
  {
    title: "Analyse & reporting",
    text: "Construire l'analyse ou le dashboard permettant d'identifier les écarts et tendances.",
    output: "Un constat lisible",
  },
  {
    title: "Aide à la décision",
    text: "Transformer les résultats en priorités et recommandations actionnables.",
    output: "La décision suivante",
  },
] as const;

export function ProcessTimeline() {
  return (
    <section className="decision-method" aria-labelledby="decision-method-title">
      <header className="decision-method-heading">
        <EditorialMarker index="05" label="Méthode" tone="blue" />
        <div>
          <p>Méthode / du besoin métier à la décision</p>
          <h2 id="decision-method-title">De la question métier à la décision</h2>
        </div>
      </header>

      <ol className="decision-method-sequence">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={index === steps.length - 1 ? "is-decision" : undefined}
          >
            <div className="decision-method-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="decision-method-copy">
              <p>{index === 0 ? "Point de départ" : "Reçoit"}</p>
              <h3>{step.title}</h3>
              <span>{step.text}</span>
            </div>
            <div className="decision-method-output">
              <p>Produit</p>
              <strong>{step.output}</strong>
            </div>
            {index < steps.length - 1 && (
              <span className="decision-method-arrow" aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="decision-method-note">
        Besoin métier → KPI → Data Quality → Analyse / Reporting → Décision
      </p>
    </section>
  );
}
