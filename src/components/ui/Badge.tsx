import { type ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-electric-500/30 bg-electric-500/10 px-2.5 py-1 font-mono text-xs font-semibold leading-none tracking-[0.02em] text-electric-300 ${className}`}
    >
      {children}
    </span>
  );
}
