import type { MetadataRoute } from "next";
import { PAGES as pages } from "@/constants/pages";

const baseUrl = "https://zhizhovski-bygg.vercel.app";

function normalizePath(path: string): string {
    if (!path || path === "/") {
        return "/";
    }

    const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
    return withLeadingSlash.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
    const uniquePaths = Array.from(new Set(pages.map(normalizePath)));

    return uniquePaths.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "/" ? 1 : 0.8,
    }));
}
