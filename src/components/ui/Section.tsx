import { type ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  wide?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  wide = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div
        className={`mx-auto px-6 lg:px-8 ${wide ? "max-w-7xl" : "max-w-6xl"} ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-electric-400">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{description}</p>
      )}
    </div>
  );
}
