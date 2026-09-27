# Zhizhovski Bygg

Nettside for Zhizhovski Bygg, bygget med Next.js 14, React og TypeScript.

## Lokal utvikling

```bash
npm install
npm run dev
```

Åpne deretter `http://localhost:3000`.

Før en endring leveres:

```bash
npm run typecheck
npm run build
```

Eller kjør begge kontrollene med:

```bash
npm run check
```

## Struktur

```text
src/
  app/(pages)/
    home/                 Hjemmesiden
    services/             Tjenesteoversikten
    projects/             Hele prosjektarkivet
  components/
    Projects/             Prosjektkort, katalog og før/etter-media
    Services/             Klikkbar tjenesteoversikt
    SectionNavigation/    Sticky navigasjon mellom hovedområder
  data/
    services.ts           Felles tjenestetaksonomi
    projects.ts           Sentral prosjektbase
  types/
    portfolio.ts          Delte typer for tjenester, prosjekter og bilder
```

Tjenester og prosjekter deler de samme stabile ID-ene. En lenke som
`/projects#kjokken` går derfor alltid til riktig punkt i prosjektarkivet.

## Legge til et prosjekt

Legg prosjektet i `src/data/projects.ts`. Ett prosjekt kan vises under flere
tjenester ved å legge flere ID-er i `serviceIds`.

Bilder legges i `public/images/projects`.

Bytt `media` til `before-after` for før og etter bilder.
