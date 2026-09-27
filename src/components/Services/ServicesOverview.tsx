import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";
import { SectionNavigationItem } from "@/components/SectionNavigation/types";
import { getServices } from "@/data/services";
import styles from "./ServicesOverview.module.css";

export default async function ServicesOverview() {
  const sections = await getServices();
  const navigationSections: SectionNavigationItem[] = sections.map(
    ({ id, title, description }) => ({ id, title, description }),
  );

  return (
    <div className={styles.layout}>
      <SectionNavigation sections={navigationSections} />

      <div className={styles.content}>
        {sections.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <header className={styles.sectionHeader}>
              <span className={styles.sectionNumber} aria-hidden="true">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={styles.eyebrow}>Tjenesteområde</p>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionText}>{section.description}</p>
              </div>
            </header>

            <ul className={styles.servicesList}>
              {section.services.map((service, serviceIndex) => (
                <li key={service.id} className={styles.serviceItem}>
                  <Link
                    href={`/projects#${service.id}`}
                    className={styles.serviceLink}
                    aria-label={`Se prosjekter innen ${service.title}`}
                  >
                    <span className={styles.serviceIndex} aria-hidden="true">
                      {String(serviceIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.serviceCopy}>
                      <span className={styles.serviceTitle}>
                        {service.title}
                      </span>
                      <span className={styles.serviceDescription}>
                        {service.description}
                      </span>
                    </span>
                    <ArrowUpRight
                      className={styles.serviceIcon}
                      size={20}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/projects#${section.id}`}
              className={styles.categoryLink}
            >
              Se hele prosjektområdet
              <ArrowUpRight size={18} aria-hidden="true" className={styles.arrowIcon} />
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
