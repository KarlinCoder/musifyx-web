"use client";

import { genericBlur } from "@/lib/utils";
import ImageWithFallback from "@/app/app/_components/image-with-fallback";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MFArtistPage } from "@/app/app/_types/musify";
import EntityActions from "@/app/app/_components/entity-actions";
import { FastAverageColor } from "fast-average-color";

interface Props {
  artist: MFArtistPage;
}

export default function ArtistHeader({ artist }: Props) {
  const [showBioModal, setShowBioModal] = useState(false);
  const [bgColor, setBgColor] = useState("#1a1a1a");

  useEffect(() => {
    if (showBioModal && artist.image_url) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(artist.image_url)
        .then((color) => setBgColor(color.hex))
        .catch(() => {});
    }
  }, [showBioModal, artist.image_url]);

  return (
    <header className="flex items-center justify-start relative pb-15 bg-center bg-no-repeat bg-cover gap-7">
      <div className="inline-block">
        <ImageWithFallback
          src={artist.image_url}
          fallbackType="artist"
          alt="artist picture"
          width={2000}
          height={2000}
          placeholder="blur"
          blurDataURL={genericBlur}
          className="rounded-full! max-w-80 h-auto img-card"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-primary text-5xl font-medium flex items-center gap-3">
          {artist.name}
        </h2>

        <p className="text-sm text-neutral-200 w-fit">
          {artist.nb_album} lanzamientos
        </p>

        {artist.bio_html && (
          <div
            className="text-sm text-neutral-400 leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{ __html: artist.bio_html }}
          />
        )}

        <div className="flex items-center gap-1 mt-1">
          {artist.bio_html && (
            <button
              onClick={() => setShowBioModal(true)}
              className="button border border-white/10"
            >
              Ver biografía
            </button>
          )}
          <EntityActions type="artist" entity={artist} />
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {showBioModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              onClick={() => setShowBioModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl styled-scrollbar"
                style={{ backgroundColor: bgColor }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${bgColor}ee 0%, ${bgColor}cc 40%, ${bgColor} 100%)`,
                  }}
                />

                <div className="relative flex flex-col items-center pt-8 pb-5 px-6">
                  <button
                    onClick={() => setShowBioModal(false)}
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
                      src={artist.image_url}
                      fallbackType="artist"
                      alt={artist.name}
                      width={192}
                      height={192}
                      className="object-cover size-full"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-white text-center leading-tight">
                    {artist.name}
                  </h2>

                  <div className="mt-4 px-4 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-medium">
                    Biografía
                  </div>
                </div>

                <section className="relative px-6 pb-6">
                  <div
                    className="text-white/90 text-[15px] leading-[1.75] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-blue-400/90 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-blue-400/30 [&_a:hover]:text-blue-300"
                    dangerouslySetInnerHTML={{ __html: artist.bio_html }}
                  />
                </section>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector("body")!,
      )}
    </header>
  );
}
