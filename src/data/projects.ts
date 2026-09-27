import type { Project } from "@/types/portfolio";
import { SERVICE_CATEGORIES } from "@/data/services";

/**
 * Prosjektbasen er skilt fra tjenestene fordi ett prosjekt kan dekke flere
 * tjenestepunkter. Legg bilde-referanser i `PROJECT_MEDIA` og koble dem til
 * prosjekter via `media`.
 */
export const PROJECTS: readonly Project[] = [
    {
    id: "sørkedalsveien",
    title: "Sørkedalsveien",
    summary:
      "Maling av vegger, tak, gerikter, dører, dør- og vinduskarmer. Nye gulv og gulvlister. Riving nav kjøkken, bod og lettvegg. Ferdigstille overgangene ved rivende deler.",
    ongoingCategoryId: "snekkerarbeid",
    serviceIds: ["gulv", "vegger-og-romlosninger", "maling", "listverk"],
    location: "Sørkedalsveien, Oslo",
    period: "Aug, 2026",
    media: ["sørkedalsveien"],
  },
  {
    id: "erich-mogensons-vei",
    title: "Erich Mogensøns vei ",
    summary:
      "Soveromsrenovering med fokus på gulv- og veggoppgradering, gjennom isolasjon og gipsing.",
    serviceIds: ["vegger-og-romlosninger", "gipsing-og-taksenking", "gulv", "helsparkling", "maling"],
    location: "Erich Mogensøns vei, Oslo",
    period: "Aug, 2022",
    media: ["erich-mogensons-vei"],
  },
];

const knownServiceIds = new Set<string>();

SERVICE_CATEGORIES.forEach((category) => {
  category.services.forEach((service) => {
    knownServiceIds.add(service.id);
  });
});


PROJECTS.forEach((project) => {
  const unknownServiceIds = project.serviceIds.filter(
    (serviceId) => !knownServiceIds.has(serviceId),
  );

  if (unknownServiceIds.length > 0) {
    throw new Error(
      `Prosjektet "${project.id}" bruker ukjente serviceIds: ${unknownServiceIds.join(", ")}`,
    );
  }
});

function resolveFeaturedProjectsForCategory(categoryId: string) {
  return PROJECTS.filter(
    (project) => project.ongoingCategoryId === categoryId,
  );
}

function resolveProjectsForService(serviceId: string) {
  return PROJECTS.filter((project) => project.serviceIds.includes(serviceId));
}

export async function getFeaturedProjectsForCategory(categoryId: string) {
  return resolveFeaturedProjectsForCategory(categoryId);
}

export async function getProjectsForService(serviceId: string) {
  return resolveProjectsForService(serviceId);
}

export async function getProjects() {
  return PROJECTS;
}

export async function getProjectById(projectId: string) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}
