"use client";

import {
  AnimatePresence,
  AnimationProps,
  easeIn,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.main}>
      <motion.div className={styles.screen} onClick={() => setActive(!active)}>
        <motion.div
          style={{
            padding: 16,
            backgroundColor: "#111",
            borderRadius: 16,
          }}
        >
          <AnimatePresence>
            {active ? (
              <motion.div
                exit={{
                  position: "absolute",
                  opacity: 0,
                }}
                key="1"
                style={{
                  height: 400,
                  width: 200,
                  backgroundColor: "#333",
                }}
              ></motion.div>
            ) : (
              <motion.div
                exit={{
                  position: "absolute",
                  opacity: 0,
                }}
                key="2"
                style={{
                  height: 200,
                  width: 200,
                  backgroundColor: "#555",
                }}
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
