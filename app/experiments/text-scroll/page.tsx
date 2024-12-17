"use client";

import styles from "./page.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const textA = useRef(null);
  const textB = useRef(null);
  const timer = useRef(0);
  const transY = useRef(0);

  useEffect(() => {
    if (value == currentValue) {
      return;
    }
    transY.current = 0;
    setPreviousValue(currentValue);
    setCurrentValue(value);
    console.log(direction);
  }, [value, currentValue, direction]);

  const speed = 1;

  useEffect(() => {
    if (value == currentValue) {
      return;
    }
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      console.log(transY.current);
      if (Math.abs(transY.current) == 100) {
        clearInterval(timer.current);
        return;
      }
      let newVal;
      if (direction == "up") {
        newVal = transY.current - speed;
        transY.current = newVal < -100 ? -100 : newVal;
      } else {
        newVal = transY.current - speed;
        transY.current = newVal > 100 ? 100 : transY.current + speed;
      }

      if (textA.current == null || textB.current == null) {
        return;
      }
      textA.current.style.transform = `translateY(${
        newVal >= 0 ? newVal - 100 : newVal + 100
      }%)`;
      textA.current.style.opacity = Math.abs(newVal / 100);
      textB.current.style.transform = `translateY(${newVal}%)`;
      textB.current.style.opacity = 1 - Math.abs(newVal / 100);
    }, 1);
  }, [value, currentValue, direction]);

  return (
    <div className={styles.textStyle}>
      <div
        style={{
          position: "relative",
        }}
        ref={textA}
      >
        {value}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
        }}
        ref={textB}
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
