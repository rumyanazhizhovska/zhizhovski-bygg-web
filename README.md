# Zhizhovski Bygg

Norsk nettside for Zhizhovski Bygg med tjenesteoversikt, prosjektarkiv og
kontaktskjema. Produksjonsdomenet i kildekoden er `https://zhizhovskibygg.no`.

Bygget med Next.js 16 (App Router), React 19, TypeScript og CSS Modules.
Innhold hentes fra Sanity, kontaktskjemaet bruker Formspree, og Vercel Analytics
er inkludert i rotlayouten.

## Lokal utvikling

Forutsetninger: Node.js 20.9 eller nyere og npm. Bruk `package-lock.json` for
å installere de låste avhengighetene:

```bash
npm ci
npm run dev
```

Åpne `http://localhost:3000`.

Appen leser ingen miljøvariabler fra prosjektkoden per i dag, så det trengs ingen
`.env.local` for dagens oppsett. Sanity og Formspree er konfigurert direkte i
kildekoden. Nettverkstilgang til Sanity er nødvendig for sider med CMS-innhold;
hjemmesiden henter også innhold under produksjonsbygging.

## Kommandoer og kontroll

| Kommando | Bruk |
| --- | --- |
| `npm run dev` | Start utviklingsserveren. |
| `npm run typecheck` | Kontroller TypeScript uten å generere filer. |
| `npm run build` | Lag et produksjonsbygg i `.next/`. |
| `npm start` | Start produksjonsserveren etter bygging. |
| `npm run check` | Kjør typekontroll og produksjonsbygging i rekkefølge. |

Kjør `npm run check` før endringer leveres. Det finnes foreløpig ingen egne
npm-skript for tester eller linting. Kontroller også berørte sider i nettleseren,
inkludert mobilvisning, navigasjon, prosjektbilder og eventuell skjemavalidering.
Innsending fra kontaktskjemaet går til det konfigurerte Formspree-skjemaet.

## Sider og struktur

| URL | Innhold |
| --- | --- |
| `/` | Hjemmeside |
| `/services` | Tjenesteoversikt |
| `/projects` | Prosjektarkiv sortert etter tjenester |
| `/about-us` | Om bedriften |
| `/contact` | Kontaktinformasjon og forespørselsskjema |

```text
src/
  app/
    (pages)/                 Hjemmeside og øvrige sider med tilhørende CSS
    layout.tsx               Felles layout, metadata, Sanity Live og analyse
    sitemap.ts               Genererer /sitemap.xml
    robots.ts                Genererer /robots.txt
  components/
    Projects/                Prosjektkort, galleri og før/etter-visning
    Services/                Klikkbar tjenesteoversikt
    ContactForm/             Formspree-skjema med bildeforhåndsvisning
    SectionNavigation/       Sticky navigasjon mellom hovedområder
  constants/pages.tsx        Sideliste brukt av sitemap
  data/
    services.ts              Felles tjenestekategorier og stabile tjeneste-ID-er
    projects.ts              Serverbaserte Sanity-spørringer for prosjekter
    projectMediaCollection.ts Serverbaserte Sanity-spørringer for prosjektbilder
  sanity/
    client.ts                Sanity-klient og datasett
    live.ts                  Sanity Live-oppsett
  types/portfolio.ts         Delte typer for tjenester, prosjekter og bilder
public/                      Logoer, lokale bilder og verifikasjonsfil
```

## Innhold i Sanity

Klienten i `src/sanity/client.ts` bruker prosjekt `vsyok4su`, datasett
`production`, API-versjon `2025-07-09` og `useCdn: false`. Sanity Studio og
skjemadefinisjonene ligger ikke i dette repoet. Bruk det tilhørende Studioet og
tilgang til Sanity-prosjektet for å redigere og publisere innhold.

### Prosjekter og bilder

Prosjekter opprettes som dokumenttypen `project` i Sanity, ikke som lokale
oppføringer i `src/data/projects.ts`. Spørringene forventer disse feltene:

| Felt | Innhold |
| --- | --- |
| `title`, `summary` | Prosjektets tittel og beskrivelse. |
| `serviceIds` | Tjeneste-ID-er fra `src/data/services.ts`; ett prosjekt kan tilhøre flere tjenester. |
| `ongoingCategoryId` | Valgfri kategori-ID for fremheving under et fagområde. |
| `location` | Valgfritt sted. |
| `period` | Valgfri dato; bruk første dag i måneden i UTC for måned/år. |
| `media` | Ordnet liste med referanser til `projectMediaCollection`-dokumenter. |

En `projectMediaCollection` har `type: "single"` med bildelisten `media`, eller
`type: "before-after"` med bildelistene `before` og `after`. Bildene lastes opp
til Sanity og bruker `asset` og `alt`. Ugyldige referanser og bilder uten
asset-URL filtreres ut; rekkefølgen på mediesamlingene bevares.

Prosjekter og prosjektbilder hentes som publisert innhold med `cache: "no-store"`.
Publiser endringene i Sanity for at de skal vises ved neste forespørsel.

Tjenester vedlikeholdes i `src/data/services.ts`. Behold eksisterende ID-er når
du endrer tekst: de brukes både av Sanity-prosjektene og av lenker som
`/projects#kjokken`.

### Hjemmeside og Om oss

Hjemmesidens bilde hentes fra `homeHomePagePictureType`. Om oss henter innhold
fra `aboutUsPageBeginingType`, `aboutUsOurHistoryType`, `aboutUsSectionType` og
`aboutUsPrinciplesType`. Navnene må samsvare med dokumenttypene i Sanity.
Lokale reservebilder ligger i `public/about/`; bildekilder er dokumentert i
`public/about/SOURCES.md`.

## Integrasjoner og produksjon

- **Sanity-bilder:** `next.config.mjs` tillater bilder fra
  `cdn.sanity.io/images/vsyok4su/production/**`. Oppdater både klienten og
  bildekonfigurasjonen hvis Sanity-prosjekt eller datasett byttes.
- **Formspree:** skjema-ID-en er satt i
  `src/components/ContactForm/ContactForm.tsx`. Endre den ved bytte av mottakerskjema.
- **Analyse:** `@vercel/analytics` er koblet inn i `src/app/layout.tsx`.
- **Domene og SEO:** ved domenebytte må `src/app/layout.tsx`,
  `src/app/sitemap.ts` og `src/app/robots.ts` oppdateres. Ved nye sider må også
  `src/constants/pages.tsx` og sidens metadata vurderes.

Bygg og kjør i et Node.js-miljø med tilgang til Sanity:

```bash
npm ci
npm run check
npm start
```

Prosjektet bruker serverbasert innholdshenting og standard Next.js-server;
det er ikke konfigurert for statisk eksport. Repoet inneholder ingen egen
utrullingspipeline eller konfigurasjon for en bestemt hostingplattform.
