"use client";

import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";
import { ProgressProvider } from "@bprogress/next/app";
import localFont from "next/font/local";
import { AnimatePresence } from "motion/react";
import { useAudioStore } from "@/stores/useAudioPreviewStore";
import PreviewPlayer from "./_components/preview-player";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trackData, reset } = useAudioStore();

  return (
    <html lang="es" className={`${deezerFont.variable} ${interFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MusifyX</title>
      </head>
      <body className="relative flex font-secondary bg-background-dark h-dvh text-text overflow-hidden">
        <Sidebar />

        <main className="relative flex flex-col size-full styled-scrollbar overflow-x-hidden overflow-y-auto">
          <AnimatePresence>
            {trackData && (
              <PreviewPlayer
                artist={trackData.artist}
                coverUrl={trackData.cover}
                songTitle={trackData.title}
                onQuit={reset}
              />
            )}
          </AnimatePresence>

          <ProgressProvider
            height="2px"
            color="#48e"
            options={{ showSpinner: false }}
            shallowRouting
          >
            {children}
          </ProgressProvider>
        </main>
      </body>
    </html>
  );
}
