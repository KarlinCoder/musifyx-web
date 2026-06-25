import "@/styles/globals.css";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/ui/themes";

const deezerFont = localFont({
  src: [
    {
      path: "../../public/fonts/deezer-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/deezer-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/deezer-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/deezer-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-deezer",
});

const interFont = localFont({
  src: [
    {
      path: "../../public/fonts/inter-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const spotifyTitle = localFont({
  src: [
    {
      path: "../../public/fonts/SpotifyMixUITitleVariable-8769ccfde3379b7ebcadd9529b49d0cc.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-spotify-title-var",
});

const spotifyText = localFont({
  src: [
    {
      path: "../../public/fonts/SpotifyMixUI-Regular-cc3b1de388efa4cbca6c75cebc24585e.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpotifyMixUI-Bold-4264b799009b1db5c491778b1bc8e5b7.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-spotify-text-var",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        theme: dark,
        options: {
          logoImageUrl: "/favicon.ico",
        },
      }}
    >
      <html
        lang="es"
        className={`${deezerFont.variable} ${interFont.variable} ${spotifyTitle.variable} ${spotifyText.variable}`}
      >
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Musify | Tu biblioteca musical personal</title>
        </head>
        <body className="font-secondary bg-background-dark">{children}</body>
      </html>
    </ClerkProvider>
  );
}
