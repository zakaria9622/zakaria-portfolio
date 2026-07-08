import Image from "next/image";

const PROJECT_IMAGE_PATHS: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

type DashboardPreviewProps = {
  slug: string;
  alt: string;
};

export function DashboardPlaceholder({ slug, alt }: DashboardPreviewProps) {
  const src = PROJECT_IMAGE_PATHS[slug];

  if (!src) {
    return null;
  }

  return (
    <figure className="relative w-full">
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900/60 p-1.5 shadow-2xl shadow-black/40 ring-1 ring-electric-500/10">
        <div className="relative h-[min(360px,52vh)] w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 md:h-[520px] md:max-h-[520px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain p-3 sm:p-4 md:p-6"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
          />
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
