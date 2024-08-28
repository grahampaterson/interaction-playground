"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";
import React from "react";
import Image from "next/image";

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
      <motion.div className={labelClass}>
        <AnimatePresence>
          {privacyMode ? (
            <motion.span
              layout="position"
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 1.1,
              }}
            >
              Home
            </motion.span>
          ) : (
            <motion.span
              layout="position"
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 1.1,
              }}
            >
              PRIVATE
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
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
              translateX: -20,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            exit={{
              opacity: 0,
              translateX: 20,
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
      <AnimatePresence key={i}>
        {privacyMode ? (
          <motion.span
            layoutId={`${i}span`}
            initial={{
              translateY: -20,
              scale: 0.8,
              opacity: 0.2,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
            }}
          >
            ●
          </motion.span>
        ) : (
          <motion.span layoutId={`${i}span`}>{char}</motion.span>
        )}
      </AnimatePresence>
    );
  });

  return <motion.div className={styles.balanceAmount}>{val}</motion.div>;
}
