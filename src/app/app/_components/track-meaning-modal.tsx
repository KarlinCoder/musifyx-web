"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getTrackMeaning,
  TrackMeaningResponse,
} from "../services/get-track-meaning";

interface Props {
  onClose: () => void;
  songId: number;
  trackName: string;
}

export default function TrackMeaningsModal({
  onClose,
  songId,
  trackName,
}: Props) {
  const [songMeaning, setSongMeaning] = useState<TrackMeaningResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTrackMeaning(songId);
        setSongMeaning(data);
      } catch (error) {
        console.error("Error fetching song meaning:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [songId]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] h-fit flex flex-col bg-background-dark backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <header className="shrink-0 border-b border-white/10 py-6 px-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase opacity-90 text-text-muted">
                  Análisis musical
                </p>
                <h2 className="text-2xl font-bold text-white">{trackName}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>

          <section className="flex-1 overflow-y-auto px-10 p-8 styled-scrollbar bg-background">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
                <span className="ml-3 text-white/70">Cargando ánalisis...</span>
              </div>
            ) : !songMeaning?.content ? (
              <div className="flex items-center justify-center h-40 text-white/50">
                <p>Análisis no disponible.</p>
              </div>
            ) : (
              <div className="text-text/80 text-base">
                <div className="space-y-5">
                  {songMeaning.content.split("\n").map((text) => {
                    return <p key={text}>{text}</p>;
                  })}
                </div>

                <p className="opacity-40 italics text-xl mt-6 font-primary">
                  Generado por <span className="font-semibold">Musify AI</span>
                </p>
              </div>
            )}
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
