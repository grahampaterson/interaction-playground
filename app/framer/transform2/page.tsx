"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = React.useState(true);
  const [animate, setAnimate] = React.useState({
    filter: "blur(0px)",
    opacity: 1,
  });
  const [init, setInit] = React.useState({
    filter: "blur(12px)",
    opacity: 0.2,
  });

  return (
    <div className={styles.main}>
      <div
        className={styles.screen}
        onClick={() => setActive(!active)}
        onMouseDown={() => setAnimate(undefined)}
        onMouseUp={() => {
          setAnimate({
            filter: "blur(0px)",
            opacity: 1,
          });
        }}
      >
        <motion.div
          layout
          className={styles.box}
          style={{
            borderRadius: "200px",
          }}
        >
          <motion.div layout>
            {active ? (
              <motion.div style={init} animate={animate}>
                Some content
              </motion.div>
            ) : (
              <motion.div
                style={{ ...init, borderRadius: "12px" }}
                animate={animate}
                className={styles.inner}
              ></motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
