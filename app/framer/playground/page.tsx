"use client";

import {
  AnimatePresence,
  AnimationProps,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [animate, cycle] = useCycle(
    { scale: 1, rotate: 45, y: 40, transition: { duration: 2 } },
    { scale: 1.3, rotate: 0, y: 0 }
  );

  const transition: AnimationProps["transition"] = {
    // ease: "anticipate",
    duration: 0.5,
    scale: {
      // delay: 0.2,
      duration: 0.2,
    },
    y: {
      type: "spring",
    },
  };

  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => cycle()}>
        <motion.div
          initial={false}
          className={styles.testCube}
          animate={animate}
          transition={transition}
        ></motion.div>
      </div>
    </div>
  );
}
