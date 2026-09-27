import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import { PROJECTS } from "@/data/projects";
import { SERVICE_CATEGORIES, SERVICE_COUNT } from "@/data/services";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export const metadata: Metadata = {
  title: "Prosjekter",
  description:
    "Utforsk prosjektbasen til Zhizhovski Bygg, sortert etter tjeneste og fagområde.",
  alternates: {
    canonical: "/projects",
  },
};

export default function Projects() {
  return (
    <main className={styles.main}>
      <section className={styles.container} aria-labelledby="projects-title">
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.eyebrow}>Prosjektarkiv / Zhizhovski Bygg</p>
            <h1 id="projects-title">
              Utført arbeid.
              <span>Sortert etter det du trenger.</span>
            </h1>
            <p className={styles.intro}>
              Hele prosjektbasen er samlet på én side og organisert etter de samme
              tjenestene du finner i tjenesteoversikten. Velg et fagområde, eller
              bla gjennom alt.
            </p>

            <div className={styles.headerActions}>
              <Button href="#project-catalog" buttonStyle="primary">
                Utforsk prosjektområdene
                <ArrowDown size={18} aria-hidden="true" />
              </Button>
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

          <aside className={styles.systemCard} aria-label="Om prosjektarkivet">
            <div className={styles.systemTopline}>
              <span>Prosjektbase</span>
            </div>
            <dl>
              <div>
                <dt>Fagområder</dt>
                <dd>{String(SERVICE_CATEGORIES.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Tjenestepunkter</dt>
                <dd>{String(SERVICE_COUNT).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Registrerte prosjekter</dt>
                <dd>{String(PROJECTS.length).padStart(2, "0")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        id="project-catalog"
        className={styles.catalogSection}
        aria-label="Alle prosjektområder"
      >
        <ProjectGallery />
      </section>

      <section className={styles.cta}>
        <div>
          <p className={styles.eyebrow}>Har du et lignende prosjekt?</p>
          <h2>La oss se på løsningen sammen.</h2>
        </div>
        <Link href="/contact" className={styles.primaryAction}>
          Få gratis befaring
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
