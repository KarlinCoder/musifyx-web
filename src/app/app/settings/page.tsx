import { Metadata } from "next";
import SettingsPageContent from "./_components/settings-page-content";

export const metadata: Metadata = {
  title: "Ajustes | Musify - Personaliza Tu Experiencia Musical",
  description:
    "Configura tus preferencias en Musify. Ajusta el volumen, las animaciones, el tema visual y más para una experiencia musical a tu medida.",
  keywords: [
    "ajustes musify",
    "configuración musical",
    "preferencias usuario",
    "ajustes cuenta",
    "Musify",
    "personalizar música",
    "configuración aplicación",
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
    canonical: "/ajustes",
  },
  openGraph: {
    title: "Ajustes | Musify",
    description:
      "Personaliza tu experiencia musical en Musify. Configura volumen, animaciones, tema y más.",
    url: "/ajustes",
    siteName: "Musify",
    images: [
      {
        url: "/og-ajustes.jpg",
        width: 1200,
        height: 630,
        alt: "Musify - Ajustes y Preferencias",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajustes | Musify",
    description:
      "Personaliza tu experiencia musical en Musify. Configura volumen, animaciones, tema y más.",
    images: ["/og-ajustes.jpg"],
    creator: "@KarlinCoder",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Configuración",
};

export default function SettingsPage() {
  return <SettingsPageContent />;
}
