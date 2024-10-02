"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";
import React from "react";

export default function Page() {
  const [x, setX] = React.useState(0);

  function handleClick() {
    setX(x - 100);
  }

  return (
    <main className={styles.main} onClick={handleClick}>
      <div className={styles.container}>
        <div
          style={{
            left: x,
          }}
          className={styles.trackInner}
        >
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>
      </div>
    </main>
  );
}
