"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [animate, setAnimate] = React.useState({
    filter: "blur(0px)",
    rotate: 0,
    opacity: 1,
  });
  const [active, setActive] = React.useState(true);
  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => setActive(!active)}>
        <AnimatePresence>
          {active && (
            <motion.div
              style={{
                opacity: 0,
                rotate: -90,
                filter: "blur(12px)",
              }}
              animate={animate}
              exit={{
                rotate: 90,
                opacity: 0,
                filter: "blur(12px)",
              }}
              className={styles.testCube}
            >
              Motion div
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
