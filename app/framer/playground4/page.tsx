"use client";

import {
  AnimatePresence,
  AnimationProps,
  easeIn,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { SetStateAction, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState(true);
  const [animate, setAnimate] = useState<SetStateAction<any>>({
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
            opacity: [0.5, 1],
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
            overflow: "hidden",
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.8,
          }}
        >
          <AnimatePresence>
            {active ? (
              <motion.div
                layout="position"
                initial={{
                  opacity: 0,
                }}
                animate={animate}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.8,
                }}
              >
                <motion.div
                  layoutId="avatar"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#0F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#fff",
                  }}
                  animate={{
                    backgroundColor: ["#0FF", "#0F0"],
                  }}
                >
                  A
                </motion.div>
                <h2>Content A</h2>
                <p>
                  Maecenas laoreet sollicitudin erat, vel malesuada est accumsan
                  sit amet. Suspendisse velit tellus, laoreet sollicitudin
                  pretium vel, aliquam id augue. Nullam ac quam sit amet nunc
                  viverra feugiat ut quis nulla. Praesent commodo porttitor mi,
                  nec malesuada ex varius a. Morbi diam metus, efficitur quis
                  purus quis, luctus tincidunt sem. Interdum et malesuada fames
                  ac ante ipsum primis in faucibus. Donec accumsan purus et nisl
                  congue, vulputate rhoncus felis feugiat. Phasellus maximus ac
                  dui ac sodales.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout="position"
                initial={{
                  opacity: 0,
                }}
                animate={animate}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h3
                    style={{
                      flex: 1,
                    }}
                  >
                    Content B
                  </h3>
                  <motion.div
                    layoutId="avatar"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 25,
                      backgroundColor: "#0FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: "#fff",
                    }}
                    animate={{
                      backgroundColor: ["#0F0", "#0FF"],
                    }}
                  >
                    A
                  </motion.div>
                </div>

                <p>
                  Morbi diam metus, efficitur quis purus quis, luctus tincidunt
                  sem. Interdum et malesuada fames ac ante ipsum primis in
                  faucibus. Donec accumsan purus et nisl congue, vulputate
                  rhoncus felis feugiat. Phasellus maximus ac dui ac sodales.
                </p>

                <button>Click Me</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
