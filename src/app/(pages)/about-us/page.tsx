import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { defineQuery } from "next-sanity";
import Button from "@/components/Button/Button";
import { client } from "@/sanity/client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Bli kjent med Zhizhovski Bygg. Snekkerarbeid, montering og maling i Oslo og omegn.",
  alternates: { canonical: "/about-us" },
};

const pageBeginningQuery = defineQuery(`
    coalesce(*[_type == "aboutUsPageBeginingType"][0]{
        title1,
        title2,
        description,
        image{
          asset->{url}
        }
    }, {
        "title1": "Godt håndverk.",
        "title2": "Et bedre sted å bo.",
        "description": null,
        "image": null
    })
`);

const ourHistoryQuery = defineQuery(`
    coalesce(*[_type == "aboutUsOurHistoryType"][0]{
        title,
        description1,
        description2
    }, {
        "title": "Vår historie",
        "description1": null,
        "description2": null,
    })
`);

const sectionQuery = defineQuery(`
    coalesce(*[_type == "aboutUsSectionType"][0].sections[]{
        _key,
        title,
        description,
        image{
          asset->{url}
        }
    }, [])
`);

const principlesQuery = defineQuery(`
  coalesce(*[_type == "aboutUsPrinciplesType"][0].principles[]{
    _key,
    title,
    "text": description
  }, [])
`);

type PageBeginning = {
  title1: string | null;
  title2: string | null;
  description: string | null;
  image: { asset: { url: string } } | null;
};

type Principle = {
  _key: string;
  title: string | null;
  text: string | null;
};

export default async function AboutUs() {
  const pageBeginning = await client.fetch<PageBeginning>(pageBeginningQuery, {}, {
    perspective: "published",
    cache: "no-store",
  });

  const ourHistory = await client.fetch(ourHistoryQuery, {}, {
    perspective: "published",
    cache: "no-store",
  });

  const sections = await client.fetch(sectionQuery, {}, {
    perspective: "published",
    cache: "no-store",
  });

  const principles = await client.fetch<Principle[]>(principlesQuery, {}, {
    perspective: "published",
    cache: "no-store",
  });


  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Om oss / Zhizhovski Bygg</p>
          <h1 id="about-title">
            {pageBeginning.title1}
            <span>{pageBeginning.title2}</span>
          </h1>
          <p className={styles.intro}>
            {pageBeginning.description}
          </p>
          <div className={styles.actions}>
            <Button
              href="#var-historie"
              buttonStyle="primary"
              className={styles.greenButton}
            >
              Bli kjent med oss <ArrowDown size={18} aria-hidden="true" />
            </Button>
            <Button
              href="/projects"
              buttonStyle="secondary"
              className={styles.outlineButton}
            >
              Se arbeidet vårt <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={pageBeginning.image?.asset?.url ?? "/about/hand-planing.jpg"}
            alt="Bilde - Sidebegynnelse"
            fill
            sizes="(max-width: 800px) 100vw, 47vw"
            preload
            className={styles.photo}
          />
          <div className={styles.photoCaption}>
            <span>Håndverk / Oslo</span>
          </div>
        </div>
      </section>
      <div className={styles.availability}>
        <p className={styles.status}>Tilgjengelig for nye oppdrag</p>
        <div className={styles.location}>
          <span>Lokalt håndverk</span>
          <strong>Oslo og omegn</strong>
        </div>
      </div>
      <section
        id="var-historie"
        className={`${styles.editorial} ${styles.story}`}
        aria-labelledby="story-title"
      >
        <p className={styles.sectionLabel}>Vår historie</p>
        <div>
          <p className={styles.eyebrow}>Bygget på tillit</p>
          <h2 id="story-title">
            {ourHistory.title}
          </h2>
          <div className={styles.storyColumns}>
            <p>
              {ourHistory.description1}
            </p>
            <p>
                {ourHistory.description2}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.approach} aria-labelledby="approach-title">
        <div className={styles.workshopPhoto}>
          <Image
            src={sections.image?.asset?.url ?? "/about/workshop.jpg"}
            alt="Snekker som måler og tilpasser treverk i verkstedet"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            className={styles.photo}
          />
        </div>
        <div className={styles.approachContent}>
          <p className={styles.eyebrow}>Måten vi jobber på</p>
          <h2 id="approach-title">{sections.title}</h2>
          <p className={styles.intro}>
            {sections.description}
          </p>
          <ul className={styles.services} aria-label="Våre fagområder">
            <li>Snekkerarbeid</li>
            <li>Montering</li>
            <li>Malerarbeid</li>
          </ul>
          <Link href="/services" className={styles.textLink}>
            Utforsk tjenestene våre{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.editorial}>
          <p className={styles.sectionLabel}>Prinsippene våre</p>
          <h2 id="principles-title">
            Slik skaper vi<span>varige resultater.</span>
          </h2>
        </div>
        <div className={styles.principleGrid}>
          {principles.map(({ _key, title, text }) => (
            <article key={_key} className={styles.principle}>
              <Plus size={18} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.promise} aria-labelledby="promise-title">
        <h2 id="promise-title" className={styles.eyebrow}>
          Løftet vårt
        </h2>
        <figure>
          <blockquote>
            “Vi forlater ikke et rom før vi selv ville vært fornøyde med å bo
            der.”
          </blockquote>
          <figcaption>— Zhizhovski Bygg</figcaption>
        </figure>
      </section>
      <section className={styles.contact} aria-labelledby="contact-title">
        <div>
          <p className={styles.eyebrow}>Har du et prosjekt i tankene?</p>
          <h2 id="contact-title">La oss se på løsningen sammen.</h2>
        </div>
        <Button
          href="/contact"
          buttonStyle="secondary"
          className={styles.contactButton}
        >
          Få gratis befaring <ArrowUpRight size={18} aria-hidden="true" />
        </Button>
      </section>
    </main>
  );
}
