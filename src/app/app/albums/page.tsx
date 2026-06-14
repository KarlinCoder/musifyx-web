import { Metadata } from "next";
import AlbumsPageContent from "./components/albums-page-content";

export const metadata: Metadata = {
  title: "Álbumes | Musify - Explora y Descarga Discografías Completas",
  description:
    "Explora y descarga álbumes completos en alta calidad con Musify. Discografías organizadas, portadas en HD, metadatos perfectos y letras integradas. Colecciona música como se debe.",
  keywords: [
    "descargar álbumes",
    "discografías completas",
    "álbumes alta calidad",
    "música MP3 álbum",
    "colección de álbumes",
    "Musify",
    "descargar discografía",
    "álbumes con portada",
    "metadatos de álbum",
    "música offline álbumes",
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
    canonical: "/albumes",
  },
  openGraph: {
    title: "Álbumes | Musify",
    description:
      "Explora millones de álbumes y descárgalos completos en alta calidad. Portadas originales, tracklists organizados y metadatos perfectos.",
    url: "/albumes",
    siteName: "Musify",
    images: [
      {
        url: "/og-albumes.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Explorador de Álbumes",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Álbumes | Musify",
    description:
      "Busca y descarga álbumes completos en alta calidad con metadatos perfectos y portadas originales.",
    images: ["/og-albumes.jpg"],
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
  return <AlbumsPageContent />;
}
