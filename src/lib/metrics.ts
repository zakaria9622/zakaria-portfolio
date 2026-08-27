import type { Project, ProjectKpi } from "@/data/projects";

export function findMetric(project: Project, label: string) {
  return project.kpis.find((metric) => metric.label === label);
}

export function requireMetric(project: Project, label: string) {
  const metric = findMetric(project, label);
  if (!metric) throw new Error(`Métrique "${label}" absente pour ${project.slug}`);
  return metric;
}

/**
 * Lit la première valeur numérique d'un KPI au format français
 * ("3 022 130", "10,42 %", "2 054 589 €").
 */
export function numericValue(metric?: ProjectKpi | string) {
  if (!metric) return 0;
  const raw = typeof metric === "string" ? metric : metric.value;
  // `\s` couvre deja U+00A0 (insecable) et U+202F (fine insecable).
  const match = raw.replace(/\s/g, "").match(/-?\d+(?:[.,]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : 0;
}

/** Lit tous les pourcentages d'un KPI composite ("27,9 % des clients · 75,4 % du CA"). */
export function percentageValues(metric?: ProjectKpi | string) {
  if (!metric) return [] as number[];
  const raw = typeof metric === "string" ? metric : metric.value;
  return [...raw.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map((match) =>
    Number(match[1].replace(",", "."))
  );
}

/** Borne un ratio dans [0, 1] pour les transformations `scaleX`. */
export function ratio(value: number, base: number, floor = 0) {
  if (!base) return floor;
  return Math.max(Math.min(value / base, 1), floor);
}
