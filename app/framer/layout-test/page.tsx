"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => setActive(!active)}>
        {active && (
          <motion.div
            style={{
              opacity: 0,
              x: -40,
            }}
            exit={{
              y: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            Some Text
          </motion.div>
        )}
        <motion.div layout="position" className={styles.icon}></motion.div>
      </div>
    </div>
  );
}
