"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";
import { relative } from "path";

export default function Page() {
  const [privacyMode, setPrivacyMode] = React.useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.screen}>
        <TopNav privacyMode={privacyMode} />
        <PageTop privacyMode={privacyMode} setPrivacyMode={setPrivacyMode} />
      </div>
    </div>
  );
}

function TopNav({ privacyMode }: { privacyMode: boolean }) {
  return (
    <div className={styles.topNav}>
      <div className={styles.navLeft}>
        <Image
          src="/icons/notifications_unread.svg"
          alt="notifications"
          width="24"
          height="24"
        />
      </div>
      <NavLabel privacyMode={privacyMode} />
      <div className={styles.navRight}>
        <Image
          src="/icons/featured_seasonal_and_gifts.svg"
          alt="rewards"
          width="24"
          height="24"
        />
        <Image src="/icons/person.svg" alt="profile" width="24" height="24" />
      </div>
    </div>
  );
}

function NavLabel({ privacyMode }: { privacyMode: boolean }) {
  const labelClass = privacyMode ? styles.navLabelInner : styles.navPremiumTag;
  return (
    <div className={styles.navLabel}>
      {privacyMode ? (
        <motion.div layout="position">Home</motion.div>
      ) : (
        <motion.div layout="position">PRIVATE</motion.div>
      )}
    </div>
  );
}

function PageTop({
  privacyMode,
  setPrivacyMode,
}: {
  privacyMode: boolean;
  setPrivacyMode: React.Dispatch<boolean>;
}) {
  return (
    <div className={styles.pageTop}>
      <div className={styles.balanceRow}>
        <BalanceAmount value="$24,242.45" privacyMode={privacyMode} />
        <div
          className={styles.privacyToggle}
          onClick={() => setPrivacyMode(!privacyMode)}
        >
          {privacyMode ? (
            <Image
              src="/icons/visibility_off.svg"
              alt="privacy"
              width="20"
              height="20"
            />
          ) : (
            <Image
              src="/icons/visibility.svg"
              alt="privacy"
              width="20"
              height="20"
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {privacyMode && (
          <motion.div
            initial={{
              opacity: 0,
              translateY: 10,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: 10,
            }}
            className={styles.changeAmount}
          >
            +$1,236.32(+3.32%) past 3 months
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BalanceAmount({
  value,
  privacyMode,
}: {
  value: string;
  privacyMode: boolean;
}) {
  let val = value.split("").map((char, i) => {
    return (
      <motion.span
        key={i}
        animate={{
          y: privacyMode ? 0 : 20,
          opacity: privacyMode ? 1 : 0,
        }}
      >
        {char}
      </motion.span>
    );
  });

  let privateDots = value.split("").map((char, i) => {
    return (
      <motion.div
        key={i + 10}
        style={{
          width: "100%",
          position: "relative",
        }}
        animate={{
          scale: privacyMode ? 0 : 1.2,
          rotate: privacyMode ? 0 : 180,
          y: privacyMode ? -20 : 0,
          // opacity: privacyMode ? 0 : 10,
        }}
        transition={{
          duration: 0.14,
        }}
      >
        ٭
      </motion.div>
    );
  });

  return (
    <motion.div className={styles.balanceAmount}>
      {val}
      <div
        style={{
          position: "absolute",
          display: "flex",
        }}
      >
        {privateDots}
      </div>
    </motion.div>
  );
}
