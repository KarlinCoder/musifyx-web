"use client";

import { genericBlur } from "@/lib/utils";
import ImageWithFallback from "@/components/image-with-fallback";
import { useState } from "react";
import { RiShareFill, RiStarFill, RiStarLine } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";
import { MFArtistPage } from "@/app/app/_types/musify";

interface Props {
  artist: MFArtistPage;
}

export default function ArtistHeader({ artist }: Props) {
  const [isFavoriteArtist, setIsFavoriteArtist] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const handleIsFavoriteArtist = () => {
    setIsFavoriteArtist(!isFavoriteArtist);
  };

  return (
    <header className="flex items-center justify-start relative py-20 bg-center bg-no-repeat bg-cover gap-7">
      <div className="w-full grow shrink inline-block">
        <ImageWithFallback
          src={artist.image_url}
          fallbackType="artist"
          alt="artist picture"
          width={2000}
          height={2000}
          placeholder="blur"
          blurDataURL={genericBlur}
          className="rounded-full max-w-80 h-auto border border-white/6"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-primary text-5xl font-medium flex items-center gap-3">
          {artist.name}{" "}
          <AnimatePresence>
            {isFavoriteArtist && (
              <motion.div
                initial={{ x: -10, rotate: -20, opacity: 0 }}
                animate={{ x: 0, rotate: 0, opacity: 1 }}
                exit={{ x: -10, rotate: -20, opacity: 0 }}
              >
                <RiStarFill size={40} className="text-yellow-300 inline" />
              </motion.div>
            )}
          </AnimatePresence>
        </h2>

        <p className="text-sm text-neutral-400 px-4 py-1 rounded-full bg-[#fff2] w-fit mt-2">
          {artist.nb_albums} lanzamientos
        </p>

        <div className="relative mt-2">
          <div
            className={`text-sm text-neutral-300 leading-relaxed text-pretty ${
              !showFullBio ? "line-clamp-3" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: artist.bio_html }}
          />
          {!showFullBio && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
          )}
        </div>

        <button
          onClick={() => setShowFullBio(!showFullBio)}
          className="text-sm text-primary hover:underline w-fit mt-1 transition-colors cursor-pointer"
        >
          {showFullBio ? "Leer menos" : "Leer más"}
        </button>

        <div className="flex items-center gap-2 mt-4">
          <button className="relative px-5 flex items-center justify-center gap-1 text-sm bg-primary hover:bg-primary/85 active:bg-primary disabled:opacity-90 transition-all duration-100 text-white rounded-full cursor-pointer h-9 font-semibold">
            <RiShareFill size={20} />
            Compartir enlace
          </button>
          <button
            onClick={handleIsFavoriteArtist}
            className={`relative flex items-center justify-center gap-1 text-sm hover:opacity-80 transition-all duration-100 text-white rounded-full cursor-pointer h-9 px-5 font-semibold ${
              isFavoriteArtist
                ? "bg-red-500 hover:bg-red-600"
                : "bg-primary hover:bg-primary/85"
            }`}
          >
            {isFavoriteArtist ? (
              <RiStarFill size={20} />
            ) : (
              <RiStarLine size={20} />
            )}{" "}
            Favoritos
          </button>
        </div>
      </div>
    </header>
  );
}
