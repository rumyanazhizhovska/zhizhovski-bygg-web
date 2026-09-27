import type { ServiceCategory, ServiceItem } from "@/types/portfolio";

export const SERVICE_CATEGORIES = [
  {
    id: "snekkerarbeid",
    title: "Snekkerarbeid",
    description:
      "Presist snekkerarbeid for oppussing, tilpasning og komplette rom - fra konstruksjon til ferdige detaljer.",
    services: [
      {
        id: "vegger-og-romlosninger",
        title: "Vegger og romløsninger",
        description:
          "Nye lettvegger, åpninger og planløsninger tilpasset boligen.",
      },
      {
        id: "gipsing-og-taksenking",
        title: "Gipsing og taksenking",
        description:
          "Rette flater, skjulte føringer og gjennomførte overganger.",
      },
      {
        id: "dorer-og-vinduer",
        title: "Dører og vinduer",
        description:
          "Nøyaktig montering, utskifting og innvendig ferdigstilling.",
      },
      {
        id: "gulv",
        title: "Gulv",
        description:
          "Legging av laminat og parkett med presise skjøter og avslutninger.",
      },
      {
        id: "listverk",
        title: "Listverk",
        description:
          "Fotlister, karmer og detaljer som gir rommet en helhetlig finish.",
      },
      {
        id: "kjokken",
        title: "Kjøkken",
        description: "Montering og tilpasning av kjøkkenløsninger til rommet.",
      },
      {
        id: "garderober-og-skyvedorer",
        title: "Garderober og skyvedører",
        description:
          "Plassbygde og modulbaserte løsninger som utnytter plassen godt.",
      },
      {
        id: "baderomsinnredning",
        title: "Baderomsinnredning",
        description:
          "Sikker montering og tilpasning av innredning på bad og vaskerom.",
      },
    ],
  },
  {
    id: "montering-og-handverkertjenester",
    title: "Montering og håndverkertjenester",
    description:
      "Fleksibel hjelp til montering, utskifting og de detaljene som får hjemmet til å fungere bedre.",
    services: [
      {
        id: "mobler",
        title: "Møbler",
        description:
          "Effektiv montering, tilpasning og trygg plassering av møbler.",
      },
      {
        id: "benkeplater",
        title: "Benkeplater",
        description:
          "Oppmåling, kapping og montering med nøyaktige tilpasninger.",
      },
      {
        id: "hvitevarer",
        title: "Hvitevarer",
        description:
          "Innpassing og montering av integrerte og frittstående hvitevarer.",
      },
      {
        id: "vask-og-blandebatteri",
        title: "Vask og blandebatteri",
        description:
          "Tilpasning og montering koordinert med nødvendige fagområder.",
      },
      {
        id: "ventilasjonsfiltre",
        title: "Ventilasjonsfiltre",
        description:
          "Utskifting og praktisk oppfølging for et velfungerende anlegg.",
      },
      {
        id: "spotter-og-led-belysning",
        title: "Spotter og LED-belysning",
        description:
          "Planlagt plassering og montering, med elektriker når det kreves.",
      },
      {
        id: "diverse-monteringsarbeid",
        title: "Diverse monteringsarbeid",
        description:
          "Praktiske små og store monteringsoppgaver, løst ryddig og effektivt.",
      },
    ],
  },
  {
    id: "malerarbeid",
    title: "Malerarbeid",
    description:
      "Grundig forarbeid og jevne overflater for et varig, profesjonelt sluttresultat.",
    services: [
      {
        id: "sparkling",
        title: "Sparkling",
        description:
          "Skjøter, skruehull og reparasjoner klargjort for videre behandling.",
      },
      {
        id: "helsparkling",
        title: "Helsparkling",
        description:
          "Slette vegger og tak som gir et rolig og moderne uttrykk.",
      },
      {
        id: "maling",
        title: "Maling",
        description:
          "Innvendig og utvendig maling med jevn dekning og rene kanter.",
      },
      {
        id: "tapetsering",
        title: "Tapetsering",
        description:
          "Nøyaktig oppsetting, mønstertilpasning og fine avslutninger.",
      },
    ],
  },
] as const satisfies readonly ServiceCategory[];

export const SERVICE_COUNT = SERVICE_CATEGORIES.reduce(
  (total, category) => total + category.services.length,
  0,
);

export async function getServices(): Promise<ServiceCategory[]> {
  // Kan senere erstatte det med et API- eller databasekall uten å endre UI-et.
  return [...SERVICE_CATEGORIES];
}

export function getServicesByIds(
  serviceIds: readonly string[],
): readonly ServiceItem[] {
  const requestedIds = new Set(serviceIds);
  const allServices: ServiceItem[] = [];

  SERVICE_CATEGORIES.forEach((category) => {
    allServices.push(...category.services);
  });

  return allServices.filter((service) => requestedIds.has(service.id));
}
