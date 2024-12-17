"use client";

import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";

type direction = "up" | "down";

export default function Page() {
  const [character, setCharacter] = useState("6");
  const [direction, setDirection] = useState<direction>("up");

  function updateValue() {
    let previousVal = character;
    let newVal = randomCharacter();
    setCharacter(newVal);
    if (previousVal > newVal) {
      setDirection("down");
    } else {
      setDirection("up");
    }
  }
  return (
    <main className={styles.main}>
      <button className={styles.cycleButton} onClick={updateValue}>
        New Value
      </button>
      <TextBox value={character} direction={direction} />
    </main>
  );
}

function TextBox({
  value,
  direction = "up",
}: {
  value: string;
  direction?: direction;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [transition, setTransition] = useState(0);

  useEffect(() => {
    if (value == currentValue) {
      return;
    }
    setPreviousValue(currentValue);
    setCurrentValue(value);
    console.log(direction);
    if (direction == "up") {
      setTransition(200);
    } else {
      setTransition(-200);
    }
  }, [value, currentValue, direction]);

  function printValues() {
    console.log(`${value} ${previousValue}`);
  }

  return (
    <div className={styles.textStyle}>
      <div
        style={{
          top: transition,
          transition: "top 1000ms ease",
          position: "relative",
        }}
      >
        {value}
      </div>
      <div
        style={{
          opacity: 0.3,
          position: "absolute",
          top: direction == "down" ? "100%" : "-100%",
        }}
        // onClick={printValues}
      >
        {previousValue}
      </div>
    </div>
  );
}

function randomCharacter() {
  const characters = "1234567890".split("");

  const index = Math.floor(Math.random() * characters.length);
  return characters[index];
}
