type EditorialMarkerProps = {
  index: string;
  label: string;
  tone?: "ink" | "blue" | "amber" | "red";
};

export function EditorialMarker({
  index,
  label,
  tone = "ink",
}: EditorialMarkerProps) {
  return (
    <span className={`editorial-marker editorial-marker-${tone}`}>
      <span aria-hidden="true">{index}</span>
      {label}
    </span>
  );
}
