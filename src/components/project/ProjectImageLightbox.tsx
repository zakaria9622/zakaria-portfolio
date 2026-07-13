"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProjectImageLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  triggerLabel?: string;
};

export function ProjectImageLightbox({ src, alt, caption, triggerLabel }: ProjectImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { event.preventDefault(); closeButtonRef.current?.focus(); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const modal = mounted && createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-xl sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} onMouseDown={() => setOpen(false)}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={caption ? descriptionId : undefined} className="relative flex h-full max-h-[94vh] w-full max-w-[1600px] flex-col overflow-hidden rounded-2xl border border-cyan-200/20 bg-ink-950 shadow-[0_30px_120px_rgba(0,0,0,0.75)] ring-1 ring-cyan-200/10" initial={{ opacity: 0, y: 24, scale: 0.965 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.975 }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }} onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="min-w-0"><p className="type-label text-cyan-100/65">Expanded view</p><h2 id={titleId} className="truncate font-heading text-base font-semibold text-white">{alt}</h2></div>
              <button ref={closeButtonRef} type="button" aria-label="Close expanded image" onClick={() => setOpen(false)} className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"><X className="size-4" /><span className="hidden sm:inline">Close</span></button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden bg-navy-950"><div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.07)_1px,transparent_1px)] [background-size:32px_32px]" /><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-cyan-300/10 blur-3xl" /><div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-electric-500/10 blur-3xl" /><motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}><Image src={src} alt={alt} fill className="object-contain p-3 sm:p-5 lg:p-8" sizes="100vw" /></motion.div></div>
            {caption && <div id={descriptionId} className="border-t border-white/10 bg-white/[0.035] px-4 py-3 font-body text-[15px] leading-6 text-slate-300"><span>{caption}</span><span className="ml-3 text-xs text-slate-500">Press Esc or click outside to close</span></div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>, document.body);

  return <><button ref={triggerRef} type="button" aria-label={triggerLabel ?? `Expand image: ${alt}`} onClick={() => setOpen(true)} className="absolute inset-0 z-20 cursor-zoom-in rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"><span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-md border border-cyan-200/20 bg-ink-950/75 px-2.5 py-1.5 font-mono text-xs text-cyan-50 shadow-lg backdrop-blur transition duration-200 hover:-translate-y-0.5 sm:opacity-70 sm:hover:opacity-100"><Maximize2 className="size-3.5" />Expand</span></button>{modal}</>;
}
