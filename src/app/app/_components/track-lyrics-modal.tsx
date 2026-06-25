"use client";

import { useEffect, useState } from "react";
import { getTrackLyrics } from "../_services/get-track-lyrics";
import { MFLyricsTranslatedLine, MFArtist } from "../_types/musify";
import { motion, AnimatePresence } from "motion/react";
import ImageWithFallback from "./image-with-fallback";
import { FastAverageColor } from "fast-average-color";

interface Props {
  onClose: () => void;
  songId: number;
  trackName: string;
  imageUrl: string;
  artists: MFArtist[];
}

export default function TrackLyricsModal({
  onClose,
  songId,
  trackName,
  imageUrl,
  artists,
}: Props) {
  const [lines, setLines] = useState<MFLyricsTranslatedLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#1a1a1a");
  const [sectionView, setSectionView] = useState<
    "original" | "original+translation" | "only-translation"
  >("original");

  const artistsText = artists.map((a) => a.name).join(", ");

  const lyricsOptions = [
    { label: "Original", value: "original" as const },
    { label: "Original + Traducción", value: "original+translation" as const },
    { label: "Solo traducción", value: "only-translation" as const },
  ];

  useEffect(() => {
    const fac = new FastAverageColor();
    fac.getColorAsync(imageUrl).then((color) => setBgColor(color.hex)).catch(() => {});
  }, [imageUrl]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTrackLyrics(songId);
        setLines(data.lyrics);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [songId]);

  const showOriginal =
    sectionView === "original" || sectionView === "original+translation";
  const showTranslation =
    sectionView === "only-translation" ||
    sectionView === "original+translation";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${bgColor}ee 0%, ${bgColor}cc 40%, ${bgColor} 100%)`,
            }}
          />

          <div className="relative shrink-0 flex flex-col items-center pt-8 pb-5 px-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-4 h-4 text-white"
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

            <div className="size-48 rounded-lg overflow-hidden shadow-2xl shadow-black/50 mb-5">
              <ImageWithFallback
                src={imageUrl}
                fallbackType="track"
                alt={trackName}
                width={192}
                height={192}
                className="object-cover size-full"
              />
            </div>

            <h2 className="text-xl font-bold text-white text-center leading-tight">
              {trackName}
            </h2>
            <p className="text-sm text-white/70 mt-1">{artistsText}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {lyricsOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSectionView(option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    sectionView === option.value
                      ? "bg-white text-black"
                      : "bg-white/15 text-white/80 hover:bg-white/25"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <section className="relative flex-1 overflow-y-auto px-6 pb-6 styled-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white" />
                <span className="ml-3 text-white/60 text-sm">
                  Cargando letras...
                </span>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-white/50 text-sm">
                <p>Esta canción no contiene letras disponibles.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lines.map((line, index) => (
                  <div key={index}>
                    {showOriginal && (
                      <p className="text-white text-lg leading-relaxed font-medium">
                        {line.text}
                      </p>
                    )}
                    {showTranslation && line.translation && (
                      <p className="text-white/50 text-sm leading-relaxed italic mt-0.5">
                        {line.translation}
                      </p>
                    )}
                  </div>
                ))}

                <p className="text-white/30 text-xs mt-6 pt-4 border-t border-white/10">
                  Musify Lyrics
                </p>
              </div>
            )}
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
