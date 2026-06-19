"use client";

import { useFavoritesStore } from "@/app/app/_stores/useFavoriteStore";
import { RiHeartFill, RiHeartLine, RiShareForwardLine } from "react-icons/ri";
import DownloadButton from "./download-button";

interface Props {
  albumId: number;
  albumTitle: string;
  artistName: string;
  albumCover: string;
}

export default function AlbumActions({
  albumId,
  albumTitle,
  artistName,
  albumCover,
}: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(albumId);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(albumId);
    } else {
      addFavorite({
        id: albumId,
        data: { title: albumTitle, artist: { name: artistName }, image_url: albumCover },
        type: "album",
      });
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/albums/${albumId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${albumTitle} - ${artistName}`,
          text: `Escucha ${albumTitle} de ${artistName} en Musify`,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <DownloadButton id={albumId}>Descargar álbum</DownloadButton>

      <button
        type="button"
        onClick={toggleFavorite}
        className="size-10 flex items-center justify-center rounded-full bg-[#333] hover:opacity-85 active:opacity-100 transition-all duration-100 text-white cursor-pointer"
        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFav ? (
          <RiHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <RiHeartLine className="w-5 h-5" />
        )}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="size-10 flex items-center justify-center rounded-full bg-[#333] hover:opacity-85 active:opacity-100 transition-all duration-100 text-white cursor-pointer"
        aria-label="Compartir álbum"
      >
        <RiShareForwardLine className="w-5 h-5" />
      </button>
    </div>
  );
}
