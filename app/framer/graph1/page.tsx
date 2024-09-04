"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import styles from "./page.module.css";
import React, {
  useRef,
  useState,
  MouseEvent,
  SetStateAction,
  useEffect,
} from "react";

let usd = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default function Page() {
  const [hovering, setHovering] = useState(false);
  const [posX, setPosX] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.graphOuter}>
        <GraphDetails posX={posX} hovering={hovering} />
        <Graph
          hovering={hovering}
          setHovering={setHovering}
          posX={posX}
          setPosX={setPosX}
        />
      </div>
    </div>
  );
}

function GraphDetails({ hovering, posX }: { hovering: boolean; posX: number }) {
  const [still, setStill] = React.useState(false);
  const lastMoved = useRef(0);
  const stillTimeout = 100;

  useEffect(() => {
    setStill(false);
    lastMoved.current = Date.now();
    setTimeout(() => {
      if (Date.now() - stillTimeout + 20 > lastMoved.current) {
        setStill(true);
      }
    }, stillTimeout);
  }, [posX]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const item = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  let net = (Math.random() * posX * 0.2 + posX) / 2;
  let val = Math.random() * posX * 0.2 + posX;

  return (
    <motion.div
      variants={container}
      animate={hovering ? "show" : "hidden"}
      className={styles.hoverDetails}
    >
      <motion.div variants={item} className={styles.values}>
        <div className={styles.label}>Portfolio Value</div>
        <motion.div
          animate={{ filter: still ? "blur(0px)" : "blur(2px)" }}
          transition={{
            duration: 0.07,
          }}
          className={styles.val}
        >
          {usd.format(val)}
        </motion.div>
      </motion.div>
      <motion.div variants={item} className={styles.values}>
        <div className={styles.label}>Net Deposits</div>
        <motion.div
          animate={{ filter: still ? "blur(0px)" : "blur(2px)" }}
          transition={{
            duration: 0.07,
          }}
          className={styles.val}
        >
          {usd.format(net)}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Graph({
  hovering,
  setHovering,
  posX,
  setPosX,
}: {
  hovering: boolean;
  setHovering: React.Dispatch<SetStateAction<boolean>>;
  posX: number;
  setPosX: React.Dispatch<SetStateAction<number>>;
}) {
  const [posY, setPostY] = useState(0);
  const graph = useRef(null);

  function handleMouseHover(e: MouseEvent<HTMLElement>) {
    let [x, y] = getRelativeCoordinates(e, graph.current);
    setPosX(x);
  }

  return (
    <motion.div
      onMouseMove={handleMouseHover}
      className={styles.graphContainer}
      ref={graph}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        style={{
          left: `${posX}px`,
        }}
        animate={{
          top: hovering ? "0" : "60%",
          bottom: hovering ? "0" : "40%",
          height: hovering ? "100%" : "0%",
        }}
        transition={{
          duration: 0.21,
        }}
        className={styles.marker}
      ></motion.div>
    </motion.div>
  );
}

function getRelativeCoordinates(
  e: MouseEvent<HTMLElement>,
  box: HTMLElement | null
) {
  if (box == null) {
    return [0, 0];
  }

  let relativeX = e.pageX - box.offsetLeft;
  let relativeY = e.pageY - box.offsetTop;
  let x = Math.min(Math.max(relativeX, 0), box.offsetWidth); // clamp to box bounds
  let y = Math.min(Math.max(relativeY, 0), box.offsetHeight); // clamp to box bounds
  return [x, y];
}
