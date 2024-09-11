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
      <ScreenTwo />
      <ScreenThree />
    </div>
  );
}

function ScreenTwo() {
  return (
    <div className={styles.screen}>
      <motion.div
        className={styles.testCube}
        animate={{
          y: [50, 0, -50],
          rotate: [0, 45, 0, 15, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeatType: "reverse",
            repeat: Infinity,
            ease: "linear",
          },
          rotate: { duration: 0.75, repeatType: "reverse", repeat: Infinity },
        }}
      ></motion.div>
    </div>
  );
}

function ScreenThree() {
  const [current, setCurrent] = useState(0);
  const states = ["top", "middle", "bottom"];

  const variants = {
    top: {
      y: -200,
      scale: 0.5,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
    middle: {
      y: 0,
      scale: 2,
      transition: { duration: 2, staggerChildren: 0.3 },
    },
    bottom: {
      y: 200,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.3 },
    },
  };

  const childVariants = {
    top: {
      x: 50,
    },
    middle: {
      x: 0,
      rotate: 45,
    },
    bottom: {
      x: -50,
      y: -50,
      transition: {
        y: {
          ease: "easeIn",
          duration: 1,
        },
        x: {
          duration: 2,
        },
      },
    },
  };

  return (
    <div className={styles.screen}>
      <motion.div
        animate={states[current]}
        onClick={() => {
          setCurrent((current + 1) % states.length);
        }}
        className={styles.testCube}
        variants={variants}
      >
        <motion.div
          className={styles.childDiv}
          variants={childVariants}
        ></motion.div>
        <motion.div
          className={styles.childDiv}
          variants={childVariants}
        ></motion.div>
      </motion.div>
    </div>
  );
}
