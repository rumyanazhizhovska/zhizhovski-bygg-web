import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react";


export type InfoCardProps = {
    title: string;
    children: ReactNode;
    Icon: LucideIcon
}