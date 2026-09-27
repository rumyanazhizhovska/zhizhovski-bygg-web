import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./Button.module.css"

export type ButtonProps = {
    children: ReactNode;
    buttonStyle?: keyof typeof styles;
    href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;