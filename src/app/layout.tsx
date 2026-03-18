"use client";

import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";
import { ProgressProvider } from "@bprogress/next/app";
import localFont from "next/font/local";
import { AnimatePresence } from "motion/react";
import ChatbotButton from "@/components/chatbot-button";
import Chatbot from "@/components/chatbot";
import { useState } from "react";

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
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleShowChatbot = () => setShowChatbot(!showChatbot);

  return (
    <html lang="es" className={`${deezerFont.variable} ${interFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Musify | Tu biblioteca musical personal</title>
      </head>
      <body className="relative flex font-secondary bg-background-dark h-dvh text-text overflow-hidden">
        <Sidebar />
        <AnimatePresence>
          {showChatbot && <Chatbot onClose={toggleShowChatbot} />}
        </AnimatePresence>

        <main className="relative flex flex-col size-full mb=10 styled-scrollbar overflow-x-hidden overflow-y-auto">
          <ChatbotButton onClick={toggleShowChatbot} />

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
