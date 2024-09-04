"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [toggle, setToggle] = React.useState(true);

  const emoji = ["🫢", "💸", "🙈", "🫣", "🤫", "🫥", "🤐", "🥸"];

  let chars = "$34,213.21".split("").map((c, i) => {
    return (
      <motion.div layout key={i} transition={{ duration: 0.21 }}>
        {toggle ? (
          <motion.div
            style={{
              scale: 0,
              filter: "blur(2px)",
            }}
            animate={{
              scale: toggle ? 1 : 0,
              filter: toggle ? "blur(0px)" : "blur(10px)",
            }}
          >
            {c}
          </motion.div>
        ) : [",", ".", "$"].includes(c) || i > 6 ? (
          <motion.div
            style={{
              scale: 0,
              filter: "blur(2px)",
            }}
            animate={{
              scale: toggle ? 1 : 1,
              opacity: toggle ? 1 : 0,
              // filter: toggle ? "blur(0px)" : "blur(4px)",
            }}
          ></motion.div>
        ) : (
          <motion.div
            style={{
              scale: 0,
              filter: "blur(2px)",
            }}
            animate={{
              scale: toggle ? 0 : 1,
              filter: toggle ? "blur(5px)" : "blur(0px)",
            }}
          >
            {emoji[Math.floor(Math.random() * emoji.length)]}
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
