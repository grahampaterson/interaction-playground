"use client";

import {
  AnimatePresence,
  AnimationProps,
  easeIn,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState(true);
  const [animate, setAnimate] = useState({
    opacity: 1,
    filter: "blur(0px)",
  });

  return (
    <div className={styles.main}>
      <div
        className={styles.screen}
        onClick={() => setActive(!active)}
        onMouseDown={() => {
          setAnimate(undefined);
        }}
        onMouseUp={() => {
          setAnimate({
            opacity: [0, 1],
            filter: ["blur(16px)", "blur(0px)"],
          });
        }}
      >
        <motion.div
          layout
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "#000",
            color: "#fff",
            width: "70%",
          }}
          transition={{
            duration: 0.4,
          }}
        >
          {active ? (
            <motion.div
              layout="position"
              initial={{
                opacity: 0,
              }}
              animate={animate}
              transition={{
                ease: "easeOut",
                duration: 0.4,
              }}
            >
              <h2>Content A</h2>
              <p>
                Maecenas laoreet sollicitudin erat, vel malesuada est accumsan
                sit amet. Suspendisse velit tellus, laoreet sollicitudin pretium
                vel, aliquam id augue. Nullam ac quam sit amet nunc viverra
                feugiat ut quis nulla. Praesent commodo porttitor mi, nec
                malesuada ex varius a. Morbi diam metus, efficitur quis purus
                quis, luctus tincidunt sem. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Donec accumsan purus et nisl congue,
                vulputate rhoncus felis feugiat. Phasellus maximus ac dui ac
                sodales.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout="position"
              initial={{
                opacity: 0,
              }}
              animate={animate}
              transition={{
                ease: "easeOut",
                duration: 0.4,
              }}
            >
              <h3>Content B</h3>
              <p>
                Morbi diam metus, efficitur quis purus quis, luctus tincidunt
                sem. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Donec accumsan purus et nisl congue, vulputate rhoncus
                felis feugiat. Phasellus maximus ac dui ac sodales.
              </p>
              <button>Click Me</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
