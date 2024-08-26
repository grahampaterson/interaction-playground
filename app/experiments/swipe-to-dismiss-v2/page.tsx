"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React from "react";
import { clamp } from "./util";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.screen}>
        <div className={styles.content}>
          <Swipe />
        </div>
      </div>
    </main>
  );
}

type TileState = "middle" | "left" | "right";

function Swipe() {
  const [endOffset, setEndOffset] = React.useState(0); // the last offset of the tile
  const [totalOffset, setTotalOffset] = React.useState(0); // the current offset of the tile
  const swipeRef = React.useRef(null); // a reference to the swipe container
  const [animateTo, setAnimateTo] = React.useState<undefined | number>(
    undefined
  );
  const [tileState, setTileState] = React.useState<TileState>("middle");
  const [actionsWidth, setActionsWidth] = React.useState(0);

  let totalTileWidth = 148 + 16;

  function onPanStart(event, info) {
    setAnimateTo(undefined);
  }

  function onPan(event, info) {
    // Store the container width for calculations
    const contWidth = swipeRef?.current?.offsetWidth
      ? swipeRef.current.offsetWidth
      : "";

    // store the totla offset of this movement plus the last movement (inverted by -1)
    let totalOffset = info.offset.x + endOffset;
    // clamp the value to the max cointainer width
    totalOffset = clamp(totalOffset, -contWidth, contWidth);

    // Set the tile offset to the total offset
    setTotalOffset(totalOffset);
    setActionsWidth(-totalOffset - 8);
  }

  // What to do after panning ends
  function onPanEnd(event, info) {
    // Store the container width for calculations
    const contWidth = swipeRef?.current?.offsetWidth
      ? swipeRef.current.offsetWidth
      : "";

    const actions = 2;
    // Store the last x offset of the tile to be added to any future movements
    let totalOffset = info.offset.x + endOffset;
    totalOffset = clamp(totalOffset, -contWidth, contWidth);

    const totalRatio = totalOffset / contWidth; // total movement of tile within container
    const moveRatio = info.offset.x / contWidth; // movement of tile this time

    // 0.1 == tile -> right
    // -0.1 == tile <- left

    // If movement is too small snap back to the current tile state position
    if (Math.abs(moveRatio) < 0.1) {
      switch (tileState) {
        case "middle":
          animateMiddle();
          break;
        case "left":
          animateLeft();
          break;
        case "right":
          animateRight();
          break;
      }
    }

    // If more than 70% total in either direction perform action
    if (totalRatio > 0.7) {
      console.log("deleted left");
    }
    if (totalRatio < -0.7) {
      console.log("deleted right");
    }

    // Move more than 10% left snap to open
    if ((tileState == "middle" || tileState == "left") && moveRatio < -0.1) {
      animateLeft();
    }
    // Move more than 10% right snap to open
    if ((tileState == "middle" || tileState == "right") && moveRatio > 0.1) {
      animateRight();
    }
    // Move more than 10% right from left snap to middle
    if (tileState == "left" && moveRatio > 0.1) {
      animateMiddle();
    }
    // Move more than 10% left from right snap to middle
    if (tileState == "right" && moveRatio < -0.1) {
      animateMiddle();
    }

    console.log(moveRatio);
    // setEndOffset(totalOffset);
  }

  // Functions to snap to a position
  function animateMiddle() {
    setAnimateTo(0);
    setEndOffset(0);
    setActionsWidth(0);
    setTileState("middle");
  }

  function animateLeft() {
    setAnimateTo(-totalTileWidth);
    setEndOffset(-totalTileWidth);
    setActionsWidth(totalTileWidth - 8);
    setTileState("left");
  }

  function animateRight() {
    setAnimateTo(totalTileWidth);
    setEndOffset(totalTileWidth);
    setActionsWidth(totalTileWidth - 8);
    setTileState("right");
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={swipeRef}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onPanStart={onPanStart}
        className={styles.swipeWrap}
      >
        <motion.div
          animate={{
            x: animateTo,
          }}
          style={{
            x: totalOffset,
          }}
          className={styles.tile}
        ></motion.div>
        <motion.div
          className={styles.actionsWrapper}
          style={{
            width: actionsWidth,
          }}
          animate={{
            width: animateTo ? Math.abs(animateTo) - 8 : animateTo,
          }}
        >
          <ActionBtn />
          <ActionBtn />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ActionBtn() {
  return <div className={styles.actionBtn}></div>;
}
