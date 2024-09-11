"use client";

import {
  AnimatePresence,
  AnimationProps,
  easeInOut,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const childVariants = {
    first: (custom: number) => {
      return {
        x: custom,
        scale: Math.random() * 0.3 + 0.5,
      };
    },
    second: {
      scale: 1,
    },
  };

  return (
    <div className={styles.main}>
      <div className={styles.screen}>
        <motion.div
          className={styles.testCube}
          animate="second"
          whileHover="first"
          transition={{
            staggerChildren: 0.5,
          }}
        >
          <motion.div
            custom={-10}
            variants={childVariants}
            className={styles.childDiv}
          ></motion.div>
          <motion.div
            custom={10}
            variants={childVariants}
            className={styles.childDiv}
          ></motion.div>
          <motion.div
            custom={-10}
            variants={childVariants}
            className={styles.childDiv}
          ></motion.div>
          <motion.div
            custom={10}
            variants={childVariants}
            className={styles.childDiv}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}
