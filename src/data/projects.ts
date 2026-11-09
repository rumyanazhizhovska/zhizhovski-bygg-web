import "server-only";

import { cache } from "react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import type { Project } from "@/types/portfolio";

const projectsQuery = defineQuery(`
  *[_type == "project"] | order(period desc, _id asc) {
    "id": _id,
    title,
    summary,
    ongoingCategoryId,
    "serviceIds": coalesce(serviceIds, []),
    location,
    period,
    "media": coalesce(media[defined(@->id)]->id, [])
  }
`);

type SanityProject = Omit<Project, "period" | "ongoingCategoryId" | "location"> & {
  period: string | null;
  ongoingCategoryId: string | null;
  location: string | null;
};

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data } = await sanityFetch({ query: projectsQuery });

  return (data as SanityProject[]).map((project) => {
    const period = project.period ? new Date(project.period) : undefined;

    return {
      ...project,
      ongoingCategoryId: project.ongoingCategoryId ?? undefined,
      location: project.location ?? undefined,
      period: period && !Number.isNaN(period.getTime()) ? period : undefined,
    };
  });
});

export async function getFeaturedProjectsForCategory(categoryId: string) {
  return (await getProjects()).filter(
    (project) => project.ongoingCategoryId === categoryId,
  );
}

export async function getProjectsForService(serviceId: string) {
  return (await getProjects()).filter((project) =>
    project.serviceIds.includes(serviceId),
  );
}

export async function getProjectById(projectId: string) {
  return (await getProjects()).find((project) => project.id === projectId) ?? null;
}
