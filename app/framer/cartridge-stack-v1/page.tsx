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
        handleDragEnd={(e: MouseEvent) => {
          let newPages = [...pages];
          newPages.splice(i, 1);
          newPages.push(i);
          setPages(newPages);
        }}
        screenRef={screenRef}
        key={p}
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
  handleDragEnd,
  screenRef,
  children,
}: {
  active: boolean;
  handleClick: any;
  handleDragEnd: any;
  screenRef: any;
  children?: React.ReactNode;
}) {
  const [dragged, setDragged] = React.useState(false);
  const [animate, setAnimate] = React.useState({
    rotate: Math.random() * 90 - 45,
  });
  const [zIndex, setZIndex] = React.useState(0);

  const expanded = {
    minHeight: 812,
    position: "fixed",
    rotate: 0,
    left: 0,
    top: 0,
    x: 0,
    y: 0,
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
        !dragged && setDragged(true);
      }}
      className={styles.cartridge}
      style={{
        ...animate,
        borderRadius: 32,
        zIndex: zIndex,
      }}
      animate={active ? expanded : small}
      onMouseDown={() => {
        setDragged(false), setZIndex(10);
      }}
      onMouseUp={() => {
        if (dragged) {
          setDragged(false);
          handleDragEnd();
          setZIndex(0);
        } else {
          handleClick();
        }
      }}
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
