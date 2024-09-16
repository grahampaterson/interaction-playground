"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutSwap() {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <>
      <motion.div
        layout
        style={{
          background: "lightblue",
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        transition={{
          duration: 2,
        }}
      >
        <AnimatePresence>
          {isFirst ? (
            <motion.div
              key="first"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, position: "relative" }}
              exit={{ opacity: 0, position: "absolute" }}
              transition={{ duration: 2 }}
              style={{ background: "lightgreen", padding: 20 }}
            >
              First Element
            </motion.div>
          ) : (
            <motion.div
              key="second"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, position: "relative" }}
              exit={{ opacity: 0, position: "absolute" }}
              transition={{ duration: 2 }}
              style={{ background: "lightcoral", padding: 40 }}
            >
              Second Element
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <button onClick={() => setIsFirst(!isFirst)}>Swap Element</button>
    </>
  );
}
