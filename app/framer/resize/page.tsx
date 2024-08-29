"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Page() {
  const [toggle, setToggle] = React.useState(true);
  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => setToggle(!toggle)}>
        <motion.div
          layout
          style={{
            backgroundColor: "#ff0000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 16,
          }}
        >
          <motion.div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {toggle ? "$34,213.21" : <Dots toggle={toggle} />}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Dots({ toggle }: { toggle: boolean }) {
  let text = "✽✽✽✽✽".split("");
  let dots = text.map((s, i) => {
    return (
      <motion.div
        key={i}
        style={{
          scale: 0,
        }}
        animate={{
          scale: toggle ? 0 : 1,
        }}
      >
        {s}
      </motion.div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {dots}
    </div>
  );
}
