"use client";
import { motion } from "motion/react";
import Image from "next/image";
import musifyLogo from "@/assets/logo.webp";
import Hr from "./hr";
import { useState } from "react";
import { RiLoader2Fill, RiMessage2Fill } from "react-icons/ri";
import { ChatbotResponse } from "@/types/chatbot";
import { getChatbotResponse } from "@/services/get-chatbot-response";
import { getChatbotGreeting, getSuggestionPlaceholder } from "@/lib/utils";
import TrackCard from "./track-card";
import AlbumCard from "./album-card";

interface Props {
  onClose: () => void;
}

export default function Chatbot({ onClose }: Props) {
  const [placeholderText] = useState(() => getSuggestionPlaceholder());
  const [chatbotGreeting] = useState(() =>
    getChatbotGreeting("Giancarlo Dennis"),
  );

  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatbotResponse, setChatbotResponse] =
    useState<ChatbotResponse | null>(null);

  const handleUserMessage = (msg: string) => setUserMessage(msg);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    try {
      const response = await getChatbotResponse(
        userMessage,
        "Giancarlo Dennis",
      );
      setChatbotResponse(response);
      setUserMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      onClick={onClose}
      transition={{ duration: 0.2, type: "keyframes" }}
      initial={{ backgroundColor: "#0000", backdropFilter: "blur(0px)" }}
      animate={{ backgroundColor: "#0008", backdropFilter: "blur(8px)" }}
      exit={{ backgroundColor: "#0000", backdropFilter: "blur(0px)" }}
      className="absolute z-20 inset-0 size-full flex justify-center items-center shadow-2xl shadow-black"
    >
      <motion.div
        transition={{ duration: 0.2, type: "keyframes" }}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        // 1. FLEX COLUMN + OVERFLOW HIDDEN: Estructura base para que los hijos no se salgan
        className="flex flex-col h-full max-h-[80vh] w-full max-w-260 border border-white/6 rounded-lg bg-background-dark overflow-hidden"
      >
        {/* HEADER (FIJO) */}
        <div className="flex items-center w-full gap-2 px-3 py-2 border-b border-white/6 shrink-0">
          <Image
            src={musifyLogo}
            alt="musify logo"
            width={50}
            height={50}
            className="size-10 rounded-full border border-white/20"
          />
          <div className="-space-y-1">
            <p className="font-primary font-semibold text-2xl">Musify AI</p>
            <p className="font-semibold text-xs text-text-muted">
              Tu asistente musical
            </p>
          </div>
        </div>

        {/* CONTENIDO CENTRAL (SCROLL) */}
        {/* 2. FLEX-1 + OVERFLOW Y AUTO: Ocupa el espacio restante y hace scroll */}
        <div className="flex-1 overflow-y-auto styled-scrollbar w-full">
          {!chatbotResponse && !isLoading && (
            <div className="h-full flex justify-center items-center p-4">
              <h2 className="text-4xl text-balance font-primary max-w-1/2 text-center">
                {chatbotGreeting}
              </h2>
            </div>
          )}

          {!chatbotResponse && isLoading && (
            <div className="h-full flex justify-center items-center">
              <RiLoader2Fill
                className="animate-spin text-neutral-300"
                size={40}
              />
            </div>
          )}

          {chatbotResponse && !isLoading && (
            <div className="flex flex-col w-full p-4">
              <p className="text-sm text-pretty text-neutral-400 font-semibold">
                {chatbotResponse.message}
              </p>

              <div className="grid grid-cols-4 gap-2 mt-6">
                {chatbotResponse.recomendations.map((item) => {
                  if (item.type === "album") {
                    return (
                      <AlbumCard
                        key={item.id}
                        artistId={item.artist.id}
                        artistName={item.artist.name}
                        coverUrl={item.cover_big}
                        hasExplicitLyrics={item.explicit_lyrics}
                        id={item.id}
                        recordType={item.record_type}
                        title={item.title}
                      />
                    );
                  }

                  if (item.type === "track") {
                    return (
                      <TrackCard
                        key={item.id}
                        artistId={item.artist.id}
                        artistName={item.artist.name}
                        coverUrl={item.album.cover_small}
                        duration={item.duration}
                        explicit={item.explicit_lyrics}
                        id={item.id}
                        previewUrl={item.preview}
                        title={item.title}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* INPUT (FIJO) */}
        {/* 3. SHRINK-0: Evita que el input se aplaste si hay mucho contenido */}
        <div className="flex items-center w-full relative bg-background-light p-2 rounded-md overflow-hidden shrink-0 m-3 mt-0">
          <input
            value={userMessage}
            onChange={(e) => handleUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder={placeholderText}
            disabled={isLoading}
            className="w-full flex-1 h-auto resize-none border-0 outline-0 text-sm px-3 py-2 bg-transparent text-text"
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userMessage.trim()}
            className="flex justify-center items-center bg-primary rounded-md size-10 shrink-0 ml-2 disabled:opacity-50"
          >
            {isLoading ? (
              <RiLoader2Fill className="animate-spin" size={25} />
            ) : (
              <RiMessage2Fill size={25} />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
