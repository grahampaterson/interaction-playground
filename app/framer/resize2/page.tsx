"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [toggle, setToggle] = React.useState(true);

  let chars = "$34,213.21".split("").map((c, i) => {
    return (
      <motion.div layout key={i} transition={{ duration: 0.14 }}>
        {toggle ? (
          c
        ) : [",", "."].includes(c) || i > 6 ? (
          <div
            style={{
              height: "32px",
            }}
          ></div>
        ) : (
          <motion.div
            style={{
              scale: 0,
            }}
            animate={{
              scale: toggle ? 0 : 1,
            }}
          >
            ✽
          </motion.div>
        )}
      </motion.div>
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.screen} onClick={() => setToggle(!toggle)}>
        <motion.div
          layout
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 16,
          }}
        >
          {chars}
          {toggle ? (
            <Image
              src="/icons/visibility_off.svg"
              alt="privacy"
              width="20"
              height="20"
            />
          ) : (
            <Image
              src="/icons/visibility.svg"
              alt="privacy"
              width="20"
              height="20"
            />
          )}
          q
        </motion.div>
      </div>
    </div>
  );
}

function Dots({ toggle }: { toggle: boolean }) {
  let text = "✽✽✽✽✽".split("");
  let dots = text.map((s, i) => {
    return (
      <motion.div
        key={i}
        style={{
          scale: 0,
        }}
        animate={{
          scale: toggle ? 0 : 1,
        }}
      >
        {s}
      </motion.div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {dots}
    </div>
  );
}
