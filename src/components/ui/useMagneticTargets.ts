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
      let rect: DOMRect | null = null;
      let nextX = 0;
      let nextY = 0;
      const rawStrength = Number.parseFloat(
        target.dataset.magneticStrength ?? "10"
      );
      const strength = Number.isFinite(rawStrength) ? rawStrength : 10;

      const measure = () => {
        rect = target.getBoundingClientRect();
      };

      const flush = () => {
        frame = 0;
        target.style.setProperty("--magnetic-x", `${nextX}px`);
        target.style.setProperty("--magnetic-y", `${nextY}px`);
      };

      const reset = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        rect = null;
        if (target.dataset.magneticActive === "true") {
          delete target.dataset.magneticActive;
        }
        target.style.setProperty("--magnetic-x", "0px");
        target.style.setProperty("--magnetic-y", "0px");
      };

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = rect ?? target.getBoundingClientRect();
        rect = bounds;
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        nextX = Math.max(-1, Math.min(1, x * 2)) * strength;
        nextY = Math.max(-1, Math.min(1, y * 2)) * strength * 0.72;

        if (target.dataset.magneticActive !== "true") {
          target.dataset.magneticActive = "true";
        }

        if (frame === 0) {
          frame = requestAnimationFrame(flush);
        }
      };

      target.addEventListener("pointerenter", measure);
      target.addEventListener("pointermove", handlePointerMove);
      target.addEventListener("pointerleave", reset);
      target.addEventListener("pointercancel", reset);

      cleanups.push(() => {
        target.removeEventListener("pointerenter", measure);
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
