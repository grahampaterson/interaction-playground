import Link from "next/link";
import * as fs from "fs";
import styles from "./page.module.css";

export default function Page() {
  const filePath = "app/framer";

  const files = fs.readdirSync(filePath, { withFileTypes: true });

  const links = files.map((dirent) => {
    if (!dirent.isDirectory()) {
      return null;
    }

    const name = dirent.name.split("-").join(" ");
    return (
      <Link
        key={dirent.name}
        className={styles.link}
        href={`framer/${dirent.name}`}
      >
        {name}
      </Link>
    );
  });

  return <div className={styles.linkBlock}>{/* {links} */}</div>;
}
