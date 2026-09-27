import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { SERVICE_CATEGORIES } from "../data/services";

const baseUrl = "https://zhizhovski-bygg.vercel.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Zhizhovski Bygg",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/white-logo.png`,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Zhizhovski Bygg",
    template: "%s | Zhizhovski Bygg",
  },
  description:
    "Zhizhovski Bygg tilbyr snekkerarbeid, montering, håndverkertjenester og malerarbeid med fokus på kvalitet, lokalisert i Oslo-områder.",
  keywords: [
    "construction",
    "bygg",
    "Oslo",
    "renovation",
    "snekker",
    "montering",
    "håndverkertjenester",
    "maling",
    "Zhizhovski Bygg",
    "Oslo håndverk",
    "Oslo snekker",
    "Oslo montering",
    "Oslo maler",
    "Oslo byggtjenester",
    "Oslo renovering",
    "Oslo områder",
    "Bygg Oslo",
    ...SERVICE_CATEGORIES.flatMap((category) => [
      category.title,
      ...category.services.map((service) => service.title),
    ]),

  ],
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Zhizhovski Bygg",
    title: "Zhizhovski Bygg",
    description: "Profesjonelt håndverk innen snekring, montering og maling.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Zhizhovski Bygg",
      },
    ],
  },
  verification: {
    google: "1ZNr5tlIQ9sLHmUvQGLKoQR7ke7AsxjdtjS7mtSTook",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="nb">
        <body>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
      <Analytics />
    </>
  );
}
