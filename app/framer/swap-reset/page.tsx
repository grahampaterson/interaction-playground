"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = React.useState(true);
  const amount = "$23,135.83";

  let out = amount.split("").map((n, i) => {});

  return (
    <div className={styles.main}>
      <div
        className={styles.screen}
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className={styles.textWrap}>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            $
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 1 : 0,
            }}
          >
            🥸
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            1
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 1 : 0,
            }}
          >
            🥸
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            2
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 1 : 0,
            }}
          >
            🥸
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            ,
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 1 : 0,
            }}
          >
            🥸
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            3
          </motion.div>
          <motion.div
            animate={{
              scale: active ? 0 : 1,
            }}
          >
            7
          </motion.div>
        </div>
      </div>
    </div>
  );
}
