"use client";

import styles from "./Menu.module.css";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import Button from "../Button/Button";

function Menu() {
  const pathname = usePathname();
  const [userBoxIsOpen, setBoxIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userBoxIsOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setBoxIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setBoxIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [userBoxIsOpen]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Button
        aria-label={
          userBoxIsOpen ? "Lukk navigasjonsmeny" : "Åpne navigasjonsmeny"
        }
        aria-expanded={userBoxIsOpen}
        aria-controls="main-navigation"
        onClick={() => setBoxIsOpen((current) => !current)}
        buttonStyle="menuButton"
      >
        <MenuIcon className={styles.menuIcon} />
      </Button>

      <nav
        id="main-navigation"
        className={`${styles.box} ${userBoxIsOpen ? styles.open : ""}`}
        aria-label="Hovedmeny"
      >
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link
              href="/"
              className={pathname === "/" ? styles.active : ""}
              onClick={() => setBoxIsOpen(false)}
            >
              Hjem
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/services"
              className={pathname === "/services" ? styles.active : ""}
              onClick={() => setBoxIsOpen(false)}
            >
              Tjenester
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/projects"
              className={pathname === "/projects" ? styles.active : ""}
              onClick={() => setBoxIsOpen(false)}
            >
              Prosjekter
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/about-us"
              className={pathname === "/about-us" ? styles.active : ""}
              onClick={() => setBoxIsOpen(false)}
            >
              Om oss
            </Link>
          </li>
        </ul>
        <Button
          buttonStyle="primary"
          href="/contact"
          onClick={() => {
            setBoxIsOpen(false);
          }}
        >
          Kontakt oss
        </Button>
      </nav>
    </div>
  );
}

export default Menu;
