"use client";

import { useFavoritesStore } from "@/app/app/_stores/useFavoriteStore";
import { RiHeartFill, RiHeartLine, RiShareForwardLine } from "react-icons/ri";
import { MFPlaylist } from "@/app/app/_types/musify";

interface Props {
  playlist: MFPlaylist;
}

export default function PlaylistActions({ playlist }: Props) {
  const { togglePlaylist, playlists } = useFavoritesStore();
  const isFav = playlists.some((item) => item.id === playlist.id);

  const toggleFavorite = () => {
    togglePlaylist({
      id: playlist.id,
      image_url: playlist.image_url,
      is_official: playlist.is_official,
      nb_tracks: playlist.nb_tracks,
      title: playlist.title,
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/albums/${playlist.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${playlist.title}`,
          text: `Escucha todo lo que trae ${playlist.title} en Musify`,
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
