"use client";

import { useEffect, useState } from "react";
import {
  getTrackLyrics,
  TrackLyricsResponse,
} from "../services/get-track-lyrics";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onClose: () => void;
  deezerSongId: number;
  trackName: string;
}

interface LyricsLine {
  line: string;
  translation?: string;
}

export default function TrackLyricsModal({
  onClose,
  deezerSongId,
  trackName,
}: Props) {
  const [songLyrics, setSongLyrics] = useState<TrackLyricsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sectionView, setSectionView] = useState<
    "original" | "original+translation" | "only-translation"
  >("original+translation");

  const lyricsOptions = [
    { label: "Original", value: "original" as const },
    { label: "Original + Traducción", value: "original+translation" as const },
    { label: "Solo traducción", value: "only-translation" as const },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTrackLyrics(deezerSongId);
        setSongLyrics(data);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deezerSongId]);

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
          className="relative w-full max-w-2xl max-h-[85vh] h-full flex flex-col bg-background-dark backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <header className="shrink-0 border-b border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Letras de <span className="italic">{trackName}</span>
              </h2>
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

            <div className="flex flex-wrap gap-2">
              {lyricsOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSectionView(option.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    sectionView === option.value
                      ? "bg-white text-neutral-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </header>

          <section className="flex-1 overflow-y-auto px-10 p-8 styled-scrollbar bg-background">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
                <span className="ml-3 text-white/70">Cargando letras...</span>
              </div>
            ) : !songLyrics?.lyrics || songLyrics.lyrics.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/50">
                <p>Esta canción no contiene letras disponibles.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  {songLyrics.lyrics.map((line: LyricsLine, index: number) => {
                    const showOriginal =
                      sectionView === "original" ||
                      sectionView === "original+translation";
                    const showTranslation =
                      sectionView === "only-translation" ||
                      sectionView === "original+translation";

                    const isEmptyLine =
                      line.line.trim() === "" &&
                      (!line.translation || line.translation.trim() === "");

                    if (isEmptyLine) {
                      return <br key={index} />;
                    }

                    return (
                      <div key={index} className="">
                        {showOriginal && line.line && (
                          <p className="text-text text-base leading-relaxed">
                            {line.line}
                          </p>
                        )}
                        {showTranslation && line.translation && (
                          <p className="text-white/60 text-sm leading-relaxed italic">
                            {line.translation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="opacity-40 italics text-xl mt-6 font-primary text-text">
                  Obtenidas de{" "}
                  <span className="font-semibold">Musify Lyrics</span>
                </p>
              </div>
            )}
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
