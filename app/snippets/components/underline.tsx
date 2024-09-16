"use client";

import { CSSProperties, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Underline() {
  const [active, setActive] = useState(1);

  const tabs = ["hello", "graham"].map((s, i) => {
    return (
      <div key={i} onClick={() => setActive(i)}>
        <div>{s}</div>
        {active == i && (
          <motion.div style={styles.underline} layoutId="underLine" />
        )}
      </div>
    );
  });

  return <div style={styles.container}>{tabs}</div>;
}

const styles = {
  container: {
    display: "flex",
  },

  underline: {
    height: 4,
    backgroundColor: "#f00",
  },
};
