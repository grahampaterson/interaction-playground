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
        <Letters active={active} a="A" b="B" />
        <Letters active={active} a="C" b="D" />
        <Letters active={active} a="M" b="1" />
        <Letters active={active} a="2" b="L" />
      </motion.div>
    </div>
  );
}

function Letters({ active, a, b }: { active: boolean; a: string; b: string }) {
  return (
    <motion.div>
      <AnimatePresence>
        {active ? (
          <motion.div
            key={a}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
              position: "absolute",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {a}
          </motion.div>
        ) : (
          <motion.div
            key={b}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
              position: "absolute",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {b}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Single({ letter }: { letter: string }) {
  return (
    <motion.div
      key={letter}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{
        scale: 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      {letter}
    </motion.div>
  );
}
