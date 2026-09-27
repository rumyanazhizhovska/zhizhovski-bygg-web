import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Læær om mer om hvem vi er og hva vi gjør hos Zhizhovski Bygg.",
    alternates: {
        canonical: "/about-us",
    },
};


export default function AboutUs() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1>Om oss</h1>
                <p>
                    Mer info kommer snart!
                </p>
            </div>
        </main>
    );
}
