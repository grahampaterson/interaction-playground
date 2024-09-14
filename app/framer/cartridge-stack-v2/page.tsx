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
        handleMouseDown={(e: MouseEvent) => {
          console.log("mouse down " + p);
        }}
        handleMouseUp={(e: MouseEvent) => {
          console.log("mouse up " + p);
          let newPages = [...pages];
          newPages.splice(i, 1);
          newPages.push(p);
          setPages(newPages);
        }}
        handleClick={(e: MouseEvent) => {
          console.log("clicked");
        }}
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
  handleMouseDown,
  handleMouseUp,
  handleClick,
  children,
}: {
  active: boolean;
  handleMouseDown: any;
  handleMouseUp: any;
  handleClick: any;
  children?: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [rotate, setRotate] = React.useState(Math.random() * 90 - 45);
  const [dragging, setDragging] = React.useState(false);

  let [shadowX, shadowY] = degToXY(-rotate + 90);

  const scaleSmall = isActive ? 1 : 0.5;
  const small = {
    scale: scaleSmall,
    aspectRatio: "1",
    overflow: "hidden",
    zIndex: mouseDown ? 10 : 0,
    borderRadius: 16 / scaleSmall,
    padding: 16 / scaleSmall,
    boxShadow: `${shadowX * 5}px ${
      shadowY * 5
    }px 25px hsla(200, 15%, 0%, 0.05)`,
    rotate: rotate,
  };

  return (
    <motion.div
      // Drag props
      drag
      dragConstraints={{ top: -300, left: -150, right: 150, bottom: 300 }}
      onDrag={(_, info) => {
        setRotate(rotate + info.delta.x / 10 + info.delta.y / 10);
        setDragging(true);
      }}
      dragMomentum={false}
      // Styling
      className={styles.cartridge}
      style={small}
      // Animate
      animate={small}
      // Mouse handler
      onMouseDown={() => {
        setDragging(false);
        handleMouseDown();
        setMouseDown(true);
      }}
      onMouseUp={() => {
        handleMouseUp();
        setMouseDown(false);
        if (dragging) {
          setDragging(false);
        } else {
          setIsActive(!isActive);
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

function degToXY(degrees: number) {
  let x = Math.cos((degrees * Math.PI) / 180);
  let y = Math.sin((degrees * Math.PI) / 180);
  return [x, y];
}
