import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description: "Her kan du kontakte oss med spørsmål eller for å få gratis befaring fra Zhizhovski Bygg.",
  alternates: {
    canonical: "/contact",
  },
};


export default function Contact() {
  return (
    <main className={styles.main}>
      <section className={styles.container} aria-labelledby="contact-title">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Videre kontakt / gratis befaring</p>
          <h1 id="contact-title">Kontaktskjema</h1>
          <p className={styles.intro}>
            Send inn oppdraget ditt, så tar vi en prat om omfang, tid og
            løsning.
          </p>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
