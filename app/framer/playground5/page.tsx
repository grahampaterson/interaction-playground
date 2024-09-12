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
        <motion.div
          layout
          style={{
            backgroundColor: "#ccc",
            padding: 24,
            overflow: "hidden",
          }}
          transition={{
            ease: "easeOut",
          }}
        >
          <AnimatePresence>
            {active ? (
              <motion.div
                key="a"
                className={styles.testCube}
                style={{
                  height: "50px",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: -50,
                  position: "absolute",
                }}
                initial={{
                  y: -50,
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
                  y: -50,
                  position: "absolute",
                }}
                initial={{
                  y: -100,
                }}
                animate={{
                  y: 0,
                }}
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
