"use client";

import { getRandomDownloadMessage } from "@/lib/utils";
import { downloadAlbum } from "@/services/download";
import { useEffect, useRef, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";
// 1. Importar motion y AnimatePresence
import { AnimatePresence, motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  id: number;
}

export default function DownloadButton({ children, id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadMessage, setDownloadMessage] = useState("");

  const controllerRef = useRef<AbortController | null>(null);

  const handleClick = async () => {
    const newController = new AbortController();
    controllerRef.current = newController;

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await downloadAlbum(id, controllerRef.current.signal);

      if (data.download_url) {
        window.open(data.download_url, "_blank");
      } else {
        throw new Error("URL de descarga no disponible");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  useEffect(() => {
    const downloadMessagesInterval = setInterval(() => {
      const message = getRandomDownloadMessage();
      setDownloadMessage(message);
    }, 2000);

    return () => clearInterval(downloadMessagesInterval);
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative min-w-50 flex items-center justify-center gap-2 mt-3 text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 transition-all duration-100 text-white rounded-full cursor-pointer py-2 font-semibold"
    >
      {isLoading ? (
        <>
          <RiLoader2Fill size={20} className="animate-spin" />
        </>
      ) : (
        <p>{children}</p>
      )}

      {error && <p>{error}</p>}

      <div className="absolute -bottom-5 left-0 w-fit h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {downloadMessage && isLoading && (
            <motion.p
              key={downloadMessage}
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xs text-text-muted font-normal text-left whitespace-nowrap"
            >
              {downloadMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
