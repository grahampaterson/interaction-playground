"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";
import React from "react";

export default function Page() {
  return (
    <main className={styles.main}>
      <button className={styles.button}>Example button</button>
      <button className={styles.button + " " + styles.alt}>
        Example button
      </button>
    </main>
  );
}
