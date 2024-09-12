"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

let dollars = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

export default function LetterResize({ input }: { input?: string }) {
  const [amount, setAmount] = React.useState(123456);
  const [newAmount, setNewAmount] = React.useState(23456);
  const [active, setActive] = React.useState(true);
  let strAmount = dollars.format(amount);
  let strNewAmount = dollars.format(newAmount);

  React.useEffect(() => {
    setInterval(() => {
      setNewAmount(amount);
      setAmount(amount + Math.floor(Math.random() * 50));
    }, 1000);
  }, []);

  const text = input ? input : "$12,113,561.35";
  const spans = strAmount.split("").map((c, i) => {
    return (
      <motion.div layout style={{ position: "relative" }} key={i}>
        <AnimatePresence>
          {c != strNewAmount[i] ? (
            <motion.span
              key="1"
              initial={{
                position: "absolute",
                top: "-0.5em",
                filter: "blur(4px)",
                opacity: 0,
              }}
              animate={{
                position: "relative",
                top: "0em",
                filter: "blur(0px)",
                opacity: 1,
              }}
              exit={{
                position: "absolute",
                top: "0.5em",
                filter: "blur(4px)",
                opacity: 0,
              }}
              style={{
                position: "relative",
              }}
            >
              {c}
            </motion.span>
          ) : (
            <motion.span
              key="2"
              initial={{
                position: "absolute",
                top: "-0.5em",
                filter: "blur(4px)",
                opacity: 0,
              }}
              animate={{
                position: "relative",
                top: "0em",
                filter: "blur(0px)",
                opacity: 1,
              }}
              exit={{
                position: "absolute",
                top: "0.5em",
                filter: "blur(4px)",
                opacity: 0,
              }}
              style={{
                position: "relative",
              }}
            >
              {strNewAmount[i]}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  });

  return (
    <motion.div
      onClick={() => setActive(!active)}
      style={{
        display: "flex",
      }}
    >
      {spans}
    </motion.div>
  );
}
