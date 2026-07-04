import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const enterEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];
export const moveEase: [number, number, number, number] = [
  0.25, 1, 0.5, 1,
];

export function useHomeMotionSettings() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isSmallTouch, setIsSmallTouch] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const smallTouchQuery = window.matchMedia("(max-width: 1023px)");

    const updateInputMode = () => {
      setIsFinePointer(finePointerQuery.matches);
      setIsSmallTouch(smallTouchQuery.matches);
    };

    updateInputMode();
    finePointerQuery.addEventListener("change", updateInputMode);
    smallTouchQuery.addEventListener("change", updateInputMode);

    return () => {
      finePointerQuery.removeEventListener("change", updateInputMode);
      smallTouchQuery.removeEventListener("change", updateInputMode);
    };
  }, []);

  const shouldSimplifyMotion = shouldReduceMotion || isSmallTouch;

  return {
    shouldReduceMotion,
    shouldSimplifyMotion,
    enableFinePointerMotion:
      isFinePointer && !shouldReduceMotion && !isSmallTouch,
  };
}
