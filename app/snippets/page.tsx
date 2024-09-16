import Link from "next/link";
import * as fs from "fs";
import styles from "./page.module.css";
import TextSwap from "./components/text-swap";
import LetterResize from "./components/letter-resize";
import TextSwap2 from "./components/text-swap2";
import LayoutSwap from "./components/layout-swap";
import Underline from "./components/underline";

export default function Page() {
  // eslint-disable-next-line react/jsx-key
  const snippets = [
    <Underline />,
    <LayoutSwap />,
    <TextSwap2 />,
    <TextSwap />,
    <LetterResize />,
  ];

  let wrapped = snippets.map((c, i) => {
    return (
      <div className={styles.section} key="i">
        {c}
      </div>
    );
  });

  return <div className={styles.linkBlock}>{wrapped}</div>;
}
