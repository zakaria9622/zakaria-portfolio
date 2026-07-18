import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric-500 text-white hover:bg-electric-400 shadow-lg shadow-electric-500/25",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-sm",
  ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  outline:
    "border border-electric-500/50 text-electric-300 hover:bg-electric-500/10 hover:border-electric-400",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

export function Button({
  children,
  href,
  variant = "primary",
  external,
  className = "",
  icon,
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-cta text-sm font-semibold leading-none transition-[background-color,border-color,color,box-shadow] duration-200 md:min-h-0";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <button type="button" className={classes}>
        {icon}
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
