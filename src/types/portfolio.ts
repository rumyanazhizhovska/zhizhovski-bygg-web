export type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  services: readonly ServiceItem[];
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectMediaCollection =
  {
    id: string;
    type: "single";
    media: readonly ProjectImage[];
  } | {
    id: string;
    type: "before-after";
    before: readonly ProjectImage[];
    after: readonly ProjectImage[];
  };

export type ProjectMediaCollectionId = ProjectMediaCollection["id"];

export type Project = {
  id: string;
  title: string;
  summary: string;
  /**
   * Valgfritt område for prosjekter som skal fremheves før tjenestelistene.
   * Dette begrenser ikke hvilke tjenester prosjektet kan knyttes til.
   */
  ongoingCategoryId?: ServiceCategory["id"];
  /**
   * Ett prosjekt kan knyttes til så mange tjenestepunkter som nødvendig,
   * også når punktene ligger i forskjellige hovedområder.
   */
  serviceIds: readonly ServiceItem["id"][];
  location?: string;
  period?: string;
  media?: readonly ProjectMediaCollectionId[];
};
