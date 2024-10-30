"use client";

import styles from "./page.module.css";
import React, { useRef, useState } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(true);

  return (
    <main className={styles.main}>
      <button onClick={() => setMounted(!mounted)}>
        {mounted ? "unmount" : "mount"}
      </button>
      {mounted && <Remember />}
    </main>
  );
}

function Remember() {
  const counter = useRef(0);

  function handleClick() {
    console.log(counter.current);
    counter.current = counter.current + 1;
  }

  return (
    <div>
      <div>This dev remembers {counter.current}</div>
      <button onClick={handleClick}>Increase count</button>
    </div>
  );
}
