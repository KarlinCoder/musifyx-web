import { Metadata } from "next";
import SongsPageContent from "./components/songs-page-content";

export const metadata: Metadata = {
  title: "Canciones | Musify - Explora y Descarga Música en Alta Calidad",
  description:
    "Busca y descarga tus canciones favoritas en alta calidad con Musify. Metadatos perfectos, portadas en HD y letras integradas. Tu biblioteca musical definitiva comienza aquí.",
  keywords: [
    "descargar música",
    "canciones alta calidad",
    "música MP3",
    "biblioteca musical",
    "Musify",
    "descargar canciones",
    "música con letras",
    "metadatos musicales",
    "colección de música",
    "música offline",
  ],
  authors: [{ name: "KarlinCoder", url: "https://musify.karlincoder.com  " }],
  creator: "KarlinCoder",
  publisher: "Musify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://musify.karlincoder.com  "),
  alternates: {
    canonical: "/canciones",
  },
  openGraph: {
    title: "Canciones | Musify",
    description:
      "Explora millones de canciones y descárgalas en alta calidad. Metadatos perfectos, portadas originales y letras integradas.",
    url: "/canciones",
    siteName: "Musify",
    images: [
      {
        url: "/og-canciones.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Explorador de Canciones",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canciones | Musify",
    description:
      "Busca y descarga tus canciones favoritas en alta calidad con metadatos perfectos.",
    images: ["/og-canciones.jpg"],
    creator: "@KarlinCoder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Música",
};

export default function AlbumsPage() {
  return <SongsPageContent />;
}
