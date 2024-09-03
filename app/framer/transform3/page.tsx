"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = React.useState(true);
  const [scope, animate] = useAnimate();

  function sequence() {
    animate([
      [
        scope.current,
        {
          filter: "blur(4px)",
          opacity: 0.7,
        },
        {
          duration: 0.1,
        },
      ],
      [
        scope.current,
        {
          filter: "blur(0px)",
          opacity: 1,
        },
        {
          duration: 0.2,
        },
      ],
    ]);
  }

  return (
    <div className={styles.main}>
      <div
        className={styles.screen}
        onClick={() => {
          sequence();
          setActive(!active);
        }}
      >
        <motion.div
          layout
          className={styles.box}
          style={{
            borderRadius: "200px",
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <motion.div
            layout
            ref={scope}
            transition={{
              duration: 0.3,
            }}
          >
            {active ? (
              <div>$23,124.15</div>
            ) : (
              <div
                style={{
                  display: "flex",
                }}
              >
                <div className={styles.inner}></div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
