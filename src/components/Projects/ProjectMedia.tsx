import { ImagePlus } from "lucide-react";
import { getProjectMediaByIds } from "@/data/projectMediaCollection";
import type { ProjectMediaCollectionId } from "@/types/portfolio";
import ProjectMediaViewer from "./ProjectMediaViewer";
import styles from "./ProjectMedia.module.css";

type ProjectMediaProps = {
  media?: readonly ProjectMediaCollectionId[];
  title: string;
  placeholderVariant?: "single" | "before-after";
};

export default async function ProjectMedia({
  media,
  title,
  placeholderVariant = "single",
}: ProjectMediaProps) {
  const projectMedia = media ? await getProjectMediaByIds(media) : [];

  if (projectMedia.length) {
    return <ProjectMediaViewer media={projectMedia} title={title} />;
  }

  if (placeholderVariant === "before-after") {
    return (
      <div
        className={styles.comparisonPlaceholder}
        role="img"
        aria-label={`Plass for før- og etterbilder til ${title}`}
      >
        <div>
          <span className={styles.placeholderLabel}>Før</span>
        </div>
        <div>
          <span className={styles.placeholderLabel}>Etter</span>
        </div>
        <span className={styles.comparisonNote}>Før / etter</span>
      </div>
    );
  }

  return (
    <div
      className={styles.placeholder}
      role="img"
      aria-label={`Plass for prosjektbilder til ${title}`}
    >
      <span className={styles.cornerMark} aria-hidden="true" />
      <ImagePlus size={24} strokeWidth={1.5} aria-hidden="true" />
      <span>Bilder kommer</span>
    </div>
  );
}