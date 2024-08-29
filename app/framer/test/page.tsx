"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [panning, setPanning] = React.useState(false);
  const [animate, setAnimate] = React.useState({
    x: 0,
    rotate: 0,
  });

  return (
    <div className={styles.main}>
      <div className={styles.screen}>
        <motion.div
          className={styles.testCube}
          style={{
            // originX: 0.5,
            // originY: 0,
            ...animate,
          }}
          animate={{
            scale: panning ? 1.5 : 1,
          }}
          onPan={(_, info) => {
            setAnimate({
              x: animate.x + info.delta.x,
              rotate: animate.rotate + info.delta.x,
            });
          }}
          onPanStart={() => setPanning(true)}
          onPanEnd={() => setPanning(false)}
          // animate={{
          //   // x: 300,
          //   // y: 100,
          //   rotate: rot,
          // }}
          // transition={{
          //   duration: 1,
          //   // repeat: Infinity,
          // }}
        ></motion.div>
      </div>
    </div>
  );
}
