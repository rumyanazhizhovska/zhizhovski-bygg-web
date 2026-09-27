"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage, ProjectMediaCollection } from "@/types/portfolio";
import styles from "./ProjectMedia.module.css";

type ProjectMediaViewerProps = {
  media: readonly ProjectMediaCollection[];
  title: string;
};

type ActiveSide = "before" | "after";

function getActiveImages(
  collection: ProjectMediaCollection,
  side: ActiveSide,
): readonly ProjectImage[] {
  if (collection.type === "single") {
    return collection.media;
  }

  return side === "before" ? collection.before : collection.after;
}

export default function ProjectMediaViewer({ media, title }: ProjectMediaViewerProps) {
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [activeSide, setActiveSide] = useState<ActiveSide>("after");
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const collection = media[collectionIndex] ?? media[0];
  const activeImages = collection ? getActiveImages(collection, activeSide) : [];

  useEffect(() => {
    setActiveSide("after");
    setImageIndex(0);
  }, [collectionIndex]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setImageIndex((currentIndex) => {
          const nextIndex = currentIndex - 1;
          return nextIndex < 0 ? activeImages.length - 1 : nextIndex;
        });
      }

      if (event.key === "ArrowRight") {
        setImageIndex((currentIndex) => {
          const nextIndex = currentIndex + 1;
          return nextIndex >= activeImages.length ? 0 : nextIndex;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImages.length, isLightboxOpen]);

  const activeImage = activeImages[imageIndex] ?? activeImages[0];

  if (!collection || !activeImage) {
    return null;
  }

  const canToggleSide = collection.type === "before-after";
  const activeLabel = collection.type === "before-after"
    ? activeSide === "before"
      ? "Før"
      : "Etter"
    : "Bilde";

  const goPrevImage = () => {
    setImageIndex((currentIndex) => {
      const nextIndex = currentIndex - 1;
      return nextIndex < 0 ? activeImages.length - 1 : nextIndex;
    });
  };

  const goNextImage = () => {
    setImageIndex((currentIndex) => {
      const nextIndex = currentIndex + 1;
      return nextIndex >= activeImages.length ? 0 : nextIndex;
    });
  };

  const selectCollection = (nextCollectionIndex: number) => {
    setCollectionIndex(nextCollectionIndex);
    setImageIndex(0);
  };

  const selectSide = (nextSide: ActiveSide) => {
    setActiveSide(nextSide);
    setImageIndex(0);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <section className={styles.viewer} aria-label={`Prosjektbilder for ${title}`}>
      <div className={styles.viewerFrame}>
        <div className={styles.viewerTopBar}>
          <div className={styles.sideButtons}>
            {canToggleSide ? (
              <>
                <button
                  type="button"
                  className={`${styles.sideButton} ${activeSide === "after" ? styles.sideButtonActive : ""}`}
                  onClick={() => selectSide("after")}
                >
                  Etter
                </button>
                <button
                  type="button"
                  className={`${styles.sideButton} ${activeSide === "before" ? styles.sideButtonActive : ""}`}
                  onClick={() => selectSide("before")}
                >
                  Før
                </button>
              </>
            ) : null}
          </div>

          <div className={styles.counter} aria-live="polite">
            {imageIndex + 1} av {activeImages.length}
          </div>
        </div>

        <div className={styles.viewerMediaStage}>
          <button
            type="button"
            className={styles.viewerImageButton}
            onClick={openLightbox}
            aria-label={`Åpne stort bilde: ${activeImage.alt}`}
          >
            <div className={styles.viewerCarouselViewport}>
              <div
                className={styles.viewerCarouselTrack}
                style={{ transform: `translateX(-${imageIndex * 100}%)` }}
              >
                {activeImages.map((image, slideIndex) => (
                  <figure
                    key={`${collection.id}-${activeSide}-${slideIndex}-${image.src}`}
                    className={styles.viewerImageShell}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 720px) 100vw, (max-width: 1200px) 52vw, 720px"
                      priority={collectionIndex === 0 && imageIndex === 0 && slideIndex === 0}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </button>

          <button
            type="button"
            className={`${styles.viewerArrow} ${styles.viewerArrowLeft}`}
            onClick={goPrevImage}
            aria-label="Forrige bilde"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            className={`${styles.viewerArrow} ${styles.viewerArrowRight}`}
            onClick={goNextImage}
            aria-label="Neste bilde"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {isLightboxOpen ? (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Forstørret bildevisning for ${title}`}
          onClick={closeLightbox}
        >
          <div
            className={styles.lightboxShell}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.lightboxHeader} />

            <div className={styles.lightboxControls}>
              <div className={styles.lightboxLeftGroup}>
                {canToggleSide ? (
                  <div className={styles.sideButtons}>
                    <button
                      type="button"
                      className={`${styles.sideButton} ${activeSide === "after" ? styles.sideButtonActive : ""}`}
                      onClick={() => selectSide("after")}
                    >
                      Etter
                    </button>
                    <button
                      type="button"
                      className={`${styles.sideButton} ${activeSide === "before" ? styles.sideButtonActive : ""}`}
                      onClick={() => selectSide("before")}
                    >
                      Før
                    </button>
                  </div>
                ) : null}
                <p className={styles.lightboxCaption}>
                  {imageIndex + 1} av {activeImages.length}
                </p>
              </div>

                <button
                    type="button"
                    className={styles.lightboxClose}
                    onClick={closeLightbox}
                    aria-label="Lukk forstørret bildevisning"
                >
                    <X size={18} />
                </button>
            </div>

            <div className={styles.lightboxCarouselViewport}>
              <div
                className={styles.lightboxCarouselTrack}
                style={{ transform: `translateX(-${imageIndex * 100}%)` }}
              >
                {activeImages.map((image, slideIndex) => (
                  <figure
                    key={`${collection.id}-${activeSide}-${slideIndex}-${image.src}-lightbox`}
                    className={styles.lightboxImageShell}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 720px) 100vw, 90vw"
                    />
                  </figure>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={goPrevImage}
              aria-label="Forrige bilde"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={goNextImage}
              aria-label="Neste bilde"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}