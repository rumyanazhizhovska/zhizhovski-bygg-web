"use client";

import { useEffect, useState } from "react";
import styles from "./SectionNavigation.module.css";
import { SectionNavigationProps } from "./types";

export default function SectionNavigation({
  sections,
}: SectionNavigationProps) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element != null);
    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        const mostVisibleEntry = visibleEntries[0];

        if (mostVisibleEntry) {
          setActiveSectionId(mostVisibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((sectionElement) => {
      observer.observe(sectionElement);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  function handleSectionClick(sectionId: string): void {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = window.innerWidth <= 800
      ? parseFloat(rootStyles.getPropertyValue("--header-height-mobile"))
      : parseFloat(rootStyles.getPropertyValue("--header-height"));
    const offset = headerHeight + 32;
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.history.replaceState(null, "", `#${sectionId}`);

    setActiveSectionId(sectionId);
  }

  return (
    <aside className={styles.sidebar}>
      <nav aria-label="Navigasjon mellom seksjoner">
        <ul className={styles.list}>
          {sections.map((section) => {
            const isActive = activeSectionId === section.id;

            return (
              <li key={section.id} className={styles.listItem}>
                <a
                  href={`#${section.id}`}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionClick(section.id);
                  }}
                >
                  <span className={styles.title}>{section.title}</span>

                  <span className={styles.description}>
                    {section.description}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
