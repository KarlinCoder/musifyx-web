import { Metadata } from "next";
import PlaylistsPageContent from "./components/playlist-page-content";

export const metadata: Metadata = {
  title: "Playlists | Musify - Explora y Descarga Listas de Reproducción",
  description:
    "Descubre playlists curadas por expertos y usuarios en Musify. Explora listas por género, estado de ánimo, actividad y descarga tus favoritas completas en alta calidad con metadatos perfectos.",
  keywords: [
    "descargar playlists",
    "listas de reproducción",
    "playlists curadas",
    "música por género",
    "música por estado de ánimo",
    "Musify",
    "descargar listas música",
    "playlists alta calidad",
    "colección de playlists",
    "música offline playlists",
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
    canonical: "/playlists",
  },
  openGraph: {
    title: "Playlists | Musify",
    description:
      "Explora millones de playlists y descárgalas completas en alta calidad. Curadas por expertos, organizadas por género y estado de ánimo.",
    url: "/playlists",
    siteName: "Musify",
    images: [
      {
        url: "/og-playlists.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Explorador de Playlists",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playlists | Musify",
    description:
      "Busca y descarga playlists completas en alta calidad con metadatos perfectos y portadas originales.",
    images: ["/og-playlists.jpg"],
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

export default function PlaylistsPage() {
  return <PlaylistsPageContent />;
}
