import Link from "next/link";
import styles from "./Footer.module.css";

const GITHUB_ACCOUNT = "https://github.com/rumyanazhizhovska"
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <p className={styles.brand}>Zhizhovski Bygg</p>
          <p className={styles.description}>
            Snekkerarbeid, montering og maling - gjennomført med presisjon.
          </p>
        </div>
        <nav className={styles.right} aria-label="Snarveier i bunntekst">
          <Link href="/services">Tjenester</Link>
          <Link href="/projects">Prosjekter</Link>
          <Link href="/about-us">Om oss</Link>
          <Link href="/contact">Kontakt</Link>
        </nav>
      </div>
      <div className={styles.bottom}>
        <a href={GITHUB_ACCOUNT} className={`${styles.left} ${styles.githubAccount}`} target="_blank" rel="noopener noreferrer">
          Laget med ❤️ av Rumyana Zhizhovska
        </a>
        <p className={styles.center}>Bygget for varige resultater.</p>
        <p className={styles.right}>© {new Date().getFullYear()} Zhizhovski Bygg</p>
      </div>
    </footer>
  );
}

export default Footer;
