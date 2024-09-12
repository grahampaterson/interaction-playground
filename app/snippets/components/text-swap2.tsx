"use client";

import { motion } from "framer-motion";
import React from "react";

export default function TextSwap({ input }: { input?: string }) {
  const [active, setActive] = React.useState(true);

  return (
    <motion.div
      onClick={() => setActive(!active)}
      style={{
        fontFamily: "inter, sans-serif",
        fontSize: 48,
        display: "flex",
      }}
    >
      <motion.div
        layout
        style={{
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   width: 200,
        }}
      >
        {active ? (
          <motion.div
            key={1}
            layoutId="1"
            style={{
              border: "1px solid red",
              fontFamily: "Futura PT",
            }}
          >
            1111
          </motion.div>
        ) : (
          <motion.div
            key={2}
            layoutId="2"
            style={{
              border: "1px solid red",
              fontFamily: "Futura PT",
            }}
          >
            8888
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
