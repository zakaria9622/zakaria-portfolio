import { EditorialMarker } from "@/components/home/EditorialMarker";

const steps = [
  {
    title: "Growth question",
    text: "Define the acquisition, conversion, retention or profitability problem before touching the data.",
    output: "A decision-shaped scope",
  },
  {
    title: "Data model",
    text: "Prepare reliable metrics with documented business rules.",
    output: "Trusted analytical inputs",
  },
  {
    title: "Analysis and dashboard",
    text: "Isolate the bottleneck, pattern or priority segment.",
    output: "A decision-ready signal",
  },
  {
    title: "Growth recommendation",
    text: "Translate the evidence into a concrete acquisition, conversion, CRM or retention action.",
    output: "The next business decision",
  },
] as const;

export function ProcessTimeline() {
  return (
    <section
      className="growth-decision-system"
      aria-labelledby="growth-decision-system-title"
    >
      <header className="growth-decision-system-heading">
        <EditorialMarker index="05" label="Growth decision system" tone="blue" />
        <div>
          <p>Method / from ambiguity to action</p>
          <h2 id="growth-decision-system-title">
            The analysis is only useful when it changes the next decision.
          </h2>
        </div>
      </header>

      <ol className="growth-decision-system-sequence">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={index === steps.length - 1 ? "is-decision" : undefined}
          >
            <div className="growth-decision-system-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="growth-decision-system-copy">
              <p>{index === 0 ? "Input" : "Receives"}</p>
              <h3>{step.title}</h3>
              <span>{step.text}</span>
            </div>
            <div className="growth-decision-system-output">
              <p>Produces</p>
              <strong>{step.output}</strong>
            </div>
            {index < steps.length - 1 && (
              <span className="growth-decision-system-arrow" aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="growth-decision-system-note">
        Question → evidence → interpretation → decision
      </p>
    </section>
  );
}
