"use client";

import {
  AnimatePresence,
  AnimationProps,
  motion,
  useCycle,
} from "framer-motion";
import styles from "./page.module.css";
import React, { CSSProperties, Ref, RefObject, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [active, setActive] = useState<number | undefined>(undefined);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);

  const screenRef = useRef(null);

  const stack = pages.map((p, i) => {
    return (
      <PageView
        active={i == active}
        handleClick={(e: MouseEvent) =>
          i == active ? setActive(undefined) : setActive(i)
        }
        screenRef={screenRef}
        key={i}
      />
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.screen} ref={screenRef}>
        {stack}
      </div>
    </div>
  );
}

function PageView({
  active,
  handleClick,
  screenRef,
  children,
}: {
  active: boolean;
  handleClick: any;
  screenRef: any;
  children?: React.ReactNode;
}) {
  const [animate, setAnimate] = React.useState({
    rotate: Math.random() * 90 - 45,
  });

  const expanded = {
    minHeight: 812,
  };
  const small = {
    scale: 0.5,
    aspectRatio: "1",
    overflow: "hidden",
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      // dragSnapToOrigin={true}
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
      onDrag={(_, info) => {
        setAnimate({
          rotate: animate.rotate + info.delta.x / 10 + info.delta.y / 10,
        });
      }}
      className={styles.cartridge}
      style={{
        ...animate,
        borderRadius: 32,
      }}
      animate={active ? expanded : small}
    >
      <h1>Page Title</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        non quam in fermentum. Sed pellentesque dictum arcu, id tincidunt quam
        tincidunt vitae.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        non quam in fermentum. Sed pellentesque dictum arcu, id tincidunt quam
        tincidunt vitae.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        non quam in fermentum. Sed pellentesque dictum arcu, id tincidunt quam
        tincidunt vitae.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        non quam in fermentum. Sed pellentesque dictum arcu, id tincidunt quam
        tincidunt vitae.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        non quam in fermentum. Sed pellentesque dictum arcu, id tincidunt quam
        tincidunt vitae.
      </p>
    </motion.div>
  );
}
