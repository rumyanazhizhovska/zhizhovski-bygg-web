"use client";

import Link from "next/link";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

const isInternalLink = (href: string) => {
  return href.startsWith("/") || href.startsWith("#");
};

export default function Button({
  type = "button",
  children,
  buttonStyle = "",
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    buttonStyle ? styles[buttonStyle] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (isInternalLink(href)) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
