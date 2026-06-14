import { Metadata } from "next";
import ArtistsPageContent from "./components/artist-page-content";

export const metadata: Metadata = {
  title: "Artistas | Musify - Explora y Descarga Discografías Completas",
  description:
    "Descubre y explora tus artistas favoritos en Musify. Accede a discografías completas, biografías, radios personalizadas y descarga sus álbumes en alta calidad con metadatos perfectos.",
  keywords: [
    "descargar artistas",
    "explorar músicos",
    "discografías completas",
    "biografías de artistas",
    "radio de artista",
    "Musify",
    "descargar música de artistas",
    "artistas populares",
    "descubrir nueva música",
    "colección de artistas",
  ],
  authors: [{ name: "KarlinCoder", url: "https://musify.karlincoder.com" }],
  creator: "KarlinCoder",
  publisher: "Musify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://musify.karlincoder.com"),
  alternates: {
    canonical: "/artistas",
  },
  openGraph: {
    title: "Artistas | Musify",
    description:
      "Explora millones de artistas y descarga sus discografías completas en alta calidad. Biografías, radios personalizadas y metadatos perfectos.",
    url: "/artistas",
    siteName: "Musify",
    images: [
      {
        url: "/og-artistas.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Explorador de Artistas",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistas | Musify",
    description:
      "Busca y explora tus artistas favoritos. Descarga discografías completas en alta calidad con Musify.",
    images: ["/og-artistas.jpg"],
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

export default function ArtistsPage() {
  return <ArtistsPageContent />;
}
