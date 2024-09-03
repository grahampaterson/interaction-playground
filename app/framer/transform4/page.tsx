"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = React.useState(true);
  const [animate, setAnimate] = React.useState({
    opacity: 0.2,
  });

  return (
    <div className={styles.main}>
      <div
        className={styles.screen}
        onClick={() => {
          setActive(!active);
          setAnimate({
            opacity: 0.2,
          });
        }}
        onMouseDown={() => setAnimate(undefined)}
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
            style={{
              opacity: 1,
            }}
            animate={animate}
            transition={{
              duration: 0.3,
              repeatType: "reverse",
              repeat: 1,
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
