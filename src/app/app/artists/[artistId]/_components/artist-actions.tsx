"use client";

import { useFavoritesStore } from "@/app/app/_stores/useFavoriteStore";
import { RiHeartFill, RiHeartLine, RiShareForwardLine } from "react-icons/ri";
import { MFArtist } from "@/app/app/_types/musify";

interface Props {
  artist: MFArtist;
}

export default function ArtistActions({ artist }: Props) {
  const { toggleArtist, artists } = useFavoritesStore();
  const isFav = artists.some((item) => item.id === artist.id);

  const toggleFavorite = () => {
    toggleArtist({
      id: artist.id,
      image_url: artist.image_url,
      name: artist.name,
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/albums/${artist.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${artist.name}`,
          text: `Descarga todos los albumes de ${artist.name} en Musify`,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center gap-1 mt-3">
      <button
        onClick={toggleFavorite}
        className="flex items-center justify-center rounded-full transition-all duration-100 text-white cursor-pointer text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 size-10"
      >
        {isFav ? (
          <RiHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <RiHeartLine className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center justify-center rounded-full transition-all duration-100 text-white cursor-pointer text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 size-10"
      >
        <RiShareForwardLine className="w-5 h-5" />
      </button>
    </div>
  );
}
