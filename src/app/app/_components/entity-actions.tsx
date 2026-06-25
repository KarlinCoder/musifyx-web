"use client";

import { useFavoritesStore } from "@/app/app/_stores/useFavoriteStore";
import { RiHeartFill, RiHeartLine, RiShareForwardLine } from "react-icons/ri";
import type {
  MFArtist,
  MFAlbumPage,
  MFPlaylist,
} from "@/app/app/_types/musify";

type EntityType = "artist" | "playlist" | "album";

interface EntityActionsProps {
  type: EntityType;
  entity: MFArtist | MFPlaylist | MFAlbumPage;
  showDownload?: boolean;
  onDownload?: () => void;
  isDownloading?: boolean;
  downloadLabel?: string;
}

function getEntityName(
  entity: MFArtist | MFPlaylist | MFAlbumPage,
  type: EntityType,
): string {
  if (type === "artist") return (entity as MFArtist).name;
  return (entity as MFPlaylist | MFAlbumPage).title;
}

function getSharePath(
  entity: MFArtist | MFPlaylist | MFAlbumPage,
  type: EntityType,
): string {
  if (type === "artist") return `/artists/${entity.id}`;
  if (type === "playlist") return `/playlists/${entity.id}`;
  return `/albums/${entity.id}`;
}

function getShareText(
  entity: MFArtist | MFPlaylist | MFAlbumPage,
  type: EntityType,
): string {
  const name = getEntityName(entity, type);
  if (type === "artist")
    return `Descarga todos los albumes de ${name} en Musify`;
  if (type === "playlist") return `Escucha todo lo que trae ${name} en Musify`;
  const album = entity as MFAlbumPage;
  return `Escucha ${album.title} de ${album.artist.name} en Musify`;
}

function getShareTitle(
  entity: MFArtist | MFPlaylist | MFAlbumPage,
  type: EntityType,
): string {
  if (type === "album") {
    const album = entity as MFAlbumPage;
    return `${album.title} - ${album.artist.name}`;
  }
  return getEntityName(entity, type);
}

export default function EntityActions({
  type,
  entity,
  showDownload,
  onDownload,
  isDownloading,
  downloadLabel,
}: EntityActionsProps) {
  const {
    toggleArtist,
    toggleAlbum,
    togglePlaylist,
    artists,
    albums,
    playlists,
  } = useFavoritesStore();

  const isFav = (() => {
    switch (type) {
      case "artist":
        return artists.some((item) => item.id === entity.id);
      case "album":
        return albums.some((a) => a.id === entity.id);
      case "playlist":
        return playlists.some((item) => item.id === entity.id);
    }
  })();

  const toggleFavorite = () => {
    switch (type) {
      case "artist":
        toggleArtist({
          id: entity.id,
          image_url: (entity as MFArtist).image_url,
          name: (entity as MFArtist).name,
        });
        break;
      case "album": {
        const album = entity as MFAlbumPage;
        toggleAlbum({
          id: album.id,
          title: album.title,
          artist: album.artist,
          image_url: album.image_url,
          explicit_lyrics: album.explicit_lyrics,
          record_type: album.record_type,
        });
        break;
      }
      case "playlist": {
        const playlist = entity as MFPlaylist;
        togglePlaylist({
          id: playlist.id,
          image_url: playlist.image_url,
          is_official: playlist.is_official,
          nb_tracks: playlist.nb_tracks,
          title: playlist.title,
        });
        break;
      }
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${getSharePath(entity, type)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: getShareTitle(entity, type),
          text: getShareText(entity, type),
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center gap-1 mt-">
      {showDownload && (
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="relative min-w-50 flex items-center justify-center gap-2 text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 transition-all duration-100 text-white rounded-full cursor-pointer py-2"
        >
          {downloadLabel ?? (isDownloading ? "Agregado" : "Descargar álbum")}
        </button>
      )}

      <button
        onClick={toggleFavorite}
        className="border border-white/10 flex items-center justify-center rounded-full transition-all duration-100 text-white cursor-pointer text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 size-10"
      >
        {isFav ? (
          <RiHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <RiHeartLine className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={handleShare}
        className="border border-white/10 flex items-center justify-center rounded-full transition-all duration-100 text-white cursor-pointer text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 size-10"
      >
        <RiShareForwardLine className="w-5 h-5" />
      </button>
    </div>
  );
}
