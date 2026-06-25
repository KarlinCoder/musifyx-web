"use client";

import { genericBlur } from "@/lib/utils";
import ImageWithFallback from "@/app/app/_components/image-with-fallback";
import { createPortal } from "react-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MFArtistPage } from "@/app/app/_types/musify";
import EntityActions from "@/app/app/_components/entity-actions";

interface Props {
  artist: MFArtistPage;
}

export default function ArtistHeader({ artist }: Props) {
  const [showBioModal, setShowBioModal] = useState(false);

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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setShowBioModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-[#0a0a0a] to-[#0a0a0a]" />

                <header className="relative shrink-0 px-6 pt-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <ImageWithFallback
                        src={artist.image_url}
                        fallbackType="artist"
                        alt={artist.name}
                        width={200}
                        height={200}
                        className="size-14 rounded-full object-cover shrink-0 ring-2 ring-white/10"
                      />
                      <div className="min-w-0 pt-0.5">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium mb-1">
                          Biografía
                        </p>
                        <h2 className="text-xl font-bold text-white truncate">
                          {artist.name}
                        </h2>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBioModal(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0 ml-3 -mt-1"
                      aria-label="Cerrar modal"
                    >
                      <svg
                        className="w-4 h-4 text-neutral-400"
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
                  <div className="h-px bg-white/10 mt-4" />
                </header>

                <section className="relative flex-1 overflow-y-auto px-6 py-4 styled-scrollbar">
                  <div
                    className="text-neutral-300 text-[15px] leading-[1.75] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-blue-400/90 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-blue-400/30 [&_a:hover]:text-blue-300"
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
