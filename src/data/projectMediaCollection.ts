import type { ProjectMediaCollection } from "@/types/portfolio";

export const PROJECT_MEDIA: readonly ProjectMediaCollection[] = [
    {
        id: "erich-mogensons-vei",
        type: "before-after",
        before: [
            {
                src: "/images/20220817_152812000_iOS.jpg",
                alt: "Before 1",
            },
            {
                src: "/images/20220817_152837000_iOS.jpg",
                alt: "Before 2",
            },
            {
                src: "/images/20220830_160800000_iOS.jpg",
                alt: "Before 3",
            },
            {
                src: "/images/20220830_160814000_iOS.jpg",
                alt: "Before 4",
            },
            {
                src: "/images/20220831_161313000_iOS.jpg",
                alt: "Before 5",
            },
            {
                src: "/images/20220831_161324000_iOS.jpg",
                alt: "Before 6",
            },
            {
                src: "/images/20220831_190345000_iOS.jpg",
                alt: "Before 7",
            },
            {
                src: "/images/20220906_175257000_iOS.jpg",
                alt: "Before 8",
            },
            {
                src: "/images/20220906_181005000_iOS.jpg",
                alt: "Before 9",
            },
            {
                src: "/images/20220909_190048000_iOS.jpg",
                alt: "Before 10",
            },
            {
                src: "/images/20220909_190100000_iOS.jpg",
                alt: "Before 11",
            }

        ],
        after: [
            {
                src: "/images/20221019_163624000_iOS.jpg",
                alt: "After 7",
            },
            {
                src: "/images/20221019_163616000_iOS.jpg",
                alt: "After 6",
            },
            {
                src: "/images/20221019_163557000_iOS.jpg",
                alt: "After 5",
            },
            {
                src: "/images/20220921_171609000_iOS.jpg",
                alt: "After 4",
            },
            {
                src: "/images/20220921_171557000_iOS.jpg",
                alt: "After 3",
            },
            {
                src: "/images/20220921_171550000_iOS.jpg",
                alt: "After 2",
            },
            {
                src: "/images/20220918_123139000_iOS.jpg",
                alt: "After 1",
            }
        ],
    },

    {
        id: "sørkedalsveien",
        type: "single",
        media: [
            {
                src: "/images/sørkedalsveien/before/before-1.jpeg",
                alt: "Before 1",
            },
            {
                src: "/images/sørkedalsveien/before/before-2.jpeg",
                alt: "Before 2",
            },
            {
                src: "/images/sørkedalsveien/before/before-3.jpeg",
                alt: "Before 3",
            },
            {
                src: "/images/sørkedalsveien/before/before-4.jpeg",
                alt: "Before 4",
            },
            {
                src: "/images/sørkedalsveien/before/before-5.jpeg",
                alt: "Before 5",
            },
            {
                src: "/images/sørkedalsveien/before/before-6.jpeg",
                alt: "Before 6",
            },
            {
                src: "/images/sørkedalsveien/before/before-7.jpeg",
                alt: "Before 7",
            }
        ]
    }
];

function resolveProjectMediaByIds(ids: readonly string[]) {
    const mediaById = new Map(PROJECT_MEDIA.map((entry) => [entry.id, entry]));

    return ids
        .map((id) => mediaById.get(id))
        .filter((entry): entry is ProjectMediaCollection => entry != null);
}

export async function getProjectMediaByIds(ids: readonly string[]) {
    return resolveProjectMediaByIds(ids);
}

export async function getProjectMediaById(id: string) {
    return resolveProjectMediaByIds([id])[0] ?? null;
}