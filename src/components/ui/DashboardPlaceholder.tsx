import Image from "next/image";
import { ProjectImageLightbox } from "@/components/project/ProjectImageLightbox";

const PROJECT_IMAGE_PATHS: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

type DashboardPreviewProps = {
  slug: string;
  alt: string;
  variant?: "default" | "hero";
  label?: string;
  priority?: boolean;
};

export function DashboardPlaceholder({
  slug,
  alt,
  variant = "default",
  label,
  priority = false,
}: DashboardPreviewProps) {
  const src = PROJECT_IMAGE_PATHS[slug];

  if (!src) {
    return null;
  }

  if (variant === "hero") {
    return (
      <figure className="relative w-full">
        <div className="overflow-hidden rounded-2xl border border-cyan-200/20 bg-ink-950/85 shadow-[0_30px_100px_rgba(0,0,0,0.55)] ring-1 ring-cyan-200/10 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex shrink-0 gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-rose-300/70" />
                <span className="size-2 rounded-full bg-amber-200/70" />
                <span className="size-2 rounded-full bg-cyan-200/70" />
              </span>
              {label && (
                <span className="truncate font-heading text-sm font-semibold text-slate-100">
                  {label}
                </span>
              )}
            </div>
            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/65">
              Analytics workspace
            </span>
          </div>
          <div className="relative aspect-[16/10] min-h-[260px] overflow-hidden bg-navy-950 sm:min-h-[320px] lg:min-h-0">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-cyan-300/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-electric-500/10 blur-3xl" />
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="relative object-contain p-1 sm:p-2"
              sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 62vw, 820px"
            />
          </div>
        </div>
        <ProjectImageLightbox src={src} alt={alt} caption={alt} triggerLabel={`Expand ${label ?? "dashboard"} preview`} />
        <figcaption className="sr-only">{alt}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative w-full">
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900/60 p-1.5 shadow-2xl shadow-black/40 ring-1 ring-electric-500/10">
        <div className="relative h-[min(420px,58vh)] w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 md:h-[600px] md:max-h-[600px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-contain p-1 sm:p-2 md:p-3"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
          />
        </div>
      </div>
      <ProjectImageLightbox src={src} alt={alt} caption={alt} triggerLabel={`Expand ${label ?? "dashboard"} preview`} />
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
