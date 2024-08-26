"use server";

import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Link href="/experiments">Experiments</Link>
    </main>
  );
}
