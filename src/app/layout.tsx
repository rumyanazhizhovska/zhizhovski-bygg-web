import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SERVICE_CATEGORIES } from "@/data/services";
import { SanityLive } from "@/sanity/live";
import React from "react";

const baseUrl = "https://zhizhovskibygg.no";
const siteName = "Zhizhovski bygg";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: siteName,
  url: baseUrl,
  publisher: { "@id": `${baseUrl}/#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: siteName,
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/white-logo.png`,
    width: 535,
    height: 379,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: siteName,
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    apple: "/white-logo.png",
  },
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
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
    siteName,
    title: siteName,
    description: "Profesjonelt håndverk innen snekring, montering og maling.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/white-logo.png`,
        width: 535,
        height: 379,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteName,
    images: [`${baseUrl}/white-logo.png`],
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
              __html: JSON.stringify([organizationSchema, websiteSchema]),
            }}
          />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
      <SanityLive />
      <Analytics />
    </>
  );
}
