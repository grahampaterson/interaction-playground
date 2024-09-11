"use client";

import {
  AnimatePresence,
  AnimationProps,
  easeIn,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { SetStateAction, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => setActive(!active)}>
        <AnimatePresence>
          {active ? (
            <motion.div
              key="a"
              className={styles.testCube}
              exit={{
                opacity: 0,
                y: -200,
                position: "absolute",
              }}
              initial={{
                y: -200,
              }}
              animate={{
                y: 0,
              }}
            ></motion.div>
          ) : (
            <motion.div
              key="b"
              className={styles.testCube}
              style={{
                backgroundColor: "#f00",
              }}
              exit={{
                opacity: 0,
                y: -200,
                position: "absolute",
              }}
              initial={{
                y: -200,
              }}
              animate={{
                y: 0,
              }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
