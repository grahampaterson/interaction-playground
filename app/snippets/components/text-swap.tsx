"use client";

import { motion } from "framer-motion";
import React from "react";

export default function TextSwap({ input }: { input?: string }) {
  const [active, setActive] = React.useState(true);

  const text = input ? input : "$12,113,561.35";
  const spans = text.split("").map((c, i) => {
    return (
      <motion.span
        layout
        style={{ position: "relative" }}
        animate={{
          color: active ? "#f00" : "#0f0",
          top: active ? "0.5em" : "0em",
          filter: active ? "blur(0px)" : "blur(4px)",
        }}
        key={i}
      >
        {c}
      </motion.span>
    );
  });

  return (
    <div
      onClick={() => setActive(!active)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.div>{spans}</motion.div>
      {text}
    </div>
  );
}
