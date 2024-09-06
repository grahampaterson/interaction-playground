"use client";

import { AnimatePresence, delay, motion } from "framer-motion";
import styles from "./page.module.css";
import React, { act, ReactNode } from "react";
import { clamp, translate } from "./util";

const numFormater = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 4,
  minimumSignificantDigits: 4,
});

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.screen}>
        <div className={styles.content}>
          <Swipe numBtns={3} />
          <Swipe numBtns={2} />
          <Swipe numBtns={1} />
        </div>
      </div>
    </main>
  );
}

function Swipe({ numBtns }: { numBtns: number }) {
  const [endOffset, setEndOffset] = React.useState(0); // the last offset of the tile
  const [totalOffset, setTotalOffset] = React.useState(0); // the current offset of the tile
  const swipeRef = React.useRef(null); // a reference to the swipe container
  const [animateWidth, setAnimateWidth] = React.useState<undefined | number>(
    undefined
  ); // animates container width on release otherwise width is controlled by drag
  const [primary, setPrimary] = React.useState(false); // if the "primary action" threshold is met

  const actionsBtns = 3; // number of action buttons
  const minWidth = 74; // min width of action buttons
  const gapWidth = 8; // gap between actions and tile
  const primaryTriggerRatio = 0.8; // totoal move ratio to trigger primary action
  const minMoveRatio = 0.1; // relative move distance to open or close
  const openMoveRatio = 0.3; // total move ratio for the card to move to the open state
  const openWidth = actionsBtns * minWidth + (actionsBtns - 1) * gapWidth; // calculate container width when open

  // Store the container width for calculations
  const contWidth = swipeRef?.current ? swipeRef.current.offsetWidth : "";

  function onPanStart(event: any, info: any) {
    // console.log(totalOffset);
    // setTotalOffset(-animateWidth);
    setAnimateWidth(undefined);
  }

  function onPan(event: any, info: { offset: { x: number } }) {
    // store the totla offset of this movement plus the last movement (inverted by -1)
    let totalOffset = info.offset.x + endOffset;
    // clamp the value to the max cointainer width
    totalOffset = clamp(totalOffset, -contWidth, contWidth);

    const totalRatio = totalOffset / contWidth; // total movement of tile within container
    const moveRatio = info.offset.x / contWidth; // movement of tile this time

    // If the move is greated than the primaryTriggerThreshold ~0.8 triggers primary action
    if (totalRatio < -primaryTriggerRatio && !primary) {
      console.log("deleted");
      setPrimary(true);
    }
    if (totalRatio > -primaryTriggerRatio && primary) {
      console.log("returned");
      setPrimary(false);
    }

    // Set the tile offset to the total offset
    // ie sets the width of the action button container to the width of the drag distance
    setTotalOffset(totalOffset);
    // console.log(totalOffset);
  }

  // What to do after panning ends
  function onPanEnd(event: any, info: { offset: { x: number } }) {
    const totalRatio = totalOffset / contWidth; // total movement of tile within container
    const moveRatio = info.offset.x / contWidth; // movement of tile this time
    console.log(
      `Moved: ${numFormater.format(moveRatio)} Total: ${numFormater.format(
        totalRatio
      )}`
    );

    // If greater than primary threshold
    // ie activate primary action
    if (totalRatio < -primaryTriggerRatio) {
      setClosed();
      // activatePrimaryActionFn()
      return;
    }

    // if the relative move is less than the min move and it's in the open
    // position, animate back to open
    if (Math.abs(moveRatio) < minMoveRatio && totalRatio < -openMoveRatio) {
      setOpen();
      return;
    }

    // if moves more than move threshold from closed, open
    if (moveRatio < -minMoveRatio) {
      setOpen();
      return;
    }

    // if moved negative more than threshold close
    if (moveRatio > minMoveRatio) {
      setClosed();
      return;
    }

    // if moved less than move threshold rever to closed
    if (moveRatio > -minMoveRatio) {
      setClosed();
      return;
    }
  }

  // Funcitons to animate to open or closed
  const setOpen = () => {
    setAnimateWidth(openWidth);
    setEndOffset(-openWidth);
  };

  const setClosed = () => {
    setAnimateWidth(0);
    setEndOffset(0);
  };

  return (
    <motion.div
      ref={swipeRef}
      onPan={onPan}
      onPanEnd={onPanEnd}
      onPanStart={onPanStart}
      className={styles.swipeWrap}
    >
      <motion.div className={styles.tile}></motion.div>
      <motion.div
        className={styles.actionsWrapper}
        style={{
          marginLeft: translate(-totalOffset, 0, 64, 0, gapWidth),
          width: -totalOffset,
        }}
        animate={{
          marginLeft: animateWidth == 0 ? 0 : undefined,
          width: animateWidth,
          gap: primary ? "0px" : `${gapWidth}px`,
        }}
        transition={{
          gap: {
            delay: primary ? 0.2 : 0,
            duration: primary ? 0.1 : 0.1,
          },
        }}
      >
        <AnimatePresence>
          {!primary && (
            <>
              {numBtns > 2 && (
                <ActionBtn minWidth={minWidth} primary={primary}>
                  Far Left
                </ActionBtn>
              )}
              {numBtns > 1 && (
                <ActionBtn minWidth={minWidth} primary={primary}>
                  Left
                </ActionBtn>
              )}
            </>
          )}
        </AnimatePresence>
        <ActionBtn minWidth={minWidth} primary={primary}>
          Right
        </ActionBtn>
      </motion.div>
    </motion.div>
  );
}

function ActionBtn({
  children,
  primary,
  minWidth,
}: {
  children?: ReactNode;
  primary?: boolean;
  minWidth: number;
}) {
  return (
    <motion.div
      style={{
        minWidth: `${minWidth}px`,
        padding: primary ? "8px" : "0px",
      }}
      animate={{
        width: "100%",
        minWidth: `${minWidth}px`,
        justifyContent: primary ? "flex-start" : "center",
      }}
      initial={{
        width: "0%",
        minWidth: "0px",
      }}
      exit={{ width: "0%", minWidth: "0px" }}
      className={styles.actionBtn}
    >
      {children}
    </motion.div>
  );
}
