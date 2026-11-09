import "server-only";

import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import type { ProjectMediaCollection } from "@/types/portfolio";

const projectMediaByIdsQuery = defineQuery(`
  *[
    _type == "projectMediaCollection" &&
    _id in $ids &&
    type in ["single", "before-after"]
  ] {
    "id": _id,
    type,
    type == "single" => {
      "media": coalesce(media[defined(asset->url)] {
        "src": asset->url,
        "alt": coalesce(alt, "")
      }, [])
    },
    type == "before-after" => {
      "before": coalesce(before[defined(asset->url)] {
        "src": asset->url,
        "alt": coalesce(alt, "")
      }, []),
      "after": coalesce(after[defined(asset->url)] {
        "src": asset->url,
        "alt": coalesce(alt, "")
      }, [])
    }
  }
`);

export async function getProjectMediaByIds(
  ids: readonly string[],
): Promise<ProjectMediaCollection[]> {
  if (ids.length === 0) return [];

  const collections = await client.fetch<ProjectMediaCollection[]>(
    projectMediaByIdsQuery,
    { ids: [...ids] },
    { perspective: "published", cache: "no-store" },
  );
  const mediaById = new Map(collections.map((entry) => [entry.id, entry]));

  // GROQ does not preserve the order of IDs supplied in the parameter.
  return ids
    .map((id) => mediaById.get(id))
    .filter((entry): entry is ProjectMediaCollection => entry != null);
}

export async function getProjectMediaById(
  id: string,
): Promise<ProjectMediaCollection | null> {
  return (await getProjectMediaByIds([id]))[0] ?? null;
}
