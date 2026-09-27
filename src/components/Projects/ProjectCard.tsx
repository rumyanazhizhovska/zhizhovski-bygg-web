import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { Project, ServiceItem } from "@/types/portfolio";
import ProjectMedia from "./ProjectMedia";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project?: Project;
  relatedServices?: readonly ServiceItem[];
  serviceTitle?: string;
  slotIndex?: number;
};

export default function ProjectCard({
  project,
  relatedServices = [],
  serviceTitle,
  slotIndex = 0,
}: ProjectCardProps) {
  const isPlaceholder = project == null;
  const title =
    project?.title ?? `Prosjekt ${String(slotIndex + 1).padStart(2, "0")}`;
  const usesComparisonPlaceholder = isPlaceholder && slotIndex % 2 === 1;

  return (
    <article
      className={`${styles.card} ${isPlaceholder ? styles.placeholderCard : ""}`}
    >
      <ProjectMedia
        media={project?.media}
        title={title}
        placeholderVariant={
          usesComparisonPlaceholder ? "before-after" : "single"
        }
      />

      <div className={styles.content}>
        <div className={styles.statusRow}>
          <span className={styles.index} aria-hidden="true">
            {String(slotIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <div className={styles.titleRow}>
          <h4 className={styles.title}>{title}</h4>
          {project?.ongoingCategoryId ? (
            <span className={styles.ongoingBadge} aria-hidden>
              <span className={styles.ongoingDot} />
              Pågående
            </span>
          ) : null}
        </div>
        <p className={styles.summary}>
          {project?.summary ??
            `Prosjektbeskrivelse for prosjekter innenfor ${serviceTitle?.toLowerCase() ?? "tjenesten"}.`}
        </p>

        {project?.location || project?.period ? (
          <dl className={styles.meta}>
            {project.location ? (
              <div>
                <dt>
                  <MapPin size={14} aria-hidden="true" />
                  Sted
                </dt>
                <dd>{project.location}</dd>
              </div>
            ) : null}
            {project.period ? (
              <div>
                <dt>
                  <CalendarDays size={14} aria-hidden="true" />
                  Periode
                </dt>
                <dd>{project.period}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {relatedServices.length > 0 ? (
          <div className={styles.coverage}>
            <p>Dekker</p>
            <ul aria-label="Tjenester som inngår i prosjektet">
              {relatedServices.map((service) => (
                <li key={service.id}>
                  <Link href={`#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {isPlaceholder ? (
          <p className={styles.mediaHint}>
            {usesComparisonPlaceholder
              ? "Før- og etterbilder"
              : "Prosjektbilder"}
          </p>
        ) : null}
      </div>
    </article>
  );
}
