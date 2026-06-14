import { Metadata } from "next";
import FavoritesPageContent from "./components/favorites-page-content";

export const metadata: Metadata = {
  title: "Mis Favoritos | Musify - Tus Artistas y Álbumes Guardados",
  description:
    "Accede rápidamente a tus artistas y álbumes favoritos en Musify. Reproductor personalizado, discografías completas y descargas en alta calidad con metadatos perfectos.",
  keywords: [
    "mis favoritos",
    "artistas guardados",
    "álbumes favoritos",
    "música guardada",
    "lista de favoritos Musify",
    "descargar música favorita",
    "colección personal",
    "biblioteca musical",
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
    canonical: "/favoritos",
  },
  openGraph: {
    title: "Mis Favoritos | Musify",
    description:
      "Tu colección personal de artistas, canciones, álbumes y playlists favoritos. Accede rápido, reproduce y descarga en alta calidad.",
    url: "/favoritos",
    siteName: "Musify",
    images: [
      {
        url: "/og-favoritos.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Tus Favoritos",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mis Favoritos | Musify",
    description:
      "Tu colección personal de música favorita. Accede rápido a tus artistas, canciones, playlists y álbumes guardados.",
    images: ["/og-favoritos.jpg"],
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

export default function FavoritesPage() {
  return <FavoritesPageContent />;
}
