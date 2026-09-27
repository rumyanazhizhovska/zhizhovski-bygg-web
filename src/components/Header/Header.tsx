import Link from "next/link";
import styles from "./Header.module.css";
import Menu from "../Menu/Menu";

function Header() {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        aria-label="Zhizhovski Bygg - hjem"
      >
        <img
          className={styles.img}
          src="/logo-bc-transparent.svg"
          alt="Zhizhovski Bygg"
          width="400"
          height="225"
        />
      </Link>
      <Menu />
    </header>
  );
}

export default Header;
