import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";
import type { SectionNavigationItem } from "@/components/SectionNavigation/types";
import {
  getFeaturedProjectsForCategory,
  getProjectsForService,
} from "@/data/projects";
import { getServicesByIds, getServices } from "@/data/services";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectGallery.module.css";

const MINIMUM_PROJECT_SLOTS = 2;

export default async function ProjectGallery() {
  const categories = await getServices();
  const navigationSections: SectionNavigationItem[] = categories.map(
  ({ id, title, description }) => ({ id, title, description }),
  );

  return (
    <div className={styles.layout}>
      <SectionNavigation sections={navigationSections} />

      <div className={styles.catalog}>
        {await Promise.all(
          categories.map(async (category, categoryIndex) => {
            const categoryProjects = await getFeaturedProjectsForCategory(
              category.id,
            );

            return (
              <section
                key={category.id}
                id={category.id}
                className={styles.category}
              >
                <header className={styles.categoryHeader}>
                  <div className={styles.categoryMeta}>
                    <span aria-hidden="true">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{category.services.length} tjenestepunkter</span>
                  </div>
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </header>

                {categoryProjects.length > 0 ? (
                  <div className={styles.registeredProjects}>
                    <div className={styles.blockHeader}>
                      <p>Pågående prosjekter</p>
                      <span>{categoryProjects.length} registrert</span>
                    </div>
                    <div className={styles.projectGrid}>
                      {categoryProjects.map((project, projectIndex) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          relatedServices={getServicesByIds(project.serviceIds)}
                          slotIndex={projectIndex}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className={styles.serviceGroups}>
                  {await Promise.all(
                    category.services.map(async (service, serviceIndex) => {
                      const serviceProjects = await getProjectsForService(
                        service.id,
                      );
                      const placeholderCount = Math.max(
                        0,
                        MINIMUM_PROJECT_SLOTS - serviceProjects.length,
                      );

                      return (
                        <article
                          key={service.id}
                          id={service.id}
                          className={styles.serviceGroup}
                        >
                          <header className={styles.serviceHeader}>
                            <span
                              className={styles.serviceNumber}
                              aria-hidden="true"
                            >
                              {String(serviceIndex + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3>{service.title}</h3>
                              <p>{service.description}</p>
                            </div>
                            <span className={styles.projectCount}>
                              {serviceProjects.length > 0
                                ? `${serviceProjects.length} prosjekt${serviceProjects.length === 1 ? "" : "er"}`
                                : "Klar for prosjekter"}
                            </span>
                          </header>

                          <div className={styles.projectGrid}>
                            {serviceProjects.map((project, projectIndex) => (
                              <ProjectCard
                                key={project.id}
                                project={project}
                                relatedServices={getServicesByIds(
                                  project.serviceIds,
                                )}
                                slotIndex={projectIndex}
                              />
                            ))}
                            {Array.from({ length: placeholderCount }, (_, index) => (
                              <ProjectCard
                                key={`${service.id}-slot-${index}`}
                                serviceTitle={service.title}
                                slotIndex={serviceProjects.length + index}
                              />
                            ))}
                          </div>
                        </article>
                      );
                    }),
                  )}
                </div>
              </section>
            );
          }),
        )}
      </div>
    </div>
  );
}
