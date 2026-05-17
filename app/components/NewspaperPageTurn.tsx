"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type NewspaperPageTurnProps = {
  activePage: "front" | "desk";
  children: ReactNode;
};

export default function NewspaperPageTurn({
  activePage,
  children,
}: NewspaperPageTurnProps) {
  return (
    <div className="overflow-hidden bg-white [perspective:1800px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activePage}
          initial={{
            rotateY: activePage === "desk" ? -14 : 14,
            x: activePage === "desk" ? 80 : -80,
            opacity: 0,
            transformOrigin:
              activePage === "desk" ? "left center" : "right center",
          }}
          animate={{
            rotateY: 0,
            x: 0,
            opacity: 1,
            transformOrigin: "center center",
          }}
          exit={{
            rotateY: activePage === "desk" ? 10 : -10,
            x: activePage === "desk" ? -60 : 60,
            opacity: 0,
            transformOrigin:
              activePage === "desk" ? "right center" : "left center",
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="relative min-h-screen bg-white"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8"
            style={{
              background:
                "linear-gradient(to left, rgba(17,17,17,0.08), rgba(17,17,17,0.03), transparent)",
            }}
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}