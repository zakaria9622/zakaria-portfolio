"use client";

import { type RefObject, useEffect } from "react";

export function useMagneticTargets(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-magnetic='true']")
    );
    const cleanups: Array<() => void> = [];

    targets.forEach((target) => {
      let frame = 0;
      const rawStrength = Number.parseFloat(
        target.dataset.magneticStrength ?? "10"
      );
      const strength = Number.isFinite(rawStrength) ? rawStrength : 10;

      const reset = () => {
        cancelAnimationFrame(frame);
        delete target.dataset.magneticActive;
        target.style.setProperty("--magnetic-x", "0px");
        target.style.setProperty("--magnetic-y", "0px");
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        target.dataset.magneticActive = "true";
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          target.style.setProperty(
            "--magnetic-x",
            `${Math.max(-1, Math.min(1, x * 2)) * strength}px`
          );
          target.style.setProperty(
            "--magnetic-y",
            `${Math.max(-1, Math.min(1, y * 2)) * strength * 0.72}px`
          );
        });
      };

      target.addEventListener("pointermove", handlePointerMove);
      target.addEventListener("pointerleave", reset);
      target.addEventListener("pointercancel", reset);

      cleanups.push(() => {
        target.removeEventListener("pointermove", handlePointerMove);
        target.removeEventListener("pointerleave", reset);
        target.removeEventListener("pointercancel", reset);
        reset();
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [rootRef]);
}
