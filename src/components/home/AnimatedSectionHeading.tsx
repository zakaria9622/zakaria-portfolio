"use client";

import { motion } from "framer-motion";
import { enterEase, useHomeMotionSettings } from "@/components/home/motion";

type AnimatedSectionHeadingProps = {
  text: string;
  className?: string;
  delay?: number;
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: "116%",
    filter: "blur(8px)",
  },
  visible: ({ index, delay }: { index: number; delay: number }) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      delay: delay + index * 0.045,
      ease: enterEase,
    },
  }),
};

export function AnimatedSectionHeading({
  text,
  className = "",
  delay = 0,
}: AnimatedSectionHeadingProps) {
  const { shouldSimplifyMotion } = useHomeMotionSettings();

  if (shouldSimplifyMotion) {
    return <h2 className={className}>{text}</h2>;
  }

  const rawTokens = text.split(/(\s+)/);
  const tokens = rawTokens.map((token, index) => {
    if (/^\s+$/.test(token)) {
      return { token, index, wordIndex: null };
    }

    const wordIndex = rawTokens
      .slice(0, index)
      .filter((previousToken) => !/^\s+$/.test(previousToken)).length;

    return { token, index, wordIndex };
  });

  return (
    <motion.h2
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay }}
    >
      <span aria-hidden="true">
        {tokens.map((part) => {
          if (part.wordIndex === null) {
            return part.token;
          }

          return (
            <span key={`${part.token}-${part.index}`} className="section-heading-word-clip">
              <motion.span
                className="section-heading-word"
                custom={{ index: part.wordIndex, delay }}
                variants={wordVariants}
              >
                {part.token}
              </motion.span>
            </span>
          );
        })}
      </span>
    </motion.h2>
  );
}
