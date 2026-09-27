import InfoCards from "@/components/InfoCard/InfoCards";
import Image from "next/image";
import styles from "./page.module.css";
import GoogleReviewsLink from "@/components/Reviews/GoogleReviewsLink";
import Button from "@/components/Button/Button";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.container} aria-labelledby="home-title">
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.eyebrow}>Hjem / Zhizhovski Bygg</p>
            <h1 id="home-title">
              Velkommen. 
              <span>
                Zhovski Bygg
              </span>
            </h1>
            <p className={styles.intro}>
              Profilerte tjenester innen bygg- spesifikt snekring, montering og maling.
              Kvalitetsarbeid for våre kunder og grundig oppfølging underveis i hele prosessen.
            </p>

            <div className={styles.headerActions}>
              <GoogleReviewsLink />
              <Button href="/contact" buttonStyle="secondary" className="hoverArrow">
                Snakk med oss
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className={`${styles.arrowUpIcon} arrowIcon`}
                />
              </Button>
            </div>
          </div>

          <aside className={styles.systemCard}>
            <div className={styles.photoFrame}>
              <Image
                src="/images/20231003_183931000_iOS.jpg"
                alt="Zhizhovski Bygg prosjektfoto"
                fill
                sizes="(max-width: 1000px) 100vw, 34rem"
                className={styles.photo}
              />
            </div>
          </aside>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="info-cards-title">
        <h2 id="info-cards-title" className={styles.sectionTitle}>
          Hvorfor oss?
        </h2>
        <InfoCards />
      </section>
    </main>
  );
}
